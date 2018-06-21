/// <reference types="react" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
declare namespace pdesigner {
    function guid(): string;
    let classNames: {
        controlSelected: string;
        emptyTemplates: string;
        loadingTemplates: string;
        templateSelected: string;
    };
}
declare namespace pdesigner {
    interface EditorProps extends React.Props<Editor<any, any>> {
        control: Control<any, any>;
    }
    abstract class Editor<P extends EditorProps, S> extends React.Component<P, S> {
        private originalRender;
        private controlType;
        validate: () => Promise<boolean>;
        private _element;
        constructor(props: any);
        readonly designer: PageDesigner;
        readonly element: HTMLElement;
        setState<K extends keyof S>(state: (Pick<S, K> | S), callback?: () => void): void;
        Element(...children: JSX.Element[]): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
}
declare namespace pdesigner {
    class ControlFactory {
        private static getControlType;
        private static exportElement;
        private static getComponentNameByType;
        private static trimProps;
        static create(args: ElementData, designer?: PageDesigner): React.ReactElement<any>;
        static register(controlType: React.ComponentClass<any>): any;
        static register(controlName: string, controlType: React.ComponentClass<any>): any;
        static register(controlName: string, controlPath: string): any;
        static loadAllTypes(): Promise<any[]>;
        static createElement(control: Control<any, any>, type: string | React.ComponentClass<any>, props: React.HTMLAttributes<any> & React.Attributes, ...children: any[]): React.ReactElement<any>;
        static createDesignTimeElement(control: Control<any, any>, type: string | React.ComponentClass<any>, props: React.HTMLAttributes<any> & React.Attributes, ...children: any[]): React.ReactElement<any>;
        private static createRuntimeElement;
    }
}
/*******************************************************************************
 * Copyright (C) maishu All rights reserved.
 *
 * HTML 页面设计器
 *
 * 作者: 寒烟
 * 日期: 2018/5/30
 *
 * 个人博客：   http://www.cnblogs.com/ansiboy/
 * GITHUB:     http://github.com/ansiboy
 * QQ 讨论组：  119038574
 *
 ********************************************************************************/
declare namespace pdesigner {
    interface ControlProps<T> extends React.Props<T> {
        id?: string;
        name?: string;
        className?: string;
        style?: React.CSSProperties;
        tabIndex?: number;
        componentName?: string;
        designMode?: boolean;
    }
    interface ControlState {
        selected: boolean;
    }
    abstract class Control<P extends ControlProps<any>, S> extends React.Component<P, S> {
        private originalRef;
        private _designer;
        private originalComponentDidMount;
        private originalRender;
        static tabIndex: number;
        static componentsDir: string;
        static connectorElementClassName: string;
        static controlTypeName: string;
        protected hasCSS: boolean;
        element: HTMLElement;
        constructor(props: any);
        readonly id: string;
        readonly isDesignMode: boolean;
        readonly componentName: any;
        readonly designer: PageDesigner;
        readonly hasEditor: boolean;
        static htmlDOMProps(props: any): {};
        protected loadControlCSS(): Promise<void>;
        private myComponentDidMount;
        Element(child: JSX.Element): any;
        Element(props: any, element: JSX.Element): any;
        Element(type: string, ...children: JSX.Element[]): any;
        Element(type: string, props: ControlProps<this>, ...children: JSX.Element[]): any;
        private static render;
        private static getControlType;
        static loadTypes(elementData: ElementData): Promise<any[]>;
        static loadAllTypes(): Promise<any[]>;
        static getInstance(id: string): Control<any, any>;
        static create(args: ElementData, designer?: PageDesigner): React.ReactElement<any>;
        private static getComponentNameByType;
    }
}
/*******************************************************************************
 * Copyright (C) maishu All rights reserved.
 *
 * HTML 页面设计器
 *
 * 作者: 寒烟
 * 日期: 2018/5/30
 *
 * 个人博客：   http://www.cnblogs.com/ansiboy/
 * GITHUB:     http://github.com/ansiboy
 * QQ 讨论组：  119038574
 *
 ********************************************************************************/
declare namespace pdesigner {
    interface PageDesignerProps extends React.Props<PageDesigner> {
        pageData: ElementData;
    }
    interface PageDesignerState {
        pageData: ElementData;
    }
    class Callback<T> {
        private funcs;
        constructor();
        add(func: (args: T) => void): void;
        remove(func: (args: T) => any): void;
        fire(args: T): void;
        static create<T>(): Callback<T>;
    }
    class PageDesigner extends React.Component<PageDesignerProps, PageDesignerState> {
        selectedControlId1: string;
        private element;
        private undoStack;
        private redoStack;
        private originalPageData;
        private snapshootVersion;
        controlSelected: Callback<Control<ControlProps<any>, any>>;
        controlComponentDidMount: Callback<Control<any, any>>;
        changed: Callback<ElementData>;
        constructor(props: any);
        private set_state;
        save(callback: (pageData: ElementData) => Promise<any>): Promise<void>;
        readonly canUndo: boolean;
        undo(): void;
        readonly canRedo: boolean;
        redo(): void;
        private pageDataIsChanged;
        private isEquals;
        private skipField;
        updateControlProps(controlId: string, props: any): any;
        sortControlChildren(controlId: string, childIds: string[]): any;
        sortChildren(parentId: string, childIds: string[]): Promise<void>;
        appendControl(parentId: string, childControl: ElementData, childIds?: string[]): Promise<void>;
        setControlPosition(controlId: string, left: number, top: number): Promise<void>;
        selectControlById(controlId: string): void;
        /**
         * 选择指定的控件
         * @param control 指定的控件，可以为空，为空表示清空选择。
         */
        selectControl(control: Control<any, any>): void;
        clearSelectControl(): void;
        removeControl(controlId: string): void;
        moveControl(controlId: string, parentId: string, childIds: string[]): void;
        private removeControlFrom;
        private findControlData;
        private onKeyDown;
        componentDidMount(): void;
        render(): JSX.Element;
    }
    type DesignerContextValue = {
        designer: PageDesigner;
    };
    const DesignerContext: React.Context<DesignerContextValue>;
}
declare namespace pdesigner {
    class EditorFactory {
        static register(controlTypeName: any, editorType: React.ComponentClass<any> | string): void;
        static create(control: Control<any, any>): Promise<React.ComponentElement<any, React.Component<any, React.ComponentState, any>>>;
        static hasEditor(controlTypeName: any): boolean;
    }
}
declare namespace pdesigner {
    interface ControlPlaceholderState {
        controls: ElementData[];
    }
    interface ControlPlaceholderProps extends ControlProps<ControlPlaceholder> {
        style?: React.CSSProperties;
        emptyText?: string;
        htmlTag?: string;
    }
    class ControlPlaceholder extends Control<ControlPlaceholderProps, ControlPlaceholderState> {
        private controls;
        static defaultProps: {
            className: string;
            layout: string;
        };
        pageView: PageView;
        constructor(props: any);
        private sortableElement;
        private droppableElement;
        private childrenIds;
        componentDidMount(): void;
        render(h?: any): JSX.Element;
    }
    interface ControlPlaceholderEditorState extends Partial<ControlPlaceholderProps> {
    }
    class ControlPlaceholderEditor extends Editor<EditorProps, ControlPlaceholderEditorState> {
        render(): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
}
declare namespace pdesigner {
    interface ComponentToolbarProps extends React.Props<ComponentToolbar> {
        componets: ComponentDefine[];
        style?: React.CSSProperties;
        className?: string;
    }
    interface ComponentToolbarState {
    }
    class ComponentToolbar extends React.Component<ComponentToolbarProps, ComponentToolbarState> {
        designer: PageDesigner;
        private toolbarElement;
        componentDidMount(): void;
        draggable(selector: JQuery): void;
        render(): JSX.Element;
    }
}
declare namespace pdesigner {
    interface DesignerFrameworkProps {
        componets: ComponentDefine[];
        title?: string;
    }
    interface DesignerFrameworkState {
        changed: boolean;
        canUndo: boolean;
        canRedo: boolean;
    }
    class DesignerFramework extends React.Component<DesignerFrameworkProps, DesignerFrameworkState> {
        pageDesigner: PageDesigner;
        names: string[];
        constructor(props: any);
        namedControl(control: ElementData): void;
        undo(): void;
        redo(): void;
        save(): Promise<void>;
        fetchTemplates(): Promise<ElementData[]>;
        newFile(): Promise<void>;
        componentDidMount(): void;
        render(): JSX.Element;
    }
}
declare namespace pdesigner {
    interface EditorPanelState {
        editor: React.ReactElement<any>;
    }
    interface EditorPanelProps {
        className?: string;
        style?: React.CSSProperties;
        emptyText?: string;
    }
    class EditorPanel extends React.Component<EditorPanelProps, EditorPanelState> {
        private designer;
        private element;
        constructor(props: any);
        componentDidMount(): void;
        render(): JSX.Element;
    }
}
declare namespace pdesigner {
    class Errors {
        static argumentNull(argumentName: string): Error;
    }
}
declare namespace pdesigner {
    interface Document {
        name?: string;
        createDateTime?: Date;
        version?: number;
        /**
         * 页面的类型，默认为 page
         * snapshoot 为页面快照
         * productTemplate 为商品模板
         * page 为普通页面
         * system 为系统页面
         */
        type?: 'snapshoot' | 'productTemplate' | 'page' | 'system';
        data: ElementData;
    }
    interface ElementData {
        type: string;
        props: any;
        children?: ElementData[];
    }
    interface ComponentDefine {
        name: string;
        displayName: string;
        icon: string;
        introduce: string;
        target?: 'view' | 'footer' | 'header';
        visible?: boolean;
        controlPath: string;
        editorPath: string;
    }
}
declare namespace pdesigner {
    interface Props extends ControlProps<any> {
        id?: string;
        style?: React.CSSProperties;
        className?: string;
        layout?: 'flowing' | 'absolute';
    }
    const PageViewContext: React.Context<{
        pageView: PageView;
    }>;
    type ControlPair = {
        control: Control<any, any>;
        controlType: React.ComponentClass<any>;
    };
    type State = {};
    /**
     * 移动端页面，将 PageData 渲染为移动端页面。
     */
    class PageView extends Control<Props, State> {
        static defaultProps: Props;
        constructor(props: any);
        readonly layout: "flowing" | "absolute";
        render(h?: any): any;
    }
    interface PageViewEditorState extends Props {
    }
    class PageViewEditor extends Editor<EditorProps, PageViewEditorState> {
        render(): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
}
declare namespace pdesigner {
    interface TemplateDialogProps {
    }
    interface TemplateDialogState {
        templates: ElementData[];
        pageIndex: number;
        selectedTemplateIndex: number;
    }
    class TemplateDialog extends React.Component<TemplateDialogProps, TemplateDialogState> {
        element: HTMLElement;
        private fetchTemplates;
        private callback;
        currentPageIndex: number;
        static loadingElement: JSX.Element;
        constructor(props: any);
        private selectTemplate;
        loadTemplates(pageIndex: number): Promise<void>;
        render(): JSX.Element;
        open(): void;
        close(): void;
        static show(fetchTemplates: () => Promise<ElementData[]>, callback: (tmp: ElementData) => void): void;
    }
}
