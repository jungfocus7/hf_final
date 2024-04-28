/**
 * Element 스타일 객체 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {boolean} bw Writeable
 * @returns {CSSStyleDeclaration}
 */
export const fn_getStyles = (to, bw = false) => {
    if (to instanceof CSSStyleDeclaration)
        return to;
    else if (to instanceof HTMLElement) {
        if (bw === true)
            return to.style;
        else
            return getComputedStyle(to);
    }
    else
        return null;
};
/**
 * 넘버인지 확인후 반환
 * @param {number | string} tv TargetValue
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export const fn_checkNumber = (tv, dv = 0.0) => {
    let rv = NaN;
    if (typeof tv === 'number')
        rv = tv;
    else if (typeof tv === 'string')
        rv = Number.parseFloat(tv);
    if (Number.isFinite(rv) === true)
        return rv;
    else
        return dv;
};
//#endregion
//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Choice values
/**
 * Element width(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export const fn_getWidth = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('width');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
/**
 * Element width(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export const fn_setWidth = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('width', `${tv}px`);
    }
};
/**
 * Element height(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export const fn_getHeight = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('height');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
/**
 * Element height(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export const fn_setHeight = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('height', `${tv}px`);
    }
};
/**
 * Element left(Number) 가져오기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export const fn_getLeft = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('left');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
/**
 * Element left(Number) 설정하기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export const fn_setLeft = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('left', `${tv}px`);
    }
};
/**
 * Element top(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export const fn_getTop = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('top');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
/**
 * Element top(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export const fn_setTop = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('top', `${tv}px`);
    }
};
//#endregion
/**
 * Element Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {DOMRect}
 */
export const fn_getRect = (to) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tx = fn_getLeft(sts);
        const ty = fn_getTop(sts);
        const tw = fn_getWidth(sts);
        const th = fn_getHeight(sts);
        const rct = new DOMRect(tx, ty, tw, th);
        return rct;
    }
    else
        return null;
};
/**
 * Element Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {DOMRect} rct
 */
export const fn_updateRect = (to, rct) => {
    const sts = fn_getStyles(to);
    if ((sts !== null) && (rct instanceof DOMRect)) {
        const tw = fn_getWidth(sts);
        const th = fn_getHeight(sts);
        const tx = fn_getLeft(sts);
        const ty = fn_getTop(sts);
        rct.width = tw;
        rct.height = th;
        rct.x = tx;
        rct.y = ty;
    }
};
/**
 * Rect에 좌표(tx, ty)가 포함되는지 여부
 * @param {DOMRect} rct
 * @param {number} tx
 * @param {number} ty
 * @returns {boolean}
 */
export const fn_containsRect = (rct, tx, ty) => {
    const rb = ((rct.left <= tx) && (rct.right >= tx)) &&
        ((rct.top <= ty) && (rct.bottom >= ty));
    return rb;
};
/**
 * Element에 Rect 적용하기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {DOMRect} rct
 */
export const fn_applyRectToElement = (to, rct) => {
    const sts = fn_getStyles(to, true);
    if ((sts !== null) && (rct instanceof DOMRect)) {
        fn_setLeft(sts, rct.left);
        fn_setTop(sts, rct.top);
        fn_setWidth(sts, rct.width);
        fn_setHeight(sts, rct.height);
    }
};
