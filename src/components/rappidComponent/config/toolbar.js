var App = App || {};
App.config = App.config || {};

(function () {
  "use strict";

  App.config.toolbar = {
    groups: {
      "undo-redo": { index: 1 },
      clear: { index: 2 },
      layout: { index: 4 },
      order: { index: 5 },
      zoom: { index: 6 },
      grid: { index: 7 },
    },
    tools: [
      {
        type: "undo",
        name: "back",
        group: "undo-redo",
        attrs: {
          button: {
            "data-tooltip": "Отменить изменения",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      {
        type: "redo",
        name: "redo",
        group: "undo-redo",
        attrs: {
          button: {
            "data-tooltip": "Вернуть изменения",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      {
        type: "button",
        name: "clear",
        group: "clear",
        attrs: {
          button: {
            id: "btn-clear",
            "data-tooltip": "Очистить холст",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      // {
      //   type: "button",
      //   name: "svg",
      //   group: "export",
      //   text: "SVG",
      //   attrs: {
      //     button: {
      //       id: "btn-svg",
      //       "data-tooltip": "Экспортировать в SVG",
      //       "data-tooltip-position": "top",
      //       "data-tooltip-position-selector": ".rappid__toolbar-container",
      //     },
      //   },
      // },
      // {
      //   type: "button",
      //   name: "png",
      //   group: "export",
      //   text: "PNG",
      //   attrs: {
      //     button: {
      //       id: "btn-png",
      //       "data-tooltip": "Экспортировать в PNG",
      //       "data-tooltip-position": "top",
      //       "data-tooltip-position-selector": ".rappid__toolbar-container",
      //     },
      //   },
      // },
      // {
      //   type: "button",
      //   name: "print",
      //   group: "print",
      //   attrs: {
      //     button: {
      //       id: "btn-print",
      //       "data-tooltip": "Распечатать",
      //       "data-tooltip-position": "top",
      //       "data-tooltip-position-selector": ".rappid__toolbar-container",
      //     },
      //   },
      // },
      {
        type: "button",
        name: "to-front",
        group: "order",
        attrs: {
          button: {
            id: "btn-to-front",
            "data-tooltip": "Вынести на передний план",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      {
        type: "button",
        name: "to-back",
        group: "order",
        attrs: {
          button: {
            id: "btn-to-back",
            "data-tooltip": "Вынести на задний план",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      // {
      //   type: "button",
      //   group: "layout",
      //   name: "layout",
      //   attrs: {
      //     button: {
      //       id: "btn-layout",
      //       "data-tooltip": "Структурировать схему",
      //       "data-tooltip-position": "top",
      //       "data-tooltip-position-selector": ".rappid__toolbar-container",
      //     },
      //   },
      // },
      {
        type: "zoom-to-fit",
        name: "zoom-to-fit",
        group: "zoom",
        attrs: {
          button: {
            "data-tooltip": "Найти схему",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      {
        type: "zoom-out",
        name: "zoom-out",
        group: "zoom",
        attrs: {
          button: {
            "data-tooltip": "Уменьшить масштаб",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      // {
      //   type: "label",
      //   name: "zoom-slider-label",
      //   group: "zoom",
      //   text: "Zoom:",
      // },
      {
        type: "zoom-slider",
        name: "zoom-slider",
        group: "zoom",
      },
      {
        type: "zoom-in",
        name: "zoom-in",
        group: "zoom",
        attrs: {
          button: {
            "data-tooltip": "Увеличить масштаб",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      {
        type: "label",
        name: "grid-size-label",
        group: "grid",
        text: "Grid size:",
        attrs: {
          label: {
            "data-tooltip": "Изменить размер сетки",
            "data-tooltip-position": "top",
            "data-tooltip-position-selector": ".rappid__toolbar-container",
          },
        },
      },
      {
        type: "range",
        name: "grid-size",
        group: "grid",
        text: "Grid size:",
        min: 5,
        max: 50,
        step: 1,
        value: 10,
      },
    ],
  };
})();

export default App.config;
