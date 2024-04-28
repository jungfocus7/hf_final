export interface IDebugConsole {
    isLog: boolean;
    log: (...args: any[]) => void;
    msg: (msg: string) => void;
}
export declare const dcs: IDebugConsole;
/**
 * 이벤트 상수
 */
export declare const eventTypes: Readonly<{
    MOUSE_MOVE: "mousemove";
    MOUSE_UP: "mouseup";
    MOUSE_DOWN: "mousedown";
    BLUR: "blur";
    MOUSEWHEEL: "mousewheel";
    SCROLL: "scroll";
    RESIZE: "resize";
    CLICK: "click";
    UPDATE: "update";
    END: "end";
}>;
