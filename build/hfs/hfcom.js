export const dcs = Object.seal({
    /** 로그사용여부 */
    isLog: true,
    /**
     * 로그기본
     * @param args
     */
    log: (...args) => {
        if (dcs.isLog === true)
            console.log.apply(null, args);
    },
    /**
     * 로그메세지
     * @param msg
     */
    msg: (msg) => {
        if (dcs.isLog === true)
            console.log(msg);
    }
});
/**
 * 이벤트 상수
 */
// export type EventType = {
//     MOUSE_MOVE: string;
//     MOUSE_UP: string;
//     MOUSE_DOWN: string;
//     BLUR: string;
//     MOUSEWHEEL: string;
//     SCROLL: string;
//     RESIZE: string;
//     CLICK: string;
//     UPDATE: string;
//     END: string;
// };
// export const eventTypes: EventType = Object.freeze({
export const eventTypes = Object.freeze({
    MOUSE_MOVE: 'mousemove',
    MOUSE_UP: 'mouseup',
    MOUSE_DOWN: 'mousedown',
    BLUR: 'blur',
    MOUSEWHEEL: 'mousewheel',
    SCROLL: 'scroll',
    RESIZE: 'resize',
    CLICK: 'click',
    UPDATE: 'update',
    END: 'end'
});
