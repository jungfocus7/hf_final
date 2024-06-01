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
    fn_getScrollSizeRatio(): number;
    fn_setScrollSizeRatio(val: number, bApply?: boolean): void;
    fn_getScrollPositionRatio(): number;
    fn_setScrollPositionRatio(val: number, bApply?: boolean): void;
}
export { ScrollLogic, ScrollLogicType, type ScrollLogicConstructorParameters };
