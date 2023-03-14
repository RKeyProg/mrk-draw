var App = App || {};
App.config = App.config || {};

import * as joint from "@clientio/rappid";

export class Link extends joint.dia.Link {
  constructor() {
    super(...arguments);
    this.markup = [
      {
        tagName: "path",
        selector: "wrapper",
        attributes: {
          fill: "none",
          stroke: "transparent",
        },
      },
      {
        tagName: "path",
        selector: "line",
        attributes: {
          fill: "none",
        },
      },
    ];
  }
  defaults() {
    return Object.assign(Object.assign({}, super.defaults), {
      type: "app.Link",
      z: -1,
      attrs: {
        wrapper: {
          connection: true,
          strokeWidth: 10,
        },
        line: {
          connection: true,
          stroke: "#A0A0A0",
          strokeWidth: 2,
        },
      },
    });
  }
}

let myLink = new Link();

(function () {
  "use strict";

  App.config.stencil = {};

  App.config.stencil.groups = {
    phisic: { index: 1, label: "Физическая схема" },
    logic: { index: 2, label: "Логическая схема", closed: true },
    chen: { index: 3, label: "Нотация Чена", closed: true },
  };

  App.config.stencil.shapes = {};

  App.config.stencil.shapes.phisic = [
    {
      type: "app.MyTable",
      paperSize: { width: 200, height: 100 },
      allowOrthogonalResize: false,
      maxWidth: 250,
      attrs: {
        root: {
          magnet: false,
        },
        headerLabel: {
          text: "MyTable",
        },
        body: {
          rx: 10,
          ry: 10,
        },
        header: {
          rx: 10,
          ry: 10,
        },
      },
    },
    {
      type: "app.MyTable",
      paperSize: { width: 200, height: 100 },
      allowOrthogonalResize: false,
      maxWidth: 250,
      attrs: {
        root: {
          magnet: false,
        },
        headerLabel: {
          text: "MyTable",
        },
      },
    },
  ];

  App.config.stencil.shapes.logic = [
    {
      type: "app.MyTableLogic",
      paperSize: { width: 150, height: 100 },
      allowOrthogonalResize: false,
      maxWidth: 200,
      attrs: {
        root: {
          magnet: false,
        },
        headerLabel: {
          text: "MyTable",
        },
        body: {
          rx: 10,
          ry: 10,
        },
        header: {
          rx: 10,
          ry: 10,
        },
      },
    },
    {
      type: "app.MyTableLogic",
      paperSize: { width: 150, height: 100 },
      allowOrthogonalResize: false,
      maxWidth: 200,
      attrs: {
        root: {
          magnet: false,
        },
        headerLabel: {
          text: "MyTable",
        },
      },
    },
  ];

  App.config.stencil.shapes.chen = [
    {
      type: "standard.Rectangle",
      size: { width: 100, height: 70 },
      paperSize: { width: 200, height: 100 },
      attrs: {
        root: {
          dataTooltip: "Rectangle",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        body: {
          rx: 10,
          ry: 10,
          width: 50,
          height: 30,
          fill: "transparent",
          stroke: "#32343F",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "rect",
          fill: "#32343F",
          fontFamily: "Open Sans",
          fontWeight: "Normal",
          fontSize: 16,
          strokeWidth: 0,
        },
      },
    },
    {
      type: "standard.Rectangle",
      size: { width: 100, height: 70 },
      paperSize: { width: 200, height: 100 },
      attrs: {
        root: {
          dataTooltip: "Rectangle",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        body: {
          width: 50,
          height: 30,
          fill: "transparent",
          stroke: "#32343F",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "rect",
          fill: "#32343F",
          fontFamily: "Open Sans",
          fontWeight: "Normal",
          fontSize: 16,
          strokeWidth: 0,
        },
      },
    },
    {
      type: "standard.Ellipse",
      size: { width: 100, height: 70 },
      paperSize: { width: 200, height: 100 },
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
          stroke: "#32343F",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "ellipse",
          fill: "#32343F",
          fontFamily: "Open Sans",
          fontWeight: "Normal",
          fontSize: 16,
          strokeWidth: 0,
        },
      },
    },
    {
      type: "standard.Polygon",
      size: { width: 100, height: 70 },
      paperSize: { width: 200, height: 100 },
      attrs: {
        root: {
          dataTooltip: "Rhombus",
          dataTooltipPosition: "left",
          dataTooltipPositionSelector: ".joint-stencil",
        },
        body: {
          points:
            "calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)",
          fill: "transparent",
          stroke: "#32343F",
          strokeWidth: 2,
          strokeDasharray: "0",
        },
        label: {
          text: "rhombus",
          fill: "#32343F",
          fontFamily: "Open Sans",
          fontWeight: "Normal",
          fontSize: 16,
          strokeWidth: 0,
        },
      },
    },
  ];
})();

export default App.config;
