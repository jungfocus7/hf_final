import { IPageData } from "./base";
import { dcs, eventTypes } from "../hfs/hfcom";
import { ScrollLogic, ScrollLogicType } from "../hfs/controls/hfScrollLogic";


/**
 * 메뉴 생성
 * @returns
 */
const fn_createMenu = (): void => {
    const rt: IPage5 = _page5;

    if (rt.buttonElement !== null) {
        dcs.log('# 메뉴가 생성되어 있음');
        return;
    }
    else {
        const htmlButtonTag: string = `
<button type="button" class="c_bt"><span>05) hfScroll</span></button>`.trim();
        rt.leftMenuContainer.insertAdjacentHTML('beforeend', htmlButtonTag);

        rt.buttonElement = rt.leftMenuContainer.querySelector<HTMLButtonElement>('button.c_bt:last-child')!;
        // dcs.log('#rt.buttonElement:', rt.buttonElement);

        rt.buttonElement.addEventListener(eventTypes.CLICK, (e: Event): void => {
            rt.fn_createPage();
        });

        dcs.log('# 메뉴 생성완료');
    }
};

/**
 * 페이지 생성
 * @returns
 */
const fn_createPage = (): void => {
    const rt: IPage5 = _page5;

    if (rt.pageElement !== null) {
        dcs.log('# 페이지가 생성되어 있음');
        rt.fn_scrollJump?.(rt.pageElement);
        return;
    }
    else {
        const htmlPageTag: string = `
<div class="c_page" data-index="4">
    <div class="c_round">
        <span class="c_nm">Tester__hfScroll</span>
        <div class="c_scroll-cont">
            <div id="vscr"></div>
            <div id="hscr"></div>
        </div>
    </div>
    <div class="c_foot">
        <textarea class="c_tam" placeholder="empty" spellcheck="false" readonly></textarea>
        <div class="c_btc">
            <button type="button" class="c_bt"><span>00)clear</span></button>
            <button type="button" class="c_bt"><span>01)stop</span></button>
        </div>
    </div>
</div>
        `.trim();
        rt.pageContainer.insertAdjacentHTML('beforeend', htmlPageTag);

        rt.pageElement = rt.pageContainer.querySelector<HTMLDivElement>('div.c_page:last-child')!;
        // dcs.log('rt.pageElement: ', rt.pageElement);
        rt.fn_pagesPositionOrder?.();

        rt.textArea = rt.pageElement.querySelector<HTMLTextAreaElement>('textarea.c_tam')!
        // dcs.log('rt.textArea: ', rt.textArea);

        let elTarget: HTMLDivElement = rt.pageContainer.querySelector('#vscr')!;
        // dcs.log('elTarget: ', elTarget);
        rt._vscr = new ScrollLogic({ logicType: ScrollLogicType.VERTICAL, target: elTarget });
        rt._vscr.fn_setScrollSizeRatio(0.3);
        rt._vscr.addEventListener(eventTypes.SCROLL, () => {
            const spr: number = rt._vscr.fn_getScrollPositionRatio();
            rt.fn_print(`${ ScrollLogicType.VERTICAL }: ${ spr }`);
        });

        elTarget = rt.pageContainer.querySelector('#hscr')!;
        // dcs.log('elTarget: ', elTarget);
        rt._hscr = new ScrollLogic({ logicType: ScrollLogicType.HORIZONTAL, target: elTarget });
        rt._hscr.fn_setScrollSizeRatio(0.7);
        rt._hscr.addEventListener(eventTypes.SCROLL, () => {
            const spr: number = rt._hscr.fn_getScrollPositionRatio();
            rt.fn_print(`${ ScrollLogicType.HORIZONTAL }: ${ spr }`);
        });


        const btns: NodeListOf<HTMLButtonElement> = rt.pageElement.querySelectorAll('div.c_btc > button.c_bt')!;
        rt.footerButtons = Array.from(btns);

        btns[0].addEventListener(eventTypes.CLICK, (evt: MouseEvent): void => {
            rt.fn_print(null!);
        });
        btns[1].addEventListener(eventTypes.CLICK, (evt: MouseEvent): void => {
        });

        // rt.fn_scrollJump?.(rt.pageElement);
        dcs.log('# 페이지 생성완료');
    }
};

/**
 * 작업중지
 */
const fn_stop = (): void => {
};

/**
 * 기능출력
 * @param msg
 * @returns
 */
const fn_print = (msg: string = null!): void => {
    const rt: IPage5 = _page5;

    if (msg === null) {
        rt.textArea.value = '';
        return;
    }

    let txv: string = rt.textArea.value;
    txv += msg + '\n';
    rt.textArea.value = txv;
    rt.textArea.scrollTop = rt.textArea.scrollHeight;
};


export interface IPage5 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;

    _vscr: ScrollLogic;
    _hscr: ScrollLogic;
    footerButtons: Array<HTMLButtonElement>;
};

export const _page5: IPage5 = Object.seal({
    rootContainer: null!,
    leftMenuContainer: null!,
    pageContainer: null!,

    buttonElement: null!,
    pageElement: null!,

    fn_createMenu,
    fn_createPage,
    fn_stop,

    fn_scrollJump: null!,
    fn_pagesPositionOrder: null!,

    //~~extends
    textArea: null!,
    fn_print,

    _vscr: null!,
    _hscr: null!,
    footerButtons: null!,
});