export const dcs = Object.seal({
    isLog: true,
    log: (...args) => {
        if (dcs.isLog === true)
            console.log.apply(null, args);
    },
    msg: (msg) => {
        if (dcs.isLog === true)
            console.log(msg);
    }
});
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
export default {
    dcs, eventTypes
};
