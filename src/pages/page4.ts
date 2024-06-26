import { IPageData } from "./base";
import { dcs, eventTypes } from "../hfs/hfcom";
import { Weich } from "../hfs/tool/hfWeich";


/**
 * 메뉴 생성
 * @returns
 */
const fn_createMenu = (): void => {
    const rt: IPage4 = _page4;

    if (rt.buttonElement !== null) {
        dcs.log('# 메뉴가 생성되어 있음');
        return;
    }
    else {
        const htmlButtonTag: string = `
<button type="button" class="c_bt"><span>04) hfWeich</span></button>`.trim();
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
    const rt: IPage4 = _page4;

    if (rt.pageElement !== null) {
        dcs.log('# 페이지가 생성되어 있음');
        rt.fn_scrollJump?.(rt.pageElement);
        return;
    }
    else {
        const htmlPageTag: string = `
<div class="c_page" data-index="3">
    <div class="c_round">
        <span class="c_nm">Tester__hfWeich</span>
        <svg class="c_svg">
            <circle id="scc" cx="60" cy="60" r="30" stroke="black" stroke-width="3" fill="red"/>
        </svg>
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

        rt._svgContainer = rt.pageElement.querySelector<SVGElement>('svg.c_svg')!;
        // dcs.log('rt._svgContainer: ', rt._svgContainer);

        rt._scc = rt._svgContainer.querySelector<SVGCircleElement>('circle#scc')!;
        // dcs.log('rt._scc: ', rt._scc);

        rt._ex = ~~rt._scc.getAttribute('cx')!;
        rt._ey = ~~rt._scc.getAttribute('cy')!;
        rt._twx = new Weich(rt._ex, 0.15);
        rt._twy = new Weich(rt._ey, 0.15);

        const fn_updateX = (evt: Event): void => {
            const ex: string = rt._twx.now.toString();
            rt._scc.setAttribute('cx', ex);
            fn_print(`UPDATE_X: ${ ex };`);
        };
        rt._twx.addEventListener(eventTypes.UPDATE, fn_updateX);
        const fn_updateY = (evt: Event): void => {
            const ey: string = rt._twy.now.toString();
            rt._scc.setAttribute('cy', ey);
            fn_print(`UPDATE_Y: ${ ey };`);
        };
        rt._twy.addEventListener(eventTypes.UPDATE, fn_updateY);

        const fn_endX = (evt: Event): void => {
            const ex: string = rt._twx.end.toString();
            rt._scc.setAttribute('cx', ex);
            fn_print(`END_X: ${ ex };`);
        };
        rt._twx.addEventListener(eventTypes.END, fn_endX);
        const fn_endY = (evt: Event): void => {
            const ey: string = rt._twy.end.toString();
            rt._scc.setAttribute('cy', ey);
            fn_print(`END_Y: ${ ey };`);
        };
        rt._twy.addEventListener(eventTypes.END, fn_endY);

        rt._svgContainer.addEventListener(eventTypes.CLICK, (evt: MouseEvent): void => {
            const mx: number = evt.offsetX;
            const my: number = evt.offsetY;
            rt._twx.to(mx);
            rt._twy.to(my);
            fn_print(null!);
            fn_print(`BEGIN: (X=${ rt._twx.now }, Y=${ rt._twy.now });`);
            fn_print(`END: (X=${ rt._twx.end }, Y=${ rt._twy.end });`);
        });

        const btns: NodeListOf<HTMLButtonElement> = rt.pageElement.querySelectorAll('div.c_btc > button.c_bt')!;
        rt.footerButtons = Array.from(btns);

        btns[0].addEventListener(eventTypes.CLICK, (evt: MouseEvent): void => {
            rt._twx.stop();
            rt._twy.stop();
            rt.fn_print(null!);
        });
        btns[1].addEventListener(eventTypes.CLICK, (evt: MouseEvent): void => {
            rt._twx.stop();
            rt._twy.stop();
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
    const rt: IPage4 = _page4;

    if (msg === null) {
        rt.textArea.value = '';
        return;
    }

    let txv: string = rt.textArea.value;
    txv += msg + '\n';
    rt.textArea.value = txv;
    rt.textArea.scrollTop = rt.textArea.scrollHeight;
};


export interface IPage4 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;

    _svgContainer: SVGElement;
    _scc: SVGCircleElement,
    _ex: number;
    _ey: number;
    _twx: Weich;
    _twy: Weich;
    footerButtons: Array<HTMLButtonElement>;
};

export const _page4: IPage4 = Object.seal({
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

    _svgContainer: null!,
    _scc: null!,
    _ex: null!,
    _ey: null!,
    _twx: null!,
    _twy: null!,
    footerButtons: null!,
});