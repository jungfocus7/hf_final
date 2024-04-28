import { IPageData } from "./base";
import { dcs, eventTypes } from "../hfs/hfcom";
import { hfCountTask } from "../hfs/tool/hfCountTask";


/**
 * 메뉴 생성
 * @returns
 */
const fn_createMenu = (): void => {
    const rt: IPage2 = _page2;

    if (rt.buttonElement !== null) {
        dcs.log('# 메뉴가 생성되어 있음');
        return;
    }
    else {
        const htmlButtonTag: string = `
<button type="button" class="c_bt"><span>02) hfCountTask</span></button>`.trim();
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
    const rt: IPage2 = _page2;

    if (rt.pageElement !== null) {
        dcs.log('# 페이지가 생성되어 있음');
        rt.fn_scrollJump?.(rt.pageElement);
        return;
    }
    else {
        const htmlPageTag: string = `
<div class="c_page" data-index="1">
    <textarea class="c_tam" placeholder="empty" spellcheck="false" readonly></textarea>
    <div class="c_btc">
        <button type="button" class="c_bt"><span>00)clear</span></button>
        <button type="button" class="c_bt"><span>01)prev()</span></button>
        <button type="button" class="c_bt"><span>02)next()</span></button>
        <button type="button" class="c_bt"><span>03)reset()</span></button>
    </div>
</div>
        `.trim();
        rt.pageContainer.insertAdjacentHTML('beforeend', htmlPageTag);

        rt.pageElement = rt.pageContainer.querySelector<HTMLDivElement>('div.c_page:last-child')!;
        rt.fn_pagesPositiontOrder?.();

        rt.textArea = rt.pageElement.querySelector<HTMLTextAreaElement>('textarea.c_tam')!

        rt._ct = new hfCountTask(35, 55, 3);
        rt.fn_print(`countStart: ${ rt._ct.countStart };`);
        rt.fn_print(`countEnd: ${ rt._ct.countEnd };`);
        rt.fn_print(`plusValue: ${ rt._ct.plusValue };`);
        rt.fn_print(`count: ${ rt._ct.count };`);
        rt.fn_print('');

        const btns: NodeListOf<HTMLButtonElement> = rt.pageElement.querySelectorAll('div.c_btc > button.c_bt')!;
        rt.footerButtons = Array.from(btns);

        btns[0].addEventListener(eventTypes.CLICK, (e: Event = null!): void => {
            rt.fn_print();
        });

        btns[1].addEventListener(eventTypes.CLICK, (e: Event = null!): void => {
            rt._ct.prev();
            rt.fn_print(`countStart: ${ rt._ct.countStart };`);
            rt.fn_print(`countEnd: ${ rt._ct.countEnd };`);
            rt.fn_print(`plusValue: ${ rt._ct.plusValue };`);
            rt.fn_print(`count: ${ rt._ct.count };`);
            rt.fn_print('');
        });

        btns[2].addEventListener(eventTypes.CLICK, (e: Event = null!): void => {
            rt._ct.next();
            rt.fn_print(`countStart: ${ rt._ct.countStart };`);
            rt.fn_print(`countEnd: ${ rt._ct.countEnd };`);
            rt.fn_print(`plusValue: ${ rt._ct.plusValue };`);
            rt.fn_print(`count: ${ rt._ct.count };`);
            rt.fn_print('');
        });

        btns[3].addEventListener(eventTypes.CLICK, (e: Event = null!): void => {
            rt._ct.reset();
            rt.fn_print(`countStart: ${ rt._ct.countStart };`);
            rt.fn_print(`countEnd: ${ rt._ct.countEnd };`);
            rt.fn_print(`plusValue: ${ rt._ct.plusValue };`);
            rt.fn_print(`count: ${ rt._ct.count };`);
            rt.fn_print('');
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
    const rt: IPage2 = _page2;

    if (msg === null) {
        rt.textArea.value = '';
        return;
    }

    let txv: string = rt.textArea.value;
    txv += msg + '\n';
    rt.textArea.value = txv;
    rt.textArea.scrollTop = rt.textArea.scrollHeight;
};


export interface IPage2 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;

    _ct: hfCountTask;
    footerButtons: Array<HTMLButtonElement>;
};

export const _page2: IPage2 = Object.seal({
    rootContainer: null!,
    leftMenuContainer: null!,
    pageContainer: null!,

    buttonElement: null!,
    pageElement: null!,

    fn_createMenu,
    fn_createPage,
    fn_stop,

    fn_scrollJump: null!,
    fn_pagesPositiontOrder: null!,

    //~~extends
    textArea: null!,
    fn_print,

    _ct: null!,
    footerButtons: null!,
});