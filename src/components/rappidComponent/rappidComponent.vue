<template>
  <div class="joint-app joint-theme-modern">
    <div class="app-header">
      <div class="app-title">
        <h1>JointJS+</h1>
      </div>
      <div class="toolbar-container"></div>
    </div>
    <div class="app-body">
      <div class="stencil-container"></div>
      <div class="paper-container"></div>
      <div class="inspector-container"></div>
      <div class="navigator-container"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import * as lodash from "lodash";
import * as backbone from "backbone/backbone-min";
import * as dagre from "dagre/dist/dagre";
import * as graphlib from "dagre/node_modules/graphlib/dist/graphlib.core";
import * as joint from "@clientio/rappid";

window.lodash = lodash;
window.backbone = backbone;
window.dagre = dagre;
window.graphlib = graphlib;
window.joint = joint;

const cache = new Map();
let App = window.App || {};
App.config = App.config || {};
import halo from "./config/halo";
import inspector from "./config/inspector";
import sampleGraphs from "./config/sample-graphs";
import selection from "./config/selection";
import stencil from "./config/stencil";
import toolbar from "./config/toolbar";

App.config = Object.assign(
  halo,
  inspector,
  sampleGraphs,
  selection,
  stencil,
  toolbar
);
joint.shapes.app = {};

