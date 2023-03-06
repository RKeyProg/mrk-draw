var App = App || {};
App.config = App.config || {};

import * as joint from "@clientio/rappid";

class Table extends joint.shapes.standard.HeaderedRecord {
  defaults() {
    return joint.util.defaultsDeep(
      {
        type: "app.Table",
        columns: [],
        padding: { top: 35, bottom: 5, left: 5, right: 5 },
        size: { width: 90, height: 54 },
        // itemMinLabelWidth: 80,
        // itemHeight: 25,
        itemOffset: 0,
        itemOverflow: true,
        attrs: {
          root: {
            magnet: false,
          },
          body: {
            stroke: "#f1554c",
            fill: "transparent",
            strokeWidth: 1,
          },
          header: {
            fill: "transparent",
            stroke: "#f1554c",
            strokeWidth: 1,
          },
          headerLabel: {
            fill: "#32343F",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: "12px",
            textWrap: {
              ellipsis: true,
              height: 20,
            },
          },
          itemBodies_0: {
            // SVGRect which is an active magnet
            // Do not use `true` to prevent CSS effects on hover
            magnet: "item",
          },
          group_1: {
            // let the pointer events propagate to the group_0
            // which spans over 2 columns
            pointerEvents: "none",
          },
          itemLabels: {
            fontFamily: "sans-serif",
            fontSize: "12px",
            fill: "#32343F",
            fontWeight: "500",
            pointerEvents: "none",
          },
          itemLabels_1: {
            fill: "#f1554c",
            textAnchor: "end",
            x: `calc(0.5 * w - 10)`,
          },
          itemLabels_keys: {
            x: `calc(0.5 * w - 30)`,
          },
          iconsGroup_1: {
            // SVGGroup does not accept `x` attribute
            refX: "50%",
            refX2: -26,
          },
        },
      },
      super.defaults
    );
  }

  preinitialize() {
    this.markup = [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "rect",
        selector: "header",
      },
      {
        tagName: "rect",
        selector: "tabColor",
      },
      {
        tagName: "text",
        selector: "headerLabel",
      },
    ];
  }

  initialize(...args) {
    super.initialize(...args);
    this.on("change", () => this.onColumnsChange());
    this._setColumns(this.get("columns"));
  }

  onColumnsChange() {
    if (this.hasChanged("columns")) {
      this._setColumns(this.get("columns"));
    }
  }

  setName(name, opt) {
    return this.attr(["headerLabel", "text"], name, opt);
  }

  getName() {
    return this.attr(["headerLabel", "text"]);
  }

  setTabColor(color) {
    return this.attr(["tabColor", "fill"], color);
  }

  getTabColor() {
    return this.attr(["tabColor", "fill"]);
  }

  setColumns(data) {
    this.set("columns", data);
    return this;
  }

  toJSON() {
    const json = super.toJSON();
    // keeping only the `columns` attribute
    delete json.items;
    return json;
  }

  _setColumns(data = []) {
    const names = [];
    const values = [];

    data.forEach((item, i) => {
      if (!item.name) return;

      names.push({
        id: item.name,
        label: item.name,
        span: 2,
      });

      const value = {
        id: `${item.type}_${i}`,
        label: item.type,
      };
      if (item.key) {
        Object.assign(value, {
          group: "keys",
          icon: require("@/assets/rappid/key.svg"),
        });
      }
      values.push(value);
    });

    this.set("items", [names, values]);
    this.removeInvalidLinks();

    return this;
  }
}

