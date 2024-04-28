export type StyleInputTarget = CSSStyleDeclaration | HTMLElement;
/**
 * Element 스타일 객체 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {boolean} bw Writeable
 * @returns {CSSStyleDeclaration}
 */
export declare const fn_getStyles: (to: StyleInputTarget, bw?: boolean) => CSSStyleDeclaration | null;
/**
 * 넘버인지 확인후 반환
 * @param {number | string} tv TargetValue
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export declare const fn_checkNumber: (tv: number | string, dv?: number) => number;
/**
 * Element width(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export declare const fn_getWidth: (to: StyleInputTarget, dv?: number) => number;
/**
 * Element width(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export declare const fn_setWidth: (to: StyleInputTarget, tv: number) => void;
/**
 * Element height(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export declare const fn_getHeight: (to: StyleInputTarget, dv?: number) => number;
/**
 * Element height(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export declare const fn_setHeight: (to: StyleInputTarget, tv: number) => void;
/**
 * Element left(Number) 가져오기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export declare const fn_getLeft: (to: StyleInputTarget, dv?: number) => number;
/**
 * Element left(Number) 설정하기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export declare const fn_setLeft: (to: StyleInputTarget, tv: number) => void;
/**
 * Element top(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} dv DefaultValue
 * @returns {number}
 */
export declare const fn_getTop: (to: StyleInputTarget, dv?: number) => number;
/**
 * Element top(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv TargetValue
 */
export declare const fn_setTop: (to: StyleInputTarget, tv: number) => void;
/**
 * Element Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {DOMRect}
 */
export declare const fn_getRect: (to: StyleInputTarget) => DOMRect;
/**
 * Element Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {DOMRect} rct
 */
export declare const fn_updateRect: (to: StyleInputTarget, rct: DOMRect) => void;
/**
 * Rect에 좌표(tx, ty)가 포함되는지 여부
 * @param {DOMRect} rct
 * @param {number} tx
 * @param {number} ty
 * @returns {boolean}
 */
export declare const fn_containsRect: (rct: DOMRect, tx: number, ty: number) => boolean;
/**
 * Element에 Rect 적용하기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {DOMRect} rct
 */
export declare const fn_applyRectToElement: (to: StyleInputTarget, rct: DOMRect) => void;
