define(["require", "exports", "react-dom", "react", "pdesigner", "templates"], function (require, exports, ReactDOM, React, pdesigner_1, templates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TemplateDialog extends React.Component {
        render() {
            let tmp_element0 = pdesigner_1.ControlFactory.create(templates_1.default[0]);
            return h("div", { className: "modal fade", ref: (e) => this.element = e || this.element },
                h("div", { className: "modal-dialog" },
                    h("div", { className: "modal-content" },
                        h("div", { className: "modal-header" },
                            h("button", { type: "button", className: "close", onClick: () => ui.hideDialog(this.element) },
                                h("span", { "aria-hidden": "true" }, "\u00D7")),
                            h("h4", { className: "modal-title" }, "\u9009\u62E9\u6A21\u677F")),
                        h("div", { className: "modal-body" }, tmp_element0),
                        h("div", { className: "modal-footer" }))));
        }
        open() {
            ui.showDialog(this.element);
        }
        close() {
            ui.hideDialog(this.element);
        }
        static show() {
            defaultInstance.open();
        }
    }
    exports.default = TemplateDialog;
    let element = document.createElement('div');
    document.body.appendChild(element);
    let defaultInstance;
    ReactDOM.render(h(TemplateDialog, { ref: (e) => defaultInstance = e || defaultInstance }), element);
});
//# sourceMappingURL=template-dialog.js.map