import { dcs, eventTypes } from "./hfs/hfcom";
import { Tween, easeBounce } from "./hfs/tool/hfTween";
import { IPageData } from "./pages/base";
import { _page1 } from "./pages/page1";
import { _page2 } from "./pages/page2";
import { _page3 } from "./pages/page3";
import { _page4 } from "./pages/page4";
import { _page5 } from "./pages/page5";
import "./style.css";
import "./pages/page-com.css";


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 0) 초기화 부분
dcs.isLog = true;

const _rootContainer: HTMLDivElement =
    <HTMLDivElement>document.querySelector('div.c_rootContainer');
dcs.log('#_rootContainer:', _rootContainer);

const _leftMenuContainer: HTMLDivElement =
    <HTMLDivElement>_rootContainer.querySelector('div.c_leftMenuContainer');
dcs.log('#_leftMenuContainer:', _leftMenuContainer);

const _pageContainer: HTMLDivElement =
    <HTMLDivElement>_rootContainer.querySelector('div.c_pageContainer');
dcs.log('#_pageContainer:', _pageContainer);


const _pageDataArr: Array<IPageData> = [];

const fn_createMenuAll = (): void => {
    for (const pd of _pageDataArr) {
        pd.fn_createMenu();
    }
};

const fn_createPageAll = (): void => {
    for (const pd of _pageDataArr) {
        pd.fn_createPage();
    }
};

const fn_stopAll = (): void => {
    for (const pd of _pageDataArr) {
        pd.fn_stop();
    }
};

const fn_pagesPositionOrder = (): void => {
    const elArr: Array<Element> = Array.from(_pageContainer.children);

    // 엘리먼트 부모에서 제거
    elArr.forEach((te: Element, ti: Number, ta: Array<Element>): void => {
        te.remove();
    });

    // 엘리먼트 dataset.index순서로 정렬
    elArr.sort((e1: Element, e2: Element): number => {
        const m1: DOMStringMap = (<HTMLElement>e1).dataset;
        const m2: DOMStringMap = (<HTMLElement>e2).dataset;
        const i1: number = ~~m1.index!;
        const i2: number = ~~m2.index!;
        return i1 - i2;
    });

    // 엘리먼트들 부모에 다시 귀속
    for (const he of elArr) {
        _pageContainer.appendChild(he);
    }
}

const _twr: Tween = new Tween(0, 64, easeBounce.easeOut);
_twr.addEventListener(eventTypes.UPDATE, (e: Event): void => {
    _pageContainer.scrollTo(0, _twr.current);
});
const fn_scrollJump = (he: HTMLElement): void => {
    const begin: number = _pageContainer.scrollTop;
    let end: number = he.offsetTop - (_pageContainer.offsetTop + _pageContainer.clientTop);

    const max: number = _pageContainer.scrollHeight - _pageContainer.clientHeight;
    if (end > max) end = max;

    _twr.fromTo(begin, end);
};

// const fn_scrollJump = (he: HTMLElement): void => {
//     let end: number = he.offsetTop - (_pageContainer.offsetTop + _pageContainer.clientTop);
//     _pageContainer.scrollTo(0, end);
// };
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1) Page1
_page1.rootContainer = _rootContainer;
_page1.leftMenuContainer = _leftMenuContainer;
_page1.pageContainer = _pageContainer;
_page1.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page1.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page1);
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2) Page2
_page2.rootContainer = _rootContainer;
_page2.leftMenuContainer = _leftMenuContainer;
_page2.pageContainer = _pageContainer;
_page2.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page2.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page2);
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 3) Page3
_page3.rootContainer = _rootContainer;
_page3.leftMenuContainer = _leftMenuContainer;
_page3.pageContainer = _pageContainer;
_page3.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page3.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page3);
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 4) Page4
_page4.rootContainer = _rootContainer;
_page4.leftMenuContainer = _leftMenuContainer;
_page4.pageContainer = _pageContainer;
_page4.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page4.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page4);
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 5) Page5
_page5.rootContainer = _rootContainer;
_page5.leftMenuContainer = _leftMenuContainer;
_page5.pageContainer = _pageContainer;
_page5.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page5.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page5);
//#endregion


fn_createMenuAll();
fn_createPageAll();

fn_scrollJump(_pageDataArr?.at(-1)?.pageElement!);




//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const _mooInfo = Object.seal({
    /** @type {HTMLElement} */
    elBtn: null,

    isOn: true,
});
(() => {
    const insertWave = `
        <span class="moobt"
            style="position: absolute;
                display: inline-block;
                background-color: red;
                width: 17px; height: 20px;
                right: 0px; bottom: 5px;
                cursor: pointer;
                border-radius: 5px 0px 0px 5px;"></span>
    `.trim();
    _leftMenuContainer.insertAdjacentHTML('beforeend', insertWave);

    const moobt = _leftMenuContainer.querySelector<HTMLElement>('span.moobt')!;
    moobt.addEventListener(eventTypes.CLICK, (e: MouseEvent) => {
        console.log('시박하세요.', _leftMenuContainer.style, _mooInfo.isOn);
        const sts: CSSStyleDeclaration = _leftMenuContainer.style;
        if (_mooInfo.isOn === true) {
            sts.setProperty('width', '10px');
            _mooInfo.isOn = false;
        }
        else {
            sts.removeProperty('width');
            _mooInfo.isOn = true;
        }
    });
    _mooInfo.elBtn = <never>moobt;
})();


// const _moobt = _leftMenuContainer.querySelector<HTMLElement>('span.moobt')!;
// _moobt.addEventListener(eventTypes.CLICK, (e: MouseEvent) => {
//   console.log('시박하세요.', _leftMenuContainer.style);
//   const sts: CSSStyleDeclaration = _leftMenuContainer.style;
//   sts.setProperty('width', '10px');
// });
//#endregion