define(["require", "exports", "pdesigner"], function (require, exports, pdesigner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PageViewEditor extends pdesigner_1.Editor {
        render() {
            return h("div", { ref: (e) => this.element = e || this.element }, "PageView Editor");
        }
    }
    exports.default = PageViewEditor;
});
//# sourceMappingURL=PageViewEditor.js.map