(function () {
  "use strict";

  App.config.stencil = {};

  App.config.stencil.groups = {
    standard: { index: 1, label: "Standard shapes" },
    // fsa: { index: 2, label: "State machine", closed: true },
    // pn: { index: 3, label: "Petri nets", closed: true },
    // erd: { index: 4, label: "Entity-relationship", closed: true },
    // uml: { index: 5, label: "UML", closed: true },
    // org: { index: 6, label: "ORG", closed: true },
  };

  App.config.stencil.shapes = {};

  App.config.stencil.shapes.standard = [
    new Table().setName("Table").setColumns([
      { name: "id", type: "int", key: true },
      { name: "name", type: "string", key: false },
    ]),
    {
      type: "standard.Ellipse",
      size: { width: 90, height: 54 },
      paperSize: { width: 120, height: 80 },
      attrs: {
        root: {
          dataTooltip: "Ellipse",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        body: {
          width: 50,
          height: 30,
          fill: "transparent",
          stroke: "#31d0c6",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "ellipse",
          fill: "#c6c7e2",
          fontFamily: "Roboto Condensed",
          fontWeight: "Normal",
          fontSize: 11,
          strokeWidth: 0,
        },
      },
    },
    {
      type: "app.RectangularModel",
      size: { width: 90, height: 67.5 },
      allowOrthogonalResize: false,
      attrs: {
        root: {
          dataTooltip: "Rectangle with ports",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        body: {
          fill: "transparent",
          rx: 2,
          ry: 2,
          stroke: "#31d0c6",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "rect",
          fill: "#c6c7e2",
          fontFamily: "Roboto Condensed",
          fontWeight: "Normal",
          fontSize: 11,
          strokeWidth: 0,
        },
      },
      ports: {
        items: [{ group: "in" }, { group: "in" }, { group: "out" }],
      },
    },
    {
      type: "app.CircularModel",
      size: { width: 90, height: 54 },
      allowOrthogonalResize: false,
      attrs: {
        root: {
          dataTooltip: "Ellipse with ports",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        body: {
          fill: "transparent",
          stroke: "#31d0c6",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "ellipse",
          fill: "#c6c7e2",
          fontFamily: "Roboto Condensed",
          fontWeight: "Normal",
          fontSize: 11,
          strokeWidth: 0,
        },
      },
      ports: {
        items: [{ group: "in" }, { group: "in" }, { group: "out" }],
      },
    },
    // {
    //   type: "standard.Polygon",
    //   size: { width: 90, height: 54 },
    //   attrs: {
    //     root: {
    //       dataTooltip: "Rhombus",
    //       dataTooltipPosition: "left",
    //       dataTooltipPositionSelector: ".joint-stencil",
    //     },
    //     body: {
    //       points:
    //         "calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)",
    //       fill: "transparent",
    //       stroke: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //     },
    //     label: {
    //       text: "rhombus",
    //       fill: "#c6c7e2",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       strokeWidth: 0,
    //     },
    //   },
    // },
    // {
    //   type: "standard.Cylinder",
    //   size: { width: 90, height: 54 },
    //   attrs: {
    //     root: {
    //       dataTooltip: "Cylinder",
    //       dataTooltipPosition: "left",
    //       dataTooltipPositionSelector: ".joint-stencil",
    //     },
    //     body: {
    //       fill: "transparent",
    //       stroke: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //     },
    //     top: {
    //       fill: "#31d0c6",
    //       stroke: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //     },
    //     label: {
    //       text: "cylinder",
    //       fill: "#c6c7e2",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       strokeWidth: 0,
    //     },
    //   },
    // },
    // {
    //   type: "standard.Image",
    //   size: { width: 90, height: 71 },
    //   attrs: {
    //     root: {
    //       dataTooltip: "Image",
    //       dataTooltipPosition: "left",
    //       dataTooltipPositionSelector: ".joint-stencil",
    //     },
    //     image: {
    //       xlinkHref: require("@/assets/rappid/image-icon1.svg"),
    //     },
    //     body: {
    //       fill: "transparent",
    //       stroke: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //     },
    //     label: {
    //       text: "image",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       fill: "#c6c7e2",
    //     },
    //   },
    // },
    // {
    //   type: "standard.EmbeddedImage",
    //   size: { width: 90, height: 54 },
    //   attrs: {
    //     root: {
    //       dataTooltip: "Card",
    //       dataTooltipPosition: "left",
    //       dataTooltipPositionSelector: ".joint-stencil",
    //     },
    //     body: {
    //       fill: "transparent",
    //       stroke: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //     },
    //     image: {
    //       xlinkHref: require("@/assets/rappid/image-icon1.svg"),
    //     },
    //     label: {
    //       text: "card",
    //       fill: "#c6c7e2",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       strokeWidth: 0,
    //     },
    //   },
    // },
    // {
    //   type: "standard.InscribedImage",
    //   size: { width: 60, height: 60 },
    //   attrs: {
    //     root: {
    //       dataTooltip: "Icon",
    //       dataTooltipPosition: "left",
    //       dataTooltipPositionSelector: ".joint-stencil",
    //     },
    //     border: {
    //       stroke: "#31d0c6",
    //       strokeWidth: 3,
    //       strokeDasharray: "0",
    //     },
    //     background: {
    //       fill: "transparent",
    //     },
    //     image: {
    //       xlinkHref: require("@/assets/rappid/image-icon1.svg"),
    //     },
    //     label: {
    //       text: "icon",
    //       fill: "#c6c7e2",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       strokeWidth: 0,
    //     },
    //   },
    // },
    // {
    //   type: "standard.HeaderedRectangle",
    //   size: { width: 90, height: 54 },
    //   attrs: {
    //     root: {
    //       dataTooltip: "Rectangle with header",
    //       dataTooltipPosition: "left",
    //       dataTooltipPositionSelector: ".joint-stencil",
    //     },
    //     body: {
    //       fill: "transparent",
    //       stroke: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //     },
    //     header: {
    //       stroke: "#31d0c6",
    //       fill: "#31d0c6",
    //       strokeWidth: 2,
    //       strokeDasharray: "0",
    //       height: 20,
    //     },
    //     bodyText: {
    //       textWrap: {
    //         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur molestie.",
    //         width: -10,
    //         height: -20,
    //         ellipsis: true,
    //       },
    //       fill: "#c6c7e2",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       strokeWidth: 0,
    //       refY2: 12,
    //     },
    //     headerText: {
    //       text: "header",
    //       fill: "#f6f6f6",
    //       fontFamily: "Roboto Condensed",
    //       fontWeight: "Normal",
    //       fontSize: 11,
    //       strokeWidth: 0,
    //       refY: 12,
    //     },
    //   },
    // },
  ];

  App.config.stencil.shapes.fsa = [
    {
      type: "fsa.StartState",
      size: { width: 60, height: 60 },
      preserveAspectRatio: true,
      attrs: {
        root: {
          r: 300,
          dataTooltip: "Start State",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        circle: {
          width: 50,
          height: 30,
          fill: "#61549c",
          "stroke-width": 0,
        },
        text: {
          text: "startState",
          fill: "#c6c7e2",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
          "stroke-width": 0,
        },
      },
    },
    {
      type: "fsa.EndState",
      size: { width: 60, height: 60 },
      preserveAspectRatio: true,
      attrs: {
        root: {
          dataTooltip: "End State",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".inner": {
          fill: "#6a6c8a",
          stroke: "transparent",
        },
        ".outer": {
          fill: "transparent",
          stroke: "#61549c",
          "stroke-width": 2,
          "stroke-dasharray": "0",
        },
        text: {
          text: "endState",
          fill: "#c6c7e2",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
          "stroke-width": 0,
        },
      },
    },
    {
      type: "fsa.State",
      size: { width: 60, height: 60 },
      preserveAspectRatio: true,
      attrs: {
        root: {
          dataTooltip: "State",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        circle: {
          fill: "#6a6c8a",
          stroke: "#61549c",
          "stroke-width": 2,
          "stroke-dasharray": "0",
        },
        text: {
          text: "state",
          fill: "#c6c7e2",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
          "stroke-width": 0,
        },
      },
    },
  ];

  App.config.stencil.shapes.pn = [
    {
      type: "pn.Place",
      size: { width: 60, height: 60 },
      preserveAspectRatio: true,
      tokens: 3,
      attrs: {
        root: {
          dataTooltip: "Place",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".root": {
          fill: "transparent",
          stroke: "#61549c",
          "stroke-width": 2,
          "stroke-dasharray": "0",
        },
        ".tokens circle": {
          fill: "#6a6c8a",
          stroke: "#000",
          "stroke-width": 0,
        },
        ".label": {
          text: "",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
        },
      },
    },
    {
      type: "pn.Transition",
      size: { width: 14, height: 60 },
      preserveAspectRatio: true,
      attrs: {
        root: {
          dataTooltip: "Transition",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        rect: {
          rx: 3,
          ry: 3,
          width: 12,
          height: 50,
          fill: "#61549c",
          stroke: "#7c68fc",
          "stroke-width": 0,
          "stroke-dasharray": "0",
        },
        ".label": {
          text: "transition",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "stroke-width": 0,
          fill: "#222138",
        },
      },
    },
  ];

  App.config.stencil.shapes.erd = [
    {
      type: "erd.Entity",
      size: { width: 90, height: 36 },
      attrs: {
        root: {
          dataTooltip: "Entity",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          rx: 3,
          ry: 3,
          fill: "#31d0c6",
          "stroke-width": 2,
          stroke: "transparent",
          "stroke-dasharray": "0",
        },
        text: {
          text: "Entity",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.WeakEntity",
      size: { width: 90, height: 36 },
      attrs: {
        root: {
          dataTooltip: "Weak Entity",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "transparent",
          stroke: "#feb663",
          "stroke-width": 2,
          points: "100,0 100,60 0,60 0,0",
          "stroke-dasharray": "0",
        },
        ".inner": {
          fill: "#feb663",
          stroke: "transparent",
          points: "97,5 97,55 3,55 3,5",
          "stroke-dasharray": "0",
        },
        text: {
          text: "Weak entity",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.Relationship",
      size: { width: 60, height: 60 },
      attrs: {
        root: {
          dataTooltip: "Relationship",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "#61549c",
          stroke: "transparent",
          "stroke-width": 2,
          "stroke-dasharray": "0",
        },
        text: {
          text: "Relation",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.IdentifyingRelationship",
      size: { width: 60, height: 60 },
      attrs: {
        root: {
          dataTooltip: "Identifying Relationship",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "transparent",
          stroke: "#6a6c8a",
          "stroke-dasharray": "0",
        },
        ".inner": {
          fill: "#6a6c8a",
          stroke: "transparent",
          "stroke-dasharray": "0",
        },
        text: {
          text: "Relation",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.ISA",
      size: { width: 90, height: 45 },
      attrs: {
        root: {
          dataTooltip: "ISA",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        text: {
          text: "ISA",
          fill: "#f6f6f6",
          "letter-spacing": 0,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
        polygon: {
          fill: "#feb663",
          stroke: "transparent",
          "stroke-dasharray": "0",
        },
      },
    },
    {
      type: "erd.Key",
      size: { width: 90, height: 45 },
      attrs: {
        root: {
          dataTooltip: "Key",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "transparent",
          stroke: "#fe854f",
          "stroke-dasharray": "0",
        },
        ".inner": {
          fill: "#fe854f",
          stroke: "transparent",
          display: "block",
          "stroke-dasharray": "0",
        },
        text: {
          text: "Key",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.Normal",
      size: { width: 90, height: 45 },
      attrs: {
        root: {
          dataTooltip: "Normal",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "#feb663",
          stroke: "transparent",
          "stroke-dasharray": "0",
        },
        text: {
          text: "Normal",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.Multivalued",
      size: { width: 90, height: 45 },
      attrs: {
        root: {
          dataTooltip: "Mutltivalued",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "transparent",
          stroke: "#fe854f",
          "stroke-dasharray": "0",
        },
        ".inner": {
          fill: "#fe854f",
          stroke: "transparent",
          rx: 43,
          ry: 21,
          "stroke-dasharray": "0",
        },
        text: {
          text: "MultiValued",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          fill: "#f6f6f6",
          "stroke-width": 0,
        },
      },
    },
    {
      type: "erd.Derived",
      size: { width: 90, height: 45 },
      attrs: {
        root: {
          dataTooltip: "Derived",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".outer": {
          fill: "transparent",
          stroke: "#fe854f",
          "stroke-dasharray": "0",
        },
        ".inner": {
          fill: "#feb663",
          stroke: "transparent",
          display: "block",
          "stroke-dasharray": "0",
        },
        text: {
          text: "Derived",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
          "stroke-width": 0,
        },
      },
    },
  ];

  App.config.stencil.shapes.uml = [
    {
      type: "uml.Class",
      name: "Class",
      attributes: ["+attr1"],
      methods: ["-setAttr1()"],
      size: { width: 90, height: 60 },
      attrs: {
        root: {
          dataTooltip: "Class",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".uml-class-name-rect": {
          top: 2,
          fill: "#61549c",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-attrs-rect": {
          top: 2,
          fill: "#61549c",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-methods-rect": {
          top: 2,
          fill: "#61549c",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-name-text": {
          ref: ".uml-class-name-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
        ".uml-class-attrs-text": {
          ref: ".uml-class-attrs-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
        ".uml-class-methods-text": {
          ref: ".uml-class-methods-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
      },
    },
    {
      type: "uml.Interface",
      name: "Interface",
      attributes: ["+attr1"],
      methods: ["-setAttr1()"],
      size: { width: 90, height: 60 },
      attrs: {
        root: {
          dataTooltip: "Interface",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".uml-class-name-rect": {
          fill: "#fe854f",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-attrs-rect": {
          fill: "#fe854f",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-methods-rect": {
          fill: "#fe854f",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-name-text": {
          ref: ".uml-class-name-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
        ".uml-class-attrs-text": {
          ref: ".uml-class-attrs-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-size": 11,
        },
        ".uml-class-methods-text": {
          ref: ".uml-class-methods-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
      },
    },
    {
      type: "uml.Abstract",
      name: "Abstract",
      attributes: ["+attr1"],
      methods: ["-setAttr1()"],
      size: { width: 90, height: 60 },
      attrs: {
        root: {
          dataTooltip: "Abstract",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".uml-class-name-rect": {
          fill: "#6a6c8a",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-attrs-rect": {
          fill: "#6a6c8a",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-methods-rect": {
          fill: "#6a6c8a",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
        },
        ".uml-class-name-text": {
          ref: ".uml-class-name-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
        ".uml-class-attrs-text": {
          ref: ".uml-class-attrs-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
        ".uml-class-methods-text": {
          ref: ".uml-class-methods-rect",
          "ref-y": 0.5,
          "y-alignment": "middle",
          fill: "#f6f6f6",
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
          "font-size": 11,
        },
      },
    },

    {
      type: "uml.State",
      name: "State",
      events: ["entry/", "create()"],
      size: { width: 90, height: 60 },
      attrs: {
        root: {
          dataTooltip: "State",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".uml-state-body": {
          fill: "#feb663",
          stroke: "#f6f6f6",
          "stroke-width": 1,
          rx: 8,
          ry: 8,
          "stroke-dasharray": "0",
        },
        ".uml-state-separator": {
          stroke: "#f6f6f6",
          "stroke-width": 1,
          "stroke-dasharray": "0",
        },
        ".uml-state-name": {
          fill: "#f6f6f6",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
        },
        ".uml-state-events": {
          fill: "#f6f6f6",
          "font-size": 11,
          "font-family": "Roboto Condensed",
          "font-weight": "Normal",
        },
      },
    },
  ];

  App.config.stencil.shapes.org = [
    {
      type: "org.Member",
      size: { width: 90, height: 35 },
      attrs: {
        root: {
          dataTooltip: "Member",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        ".rank": {
          text: "Rank",
          fill: "#f6f6f6",
          "font-size": 12,
          "font-weight": "Bold",
          "text-decoration": "none",
        },
        ".name": {
          text: "Person",
          fill: "#f6f6f6",
          "font-weight": "Normal",
          "font-size": 10,
        },
        ".card": {
          fill: "#31d0c6",
          stroke: "transparent",
          "stroke-width": 0,
          "stroke-dasharray": "0",
        },
        image: {
          width: 32,
          height: 32,
          x: 16,
          y: 13,
          ref: null,
          "ref-x": null,
          "ref-y": null,
          "y-alignment": null,
          "xlink:href": require("@/assets/rappid/member-male.png"),
        },
      },
    },
  ];
})();

export default App.config;
