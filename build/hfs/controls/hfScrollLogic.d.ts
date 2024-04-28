declare enum ScrollLogicType {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}
interface ScrollLogicConstructorParameters {
    logicType: ScrollLogicType;
    target: HTMLDivElement;
    useTargetStyle?: boolean;
    targetStyle?: string;
    thumbHtml?: string;
}
declare class ScrollLogic extends EventTarget {
    #private;
    constructor(parms: ScrollLogicConstructorParameters);
    /**
     * 스크롤 사이즈 비율 반환
     * @returns {number}
     */
    fn_getScrollSizeRatio(): number;
    /**
     * 스크롤 사이즈 비율 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    fn_setScrollSizeRatio(val: number, bApply?: boolean): void;
    /**
     * 스크롤 포지션 비율 반환
     * @returns {number}
     */
    fn_getScrollPositionRatio(): number;
    /**
     * 스크롤 포지션 비율 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    fn_setScrollPositionRatio(val: number, bApply?: boolean): void;
}
export { ScrollLogic, ScrollLogicType, type ScrollLogicConstructorParameters };