export default {
  mounted() {
    this.main();
    this.themePicker();
    this.jointShapesApp();
    this.navigator();

    joint.setTheme("modern");
    const rappid = new App.MainView({ el: this.$el });
    const themePicker = new App.ThemePicker({ mainView: rappid });
    themePicker.render().$el.appendTo(document.body);
    rappid.graph.fromJSON(
      JSON.parse(App.config.sampleGraphs.emergencyProcedure)
    );
  },
  methods: {
    main() {
      App.MainView = joint.mvc.View.extend({
        className: "app",

        events: {
          'mouseup input[type="range"]': "removeTargetFocus",
          mousedown: "removeFocus",
          touchstart: "removeFocus",
        },

        removeTargetFocus: function (evt) {
          evt.target.blur();
        },

        removeFocus: function (evt) {
          // do not lose focus on right-click
          if (evt.button === 2) return;

          // do not lose focus if clicking current element for a second time
          var activeElement = document.activeElement;
          var target = evt.target;
          if ($.contains(activeElement, target) || activeElement === target)
            return;

          activeElement.blur();
          window.getSelection().removeAllRanges();
        },

        init: function () {
          this.initializePaper();
          this.initializeStencil();
          this.initializeSelection();
          this.initializeToolsAndInspector();
          this.initializeNavigator();
          this.initializeToolbar();
          this.initializeKeyboardShortcuts();
          this.initializeTooltips();
        },

        // Create a graph, paper and wrap the paper in a PaperScroller.
        initializePaper: function () {
          var graph = (this.graph = new joint.dia.Graph());

          this.commandManager = new joint.dia.CommandManager({ graph: graph });

          var paper = (this.paper = new joint.dia.Paper({
            width: 1000,
            height: 1000,
            gridSize: 10,
            drawGrid: true,
            model: graph,
            defaultLink: new joint.shapes.app.Link(),
            defaultConnectionPoint: joint.shapes.app.Link.connectionPoint,
            interactive: { linkMove: false },
            async: true,
            sorting: joint.dia.Paper.sorting.APPROX,
          }));

          paper.on("blank:contextmenu", (evt) => {
            this.renderContextToolbar({ x: evt.clientX, y: evt.clientY });
          });

          paper.on("cell:contextmenu", (cellView, evt) => {
            this.renderContextToolbar({ x: evt.clientX, y: evt.clientY }, [
              cellView.model,
            ]);
          });

          this.snaplines = new joint.ui.Snaplines({ paper: paper });

          var paperScroller = (this.paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            scrollWhileDragging: true,
            cursor: "grab",
          }));

          $(".paper-container").append(paperScroller.el);
          paperScroller.render().center();

          paper.on("paper:pan", (evt, tx, ty) => {
            evt.preventDefault();
            paperScroller.el.scrollLeft += tx;
            paperScroller.el.scrollTop += ty;
          });

          paper.on("paper:pinch", (evt, ox, oy, scale) => {
            // the default is already prevented
            const zoom = paperScroller.zoom();
            paperScroller.zoom(zoom * scale, {
              min: 0.2,
              max: 5,
              ox,
              oy,
              absolute: true,
            });
          });
        },

        // Create and populate stencil.
        initializeStencil: function () {
          var stencil = (this.stencil = new window.joint.ui.Stencil({
            paper: this.paperScroller,
            snaplines: this.snaplines,
            scaleClones: true,
            width: 240,
            groups: App.config.stencil.groups,
            dropAnimation: true,
            groupsToggleButtons: true,
            search: {
              "*": [
                "type",
                "attrs/text/text",
                "attrs/root/dataTooltip",
                "attrs/label/text",
              ],
              "org.Member": [
                "attrs/.rank/text",
                "attrs/root/dataTooltip",
                "attrs/.name/text",
              ],
            },
            layout: {
              columns: 2,
              marginX: 10,
              marginY: 10,
              columnGap: 10,
              columnWidth: 100,
              // reset defaults
              resizeToFit: false,
              dx: 0,
              dy: 0,
            },
            // Remove tooltip definition from clone
            dragStartClone: function (cell) {
              return cell.clone().removeAttr("root/dataTooltip");
            },
          }));

          var r = new joint.shapes.basic.Rect({
            position: { x: 10, y: 10 },
            size: { width: 50, height: 30 },
          });
          var c = new joint.shapes.basic.Circle({
            position: { x: 70, y: 10 },
            size: { width: 50, height: 30 },
          });

          $(".stencil-container").append(stencil.el);
          stencil.render().load(App.config.stencil.shapes);

          stencil.on(
            "element:drop",
            function (elementView) {
              this.selection.collection.reset([elementView.model]);
            },
            this
          );
        },

        initializeKeyboardShortcuts: function () {
          this.keyboard = new joint.ui.Keyboard();
          this.keyboard.on(
            {
              "ctrl+c": function () {
                // Copy all selected elements and their associated links.
                this.clipboard.copyElements(
                  this.selection.collection,
                  this.graph
                );
              },

              "ctrl+v": function () {
                var pastedCells = this.clipboard.pasteCells(this.graph);

                var elements = pastedCells.filter((cell) => cell.isElement());

                // Make sure pasted elements get selected immediately. This makes the UX better as
                // the user can immediately manipulate the pasted elements.
                this.selection.collection.reset(elements);
              },

              "ctrl+x shift+delete": function () {
                this.clipboard.cutElements(
                  this.selection.collection,
                  this.graph
                );
              },

              "delete backspace": function (evt) {
                evt.preventDefault();
                this.graph.removeCells(this.selection.collection.toArray());
              },

              "ctrl+z": function () {
                this.commandManager.undo();
                this.selection.collection.reset([]);
              },

              "ctrl+y": function () {
                this.commandManager.redo();
                this.selection.collection.reset([]);
              },

              "ctrl+a": function () {
                this.selection.collection.reset(this.graph.getElements());
              },

              "ctrl+plus": function (evt) {
                evt.preventDefault();
                this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
              },

              "ctrl+minus": function (evt) {
                evt.preventDefault();
                this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
              },

              "keydown:shift": function (evt) {
                this.paperScroller.setCursor("crosshair");
              },

              "keyup:shift": function () {
                this.paperScroller.setCursor("grab");
              },
            },
            this
          );
        },

        initializeSelection: function () {
          this.clipboard = new joint.ui.Clipboard();

          this.selection = new joint.ui.Selection({
            paper: this.paper,
            handles: App.config.selection.handles,
            useModelGeometry: true,
            translateConnectedLinks:
              joint.ui.Selection.ConnectedLinksTranslation.SUBGRAPH,
          });

          this.selection.collection.on(
            "reset add remove",
            this.onSelectionChange.bind(this)
          );

          // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
          // Otherwise, initiate paper pan.
          this.paper.on(
            "blank:pointerdown",
            function (evt, x, y) {
              if (this.keyboard.isActive("shift", evt)) {
                this.selection.startSelecting(evt);
              } else {
                this.selection.collection.reset([]);
                this.paperScroller.startPanning(evt, x, y);
                this.paper.removeTools();
              }
            },
            this
          );

          this.paper.on(
            "element:pointerdown",
            function (elementView, evt) {
              // Select an element if CTRL/Meta key is pressed while the element is clicked.
              if (this.keyboard.isActive("ctrl meta", evt)) {
                if (
                  this.selection.collection.find(function (cell) {
                    return cell.isLink();
                  })
                ) {
                  // Do not allow mixing links and elements in the selection
                  this.selection.collection.reset([elementView.model]);
                } else {
                  this.selection.collection.add(elementView.model);
                }
              }
            },
            this
          );

          this.graph.on(
            "remove",
            function (cell) {
              // If element is removed from the graph, remove from the selection too.
              if (this.selection.collection.has(cell)) {
                this.selection.collection.reset(
                  this.selection.collection.models.filter((c) => c !== cell)
                );
              }
            },
            this
          );

          this.selection.on(
            "selection-box:pointerdown",
            function (elementView, evt) {
              // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
              if (this.keyboard.isActive("ctrl meta", evt)) {
                evt.preventDefault();
                this.selection.collection.remove(elementView.model);
              }
            },
            this
          );

          this.selection.on(
            "selection-box:pointerup",
            (elementView, evt) => {
              if (evt.button === 2) {
                evt.stopPropagation();
                this.renderContextToolbar(
                  { x: evt.clientX, y: evt.clientY },
                  this.selection.collection.toArray()
                );
              }
            },
            this
          );
        },

        renderContextToolbar(point, cellsToCopy = []) {
          this.selection.collection.reset(cellsToCopy);
          const contextToolbar = new joint.ui.ContextToolbar({
            target: point,
            root: this.paper.el,
            padding: 0,
            vertical: true,
            anchor: "top-left",
            tools: [
              {
                action: "copy",
                content: "Copy",
                attrs: {
                  disabled: cellsToCopy.length === 0,
                },
              },
              {
                action: "paste",
                content: "Paste",
                attrs: {
                  disabled: this.clipboard.isEmpty(),
                },
              },
            ],
          });

          contextToolbar.on("action:copy", () => {
            contextToolbar.remove();

            this.clipboard.copyElements(cellsToCopy, this.graph);
          });

          contextToolbar.on("action:paste", () => {
            contextToolbar.remove();
            const pastedCells = this.clipboard.pasteCellsAtPoint(
              this.graph,
              this.paper.clientToLocalPoint(point)
            );

            const elements = pastedCells.filter((cell) => cell.isElement());

            // Make sure pasted elements get selected immediately. This makes the UX better as
            // the user can immediately manipulate the pasted elements.
            this.selection.collection.reset(elements);
          });
          contextToolbar.render();
        },

        onSelectionChange: function () {
          var paper = this.paper;
          var selection = this.selection;
          var collection = selection.collection;
          paper.removeTools();
          joint.ui.Halo.clear(paper);
          joint.ui.FreeTransform.clear(paper);
          joint.ui.Inspector.close();
          if (collection.length === 1) {
            var primaryCell = collection.first();
            var primaryCellView = paper.findViewByModel(primaryCell);
            selection.destroySelectionBox(primaryCell);
            this.selectPrimaryCell(primaryCellView);
          } else if (collection.length === 2) {
            collection.each(function (cell) {
              selection.createSelectionBox(cell);
            });
          }
        },

        selectPrimaryCell: function (cellView) {
          var cell = cellView.model;
          if (cell.isElement()) {
            this.selectPrimaryElement(cellView);
          } else {
            this.selectPrimaryLink(cellView);
          }
          this.createInspector(cell);
        },

        selectPrimaryElement: function (elementView) {
          var element = elementView.model;

          new joint.ui.FreeTransform({
            cellView: elementView,
            allowRotation: false,
            preserveAspectRatio: !!element.get("preserveAspectRatio"),
            allowOrthogonalResize:
              element.get("allowOrthogonalResize") !== false,
          }).render();

          new joint.ui.Halo({
            cellView: elementView,
            handles: App.config.halo.handles,
            useModelGeometry: true,
          }).render();
        },

        selectPrimaryLink: function (linkView) {
          var ns = joint.linkTools;
          var toolsView = new joint.dia.ToolsView({
            name: "link-pointerdown",
            tools: [
              new ns.Vertices(),
              new ns.SourceAnchor(),
              new ns.TargetAnchor(),
              new ns.SourceArrowhead(),
              new ns.TargetArrowhead(),
              new ns.Segments(),
              new ns.Boundary({ padding: 15 }),
              new ns.Remove({ offset: -20, distance: 40 }),
            ],
          });

          linkView.addTools(toolsView);
        },

        createInspector: function (cell) {
          const opts = Object.assign(
            { cell },
            App.config.inspector[cell.get("type")]
          );

          return joint.ui.Inspector.create(".inspector-container", opts);
        },

        initializeToolsAndInspector: function () {
          this.paper.on(
            {
              "cell:pointerup": function (cellView) {
                var cell = cellView.model;
                var collection = this.selection.collection;
                if (collection.includes(cell)) return;
                collection.reset([cell]);
              },

              "link:mouseenter": function (linkView) {
                // Open tool only if there is none yet
                if (linkView.hasTools()) return;

                var ns = joint.linkTools;
                var toolsView = new joint.dia.ToolsView({
                  name: "link-hover",
                  tools: [
                    new ns.Vertices({ vertexAdding: false }),
                    new ns.SourceArrowhead(),
                    new ns.TargetArrowhead(),
                  ],
                });

                linkView.addTools(toolsView);
              },

              "link:mouseleave": function (linkView) {
                // Remove only the hover tool, not the pointerdown tool
                if (linkView.hasTools("link-hover")) {
                  linkView.removeTools();
                }
              },
            },
            this
          );

          this.graph.on(
            "change",
            function (cell, opt) {
              if (!cell.isLink() || !opt.inspector) return;

              var ns = joint.linkTools;
              var toolsView = new joint.dia.ToolsView({
                name: "link-inspected",
                tools: [new ns.Boundary({ padding: 15 })],
              });

              cell.findView(this.paper).addTools(toolsView);
            },
            this
          );
        },

        initializeNavigator: function () {
          var navigator = (this.navigator = new joint.ui.Navigator({
            width: 240,
            height: 115,
            paperScroller: this.paperScroller,
            zoom: {
              grid: 0.2,
              min: 0.2,
              max: 5,
            },
            paperOptions: {
              async: true,
              sorting: joint.dia.Paper.sorting.NONE,
              elementView: joint.shapes.app.NavigatorElementView,
              linkView: joint.shapes.app.NavigatorLinkView,
              cellViewNamespace: {
                /* no other views are accessible in the navigator */
              },
            },
          }));

          $(".navigator-container").append(navigator.el);
          navigator.render();
        },

        initializeToolbar: function () {
          var toolbar = (this.toolbar = new joint.ui.Toolbar({
            autoToggle: true,
            groups: App.config.toolbar.groups,
            tools: App.config.toolbar.tools,
            references: {
              paperScroller: this.paperScroller,
              commandManager: this.commandManager,
            },
          }));

          toolbar.on({
            "svg:pointerclick": this.openAsSVG.bind(this),
            "png:pointerclick": this.openAsPNG.bind(this),
            "to-front:pointerclick": this.applyOnSelection.bind(
              this,
              "toFront"
            ),
            "to-back:pointerclick": this.applyOnSelection.bind(this, "toBack"),
            "layout:pointerclick": this.layoutDirectedGraph.bind(this),
            "snapline:change": this.changeSnapLines.bind(this),
            "clear:pointerclick": this.graph.clear.bind(this.graph),
            "print:pointerclick": this.paper.print.bind(this.paper),
            "grid-size:change": this.paper.setGridSize.bind(this.paper),
          });

          $(".toolbar-container").append(toolbar.el);
          toolbar.render();
        },

        applyOnSelection: function (method) {
          this.graph.startBatch("selection");
          this.selection.collection.models.forEach(function (model) {
            model[method]();
          });
          this.graph.stopBatch("selection");
        },

        changeSnapLines: function (checked) {
          if (checked) {
            this.snaplines.enable();
          } else {
            this.snaplines.disable();
          }
        },

        initializeTooltips: function () {
          new joint.ui.Tooltip({
            rootTarget: document.body,
            target: "[data-tooltip]",
            direction: "auto",
            padding: 10,
            animation: true,
          });
        },

        // backwards compatibility for older shapes
        exportStylesheet: ".scalable * { vector-effect: non-scaling-stroke }",

        openAsSVG: function () {
          var paper = this.paper;
          paper.hideTools().toSVG(
            function (svg) {
              new joint.ui.Lightbox({
                image: "data:image/svg+xml," + encodeURIComponent(svg),
                downloadable: true,
                fileName: "Rappid",
              }).open();
              paper.showTools();
            },
            {
              preserveDimensions: true,
              convertImagesToDataUris: true,
              useComputedStyles: false,
              stylesheet: this.exportStylesheet,
            }
          );
        },

        openAsPNG: function () {
          var paper = this.paper;
          paper.hideTools().toPNG(
            function (dataURL) {
              new joint.ui.Lightbox({
                image: dataURL,
                downloadable: true,
                fileName: "Rappid",
              }).open();
              paper.showTools();
            },
            {
              padding: 10,
              useComputedStyles: false,
              stylesheet: this.exportStylesheet,
            }
          );
        },

        layoutDirectedGraph: function () {
          joint.layout.DirectedGraph.layout(this.graph, {
            setLinkVertices: true,
            rankDir: "TB",
            marginX: 100,
            marginY: 100,
          });

          this.paperScroller.centerContent({ useModelGeometry: true });
        },
      });
    },
    navigator() {
      joint.shapes.app.NavigatorElementView = joint.dia.ElementView.extend({
        body: null,

        markup: [
          {
            tagName: "rect",
            selector: "body",
            attributes: {
              fill: "#31d0c6",
            },
          },
        ],

        initFlag: ["RENDER", "UPDATE", "TRANSFORM"],

        presentationAttributes: {
          size: ["UPDATE"],
          position: ["TRANSFORM"],
          angle: ["TRANSFORM"],
        },

        confirmUpdate: function (flags) {
          if (this.hasFlag(flags, "RENDER")) this.render();
          if (this.hasFlag(flags, "UPDATE")) this.update();
          if (this.hasFlag(flags, "TRANSFORM")) this.updateTransformation();
        },

        render: function () {
          var doc = joint.util.parseDOMJSON(this.markup);
          this.body = doc.selectors.body;
          this.el.appendChild(doc.fragment);
        },

        update: function () {
          var size = this.model.size();
          this.body.setAttribute("width", size.width);
          this.body.setAttribute("height", size.height);
        },
      });

      joint.shapes.app.NavigatorLinkView = joint.dia.LinkView.extend({
        defaultTheme: null,

        initialize: function () {
          joint.mvc.View.prototype.initialize.apply(this, arguments);
        },

        onMount: joint.util.noop,

        render: joint.util.noop,

        update: joint.util.noop,
      });
    },
    themePicker() {
      App.ThemePicker = joint.ui.Toolbar.extend({
        className: function () {
          return `${joint.ui.Toolbar.prototype.className} theme-picker`;
        },

        options: {
          mainView: null, // an instance of App.MainView
        },

        themes: {
          type: "select-button-group",
          name: "theme-picker",
          multi: false,
          options: [
            { value: "modern", content: "Modern" },
            { value: "dark", content: "Dark" },
            { value: "material", content: "Material" },
          ],
          attrs: {
            ".joint-select-button-group": {
              "data-tooltip": "Change Theme",
              "data-tooltip-position": "bottom",
            },
          },
        },

        init: function () {
          this.themes.selected = this.themes.options.findIndex(
            (opt) => opt.value === this.defaultTheme
          );
          this.options.tools = [this.themes];
          this.on("theme-picker:option:select", this.onThemeSelected, this);

          joint.ui.Toolbar.prototype.init.apply(this, arguments);
        },

        onThemeSelected: function (option) {
          joint.setTheme(option.value);
          if (this.options.mainView) {
            this.adjustAppToTheme(this.options.mainView, option.value);
          }
        },

        adjustAppToTheme: function (app, theme) {
          // Material design has no grid shown.
          if (theme === "material") {
            app.paper.options.drawGrid = false;
            app.paper.clearGrid();
          } else {
            app.paper.options.drawGrid = true;
            app.paper.drawGrid();
          }
        },
      });
    },
    jointShapesApp() {
      joint.shapes.standard.Ellipse.define(
        "app.CircularModel",
        {
          attrs: {
            root: {
              magnet: false,
            },
          },
          ports: {
            groups: {
              in: {
                markup: [
                  {
                    tagName: "circle",
                    selector: "portBody",
                    attributes: {
                      r: 10,
                    },
                  },
                ],
                attrs: {
                  portBody: {
                    magnet: true,
                    fill: "#61549c",
                    strokeWidth: 0,
                  },
                  portLabel: {
                    fontSize: 11,
                    fill: "#61549c",
                    fontWeight: 800,
                  },
                },
                position: {
                  name: "ellipse",
                  args: {
                    startAngle: 0,
                    step: 30,
                  },
                },
                label: {
                  position: {
                    name: "radial",
                    args: null,
                  },
                },
              },
              out: {
                markup: [
                  {
                    tagName: "circle",
                    selector: "portBody",
                    attributes: {
                      r: 10,
                    },
                  },
                ],
                attrs: {
                  portBody: {
                    magnet: true,
                    fill: "#61549c",
                    strokeWidth: 0,
                  },
                  portLabel: {
                    fontSize: 11,
                    fill: "#61549c",
                    fontWeight: 800,
                  },
                },
                position: {
                  name: "ellipse",
                  args: {
                    startAngle: 180,
                    step: 30,
                  },
                },
                label: {
                  position: {
                    name: "radial",
                    args: null,
                  },
                },
              },
            },
          },
        },
        {
          portLabelMarkup: [
            {
              tagName: "text",
              selector: "portLabel",
            },
          ],
        }
      );

      joint.shapes.standard.Rectangle.define(
        "app.RectangularModel",
        {
          attrs: {
            root: {
              magnet: false,
            },
          },
          ports: {
            groups: {
              in: {
                markup: [
                  {
                    tagName: "circle",
                    selector: "portBody",
                    attributes: {
                      r: 10,
                    },
                  },
                ],
                attrs: {
                  portBody: {
                    magnet: true,
                    fill: "#61549c",
                    strokeWidth: 0,
                  },
                  portLabel: {
                    fontSize: 11,
                    fill: "#61549c",
                    fontWeight: 800,
                  },
                },
                position: {
                  name: "left",
                },
                label: {
                  position: {
                    name: "left",
                    args: {
                      y: 0,
                    },
                  },
                },
              },
              out: {
                markup: [
                  {
                    tagName: "circle",
                    selector: "portBody",
                    attributes: {
                      r: 10,
                    },
                  },
                ],
                position: {
                  name: "right",
                },
                attrs: {
                  portBody: {
                    magnet: true,
                    fill: "#61549c",
                    strokeWidth: 0,
                  },
                  portLabel: {
                    fontSize: 11,
                    fill: "#61549c",
                    fontWeight: 800,
                  },
                },
                label: {
                  position: {
                    name: "right",
                    args: {
                      y: 0,
                    },
                  },
                },
              },
            },
          },
        },
        {
          portLabelMarkup: [
            {
              tagName: "text",
              selector: "portLabel",
            },
          ],
        }
      );

      joint.shapes.standard.Link.define(
        "app.Link",
        {
          router: {
            name: "normal",
          },
          connector: {
            name: "rounded",
          },
          labels: [],
          attrs: {
            line: {
              stroke: "#8f8f8f",
              strokeDasharray: "0",
              strokeWidth: 2,
              fill: "none",
              sourceMarker: {
                type: "path",
                d: "M 0 0 0 0",
                stroke: "none",
              },
              targetMarker: {
                type: "path",
                d: "M 0 -5 -10 0 0 5 z",
                stroke: "none",
              },
            },
          },
        },
        {
          defaultLabel: {
            attrs: {
              rect: {
                fill: "#ffffff",
                stroke: "#8f8f8f",
                strokeWidth: 1,
                width: "calc(w + 10)",
                height: "calc(h + 10)",
                x: -5,
                y: -5,
              },
            },
          },

          getMarkerWidth: function (type) {
            var d =
              type === "source"
                ? this.attr("line/sourceMarker/d")
                : this.attr("line/targetMarker/d");
            return this.getDataWidth(d);
          },

          getDataWidth: function (d) {
            if (cache.has(d)) {
              return cache.get(d);
            } else {
              var bbox = new joint.g.Path(d).bbox();
              cache.set(d, bbox ? bbox.width : 0);
              return cache.get(d);
            }
          },
        },
        {
          connectionPoint: function (line, view, magnet, opt, type, linkView) {
            var link = linkView.model;
            var markerWidth =
              link.get("type") === "app.Link" ? link.getMarkerWidth(type) : 0;
            opt = { offset: markerWidth, stroke: true };
            // connection point for UML shapes lies on the root group containing all the shapes components
            var modelType = view.model.get("type");
            if (modelType.indexOf("uml") === 0) opt.selector = "root";
            // taking the border stroke-width into account
            if (modelType === "standard.InscribedImage")
              opt.selector = "border";
            return joint.connectionPoints.boundary.call(
              this,
              line,
              view,
              magnet,
              opt,
              type,
              linkView
            );
          },
        }
      );
    },
  },
};
</script>
