import { eventTypes } from "../hfcom";
import { StyleInputTarget, fn_containsRect, fn_getRect,
    fn_setHeight, fn_setLeft, fn_setTop, fn_setWidth,
    fn_updateRect } from "./hfStyleFunctions";


enum ScrollLogicType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
};
interface ScrollLogicConstructorParameters {
    logicType: ScrollLogicType;
    target: HTMLDivElement;
    useTargetStyle?: boolean;
    targetStyle?: string;
    thumbHtml?: string;
};
class ScrollLogic extends EventTarget {
    constructor(parms: ScrollLogicConstructorParameters) {
        super();

        this.#logicType = parms.logicType;
        this.#elTarget = parms.target;
        if (parms.useTargetStyle === true) {
            if (typeof parms.targetStyle == 'string') {
                this.#elTarget.setAttribute('style', parms.targetStyle);
            }
            else {
                this.#elTarget.setAttribute('style', `
width: 20px; height: 100%;
background-color: #595959;
position: static; display: inline-block;
overflow-x: hidden; overflow-y: hidden;
font-size: 0px; cursor: pointer;
                `.trim());
            }
        }
        if (typeof parms.thumbHtml == 'string') {
            this.#elTarget.innerHTML = parms.thumbHtml;
        }
        else {
            const uq1: string = parms.logicType === ScrollLogicType.VERTICAL ? 'rotate(-90deg)' : '';
            this.#elTarget.innerHTML = `
<div style="background-color: #748B96;
    position: relative;
    width: 100%; height: 100%;
    left: 0px; top: 0px;
    pointer-events: none; overflow: visible;
    box-sizing: border-box; font-size: 0px;
    border: 3px solid #595959;">
    <span style="
        position: relative;
        display: inline-block;
        width: auto; height: auto;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%) ${ uq1 };
        user-select: none; white-space: nowrap;
        font-family: 'Consolas', 'monospace', 'monaco';
        font-size: 10px; color: #ffffff66;"></span>
</div>
            `.trim();
        }

        this.#elThumb = this.#elTarget.querySelector('div')!;
        this.#elSpan = this.#elThumb.querySelector('span')!;
        this.#elSpan.innerText = '';

        this.#rctGround = fn_getRect(this.#elTarget);
        this.#rctThumb = fn_getRect(this.#elThumb);

        this.#elTarget.addEventListener(eventTypes.MOUSE_DOWN, this.#fn_mouseDown);
        window.addEventListener(eventTypes.RESIZE, this.#fn_resize);

        Object.seal(this);
    }

    /** @type {number} */
    static #MINV: number = 30.0;


    /** @type {ScrollLogicType} */
    #logicType: ScrollLogicType = null!;

    /** @type {HTMLDivElement} */
    #elTarget: HTMLDivElement = null!;

    /** @type {HTMLDivElement} */
    #elThumb: HTMLDivElement = null!;

    /** @type {HTMLSpanElement} */
    #elSpan: HTMLSpanElement = null!;


    /** @type {DOMRect} */
    #rctGround: DOMRect = null!;

    /** @type {DOMRect} */
    #rctThumb: DOMRect = null!;


    /** @type {number} */
    #scrollSizeRatio: number = 1.0;

    /** @type {number} */
    #scrollPositionRatio: number = 0.0;


    /** @type {number} */
    #mdp: number = NaN;


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * ???
     */
    #fn_printSpanLog(): void {
        const ssr: number = 100 * this.#scrollSizeRatio;
        const spr: number = 100 * this.#scrollPositionRatio;
        this.#elSpan.innerText = `${ssr.toFixed(1)}%/${spr.toFixed(1)}%`;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    get #groundCheckSize(): number {
        let rv: number = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = this.#rctGround.height;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = this.#rctGround.width;

        return rv;
    }

    get #thumbCheckSize(): number {
        let rv: number = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = this.#rctThumb.height;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = this.#rctThumb.width;

        return rv;
    }

    set #thumbCheckSize(val: number) {
        if (Number.isFinite(val) === false) val = 0.0;

        if (this.#logicType === ScrollLogicType.VERTICAL)
            this.#rctThumb.height = val;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            this.#rctThumb.width = val;
    }

    get #thumbCheckLocation(): number {
        let rv: number = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = this.#rctThumb.top;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = this.#rctThumb.left;

        return rv;
    }

    set #thumbCheckLocation(val: number) {
        if (Number.isFinite(val) === false) val = 0.0;

        if (this.#logicType === ScrollLogicType.VERTICAL)
            this.#rctThumb.y = val;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            this.#rctThumb.x = val;
    }

    #fn_setCheckSize(el: StyleInputTarget, val: number) {
        if (Number.isFinite(val) === false) val = 0.0;

        if (this.#logicType === ScrollLogicType.VERTICAL)
            fn_setHeight(el, val);
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            fn_setWidth(el, val);
    }

    #fn_setCheckLocation(el: StyleInputTarget, val: number) {
        if (Number.isFinite(val) === false) val = 0.0;

        if (this.#logicType === ScrollLogicType.VERTICAL)
            fn_setTop(el, val);
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            fn_setLeft(el, val);
    }


    /**
     * 스크롤 사이즈 계산
     * @returns {number}
     */
    #fn_getScrollSize(): number {
        let ss: number = this.#groundCheckSize - this.#thumbCheckSize;
        if (ss < 0.0) ss = 0.0;

        return ss;
    }

    /**
     * Thumb 사이즈 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    #fn_setThumbSize(val: number, bApply: boolean=true): void {
        if (val === this.#thumbCheckSize) return;

        const bv: number = ScrollLogic.#MINV;
        const ev: number = this.#groundCheckSize;
        let cv: number = val;
        if (cv < bv) cv = bv;
        else if (cv > ev) cv = ev;
        this.#thumbCheckSize = cv;

        const sv: number = this.#fn_getScrollSize() * this.#scrollPositionRatio;
        this.#thumbCheckLocation = sv;

        if (bApply === true) {
            this.#fn_setCheckSize(this.#elThumb, this.#thumbCheckSize);
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
        }
    }

    /**
     * Thumb 포지션 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    #fn_setThumbPosition(val: number, bApply: boolean=true): void {
        if (val === this.#thumbCheckLocation) return;

        const bv: number = 0.0;
        const ev: number = this.#fn_getScrollSize();
        let cv: number = val;
        if (cv < bv) cv = bv;
        else if (cv > ev) cv = ev;
        this.#thumbCheckLocation = cv;

        let vr: number = (cv - bv) / (ev - bv);
        if (Number.isFinite(vr) === false) vr = bv;
        this.#scrollPositionRatio = vr;

        if (bApply === true)
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 스크롤 사이즈 비율 반환
     * @returns {number}
     */
    fn_getScrollSizeRatio(): number {
        let rv: number = this.#scrollSizeRatio;
        if (Number.isFinite(rv) === false) rv = 0.0;
        else {
            if (rv < 0.0) rv = 0.0;
            else if (rv > 1.0) rv = 1.0;
        }

        return rv;
    }

    /**
     * 스크롤 사이즈 비율 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    fn_setScrollSizeRatio(val: number, bApply: boolean=true): void {
        if (Number.isFinite(val) === false) val = 0.0;
        else {
            if (val < 0.0) val = 0.0;
            else if (val > 1.0) val = 1.0;
        }
        this.#scrollSizeRatio = val;

        const sz: number = this.#groundCheckSize * this.#scrollSizeRatio;
        this.#fn_setThumbSize(sz, bApply);

        this.#fn_printSpanLog();
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 스크롤 포지션 비율 반환
     * @returns {number}
     */
    fn_getScrollPositionRatio(): number {
        let rv: number = this.#scrollPositionRatio;
        if (Number.isFinite(rv) === false) rv = 0.0;
        else {
            if (rv < 0.0) rv = 0.0;
            else if (rv > 1.0) rv = 1.0;
        }

        return rv;
    }

    /**
     * 스크롤 포지션 비율 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    fn_setScrollPositionRatio(val: number, bApply: boolean=true): void {
        if (Number.isFinite(val) === false) val = 0.0;
        else {
            if (val < 0.0) val = 0.0;
            else if (val > 1.0) val = 1.0;
        }

        if (val === this.#scrollPositionRatio) return;
        this.#scrollPositionRatio = val;

        const bv: number = 0.0;
        const ev: number = this.#fn_getScrollSize();
        let cv: number = ev * this.#scrollPositionRatio;
        if (cv < bv) cv = bv;
        else if (cv > ev) cv = ev;
        this.#thumbCheckLocation = cv;

        this.#fn_printSpanLog();

        if (bApply === true)
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * 리사이즈 후 업데이트
     * @param {boolean} bApply
     */
    #fn_updateAfterResized(bApply: boolean=true): void {
        const bv: number = ScrollLogic.#MINV;
        const ev: number = this.#groundCheckSize;
        let cv: number = ev * this.#scrollSizeRatio;
        if (cv < bv) cv = bv;
        else if (cv > ev) cv = ev;
        this.#thumbCheckSize = cv;

        const cp: number = this.#fn_getScrollSize() * this.#scrollPositionRatio;
        this.#thumbCheckLocation = cp;

        if (bApply === true) {
            this.#fn_setCheckSize(this.#elThumb, this.#thumbCheckSize);
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
        }

        this.#fn_printSpanLog();
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    #fn_clientValue(e: MouseEvent): number {
        let rv: number = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = e.clientY;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = e.clientX;

        return rv;
    }

    #fn_offsetValue(e: MouseEvent): number {
        let rv: number = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = e.offsetY;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = e.offsetX;

        return rv;
    }


    /**
     * MOUSE_MOVE
     * @param {MouseEvent} e
     * @returns {void}
     */
    #fn_mouseMove = (e: MouseEvent): void => {
        if (e.buttons !== 1) {
            this.#fn_mouseUp();
            return;
        }

        if (this.#scrollSizeRatio === 1.0) return;
        const cv: number = this.#fn_clientValue(e) - this.#mdp;
        // console.log('대기열: ', cv
        //     , this.#scrollPositionRatio, this.#scrollSizeRatio);
        this.#fn_setThumbPosition(cv);
        this.#fn_printSpanLog();

        this.dispatchEvent(new Event(eventTypes.SCROLL));
    }

    /**
     * MOUSE_UP
     * @param {Event} e
     * @returns {void}
     */
    #fn_mouseUp = (e?: Event): void => {
        window.removeEventListener(eventTypes.MOUSE_MOVE, this.#fn_mouseMove);
        window.removeEventListener(eventTypes.MOUSE_UP, this.#fn_mouseUp);
        window.removeEventListener(eventTypes.BLUR, this.#fn_mouseUp);
    }

    /**
     * MOUSE_DOWN
     * @param {MouseEvent} e
     */
    #fn_mouseDown = (e: MouseEvent): void => {
        if (e.button !== 0) return;

        window.addEventListener(eventTypes.MOUSE_MOVE, this.#fn_mouseMove);
        window.addEventListener(eventTypes.MOUSE_UP, this.#fn_mouseUp);
        window.addEventListener(eventTypes.BLUR, this.#fn_mouseUp);

        if (fn_containsRect(this.#rctThumb, e.offsetX, e.offsetY) === true) {
            this.#mdp = this.#fn_clientValue(e) - this.#thumbCheckLocation;

            this.#fn_mouseMove(e);
        }
        else {
            const cv: number = this.#fn_offsetValue(e) - (this.#thumbCheckSize / 2);
            this.#fn_setThumbPosition(cv);
            this.#fn_printSpanLog();
            this.#mdp = this.#fn_clientValue(e) - this.#thumbCheckLocation;

            this.dispatchEvent(new Event(eventTypes.SCROLL));
        }
    }

    /**
     * RESIZE
     * @param {Event} e
     */
    #fn_resize = (e: Event): void => {
        fn_updateRect(this.#elTarget, this.#rctGround);

        this.#fn_updateAfterResized();
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // #beh_md: (e: MouseEvent) => void = null!;
    // get #bindedEventHandler_mouseDown(): (e: MouseEvent) => void {
    //     if (this.#beh_md === null) {
    //         this.#beh_md = this.#fn_mouseDown.bind(this);
    //     }
    //     return this.#beh_md;
    // }

}

Object.freeze(ScrollLogic);
export { ScrollLogic, ScrollLogicType, type ScrollLogicConstructorParameters };

