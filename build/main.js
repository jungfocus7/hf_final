import "./style.css";
import "./pages/page-com.css";
import { dcs, eventTypes } from "./hfs/hfcom";
import { Tween, easeBounce } from "./hfs/tool/hfTween";
import { _page1 } from "./pages/page1";
import { _page2 } from "./pages/page2";
import { _page3 } from "./pages/page3";
import { _page4 } from "./pages/page4";
import { _page5 } from "./pages/page5";
//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 0) 초기화 부분
// dcs.isLog = true;
const _rootContainer = document.querySelector('div.c_rootContainer');
dcs.log('#_rootContainer:', _rootContainer);
const _leftMenuContainer = _rootContainer.querySelector('div.c_leftMenuContainer');
dcs.log('#_leftMenuContainer:', _leftMenuContainer);
const _pageContainer = _rootContainer.querySelector('div.c_pageContainer');
dcs.log('#_pageContainer:', _pageContainer);
const _pageDataArr = [];
const fn_createMenuAll = () => {
    for (const pd of _pageDataArr) {
        pd.fn_createMenu();
    }
};
const fn_createPageAll = () => {
    for (const pd of _pageDataArr) {
        pd.fn_createPage();
    }
};
const fn_stopAll = () => {
    for (const pd of _pageDataArr) {
        pd.fn_stop();
    }
};
const fn_pagesPositiontOrder = () => {
    const elArr = Array.from(_pageContainer.children);
    // 엘리먼트 부모에서 제거
    elArr.forEach((te, ti, ta) => {
        te.remove();
    });
    // 엘리먼트 dataset.index순서로 정렬
    elArr.sort((e1, e2) => {
        const m1 = e1.dataset;
        const m2 = e2.dataset;
        const i1 = ~~m1.index;
        const i2 = ~~m2.index;
        return i1 - i2;
    });
    // 엘리먼트들 부모에 다시 귀속
    for (const he of elArr) {
        _pageContainer.appendChild(he);
    }
};
const _twr = new Tween(0, 36, easeBounce.easeOut);
_twr.addEventListener(eventTypes.UPDATE, (e) => {
    _pageContainer.scrollTo(0, _twr.current);
});
const fn_scrollJump = (he) => {
    const begin = _pageContainer.scrollTop;
    let end = he.offsetTop - (_pageContainer.offsetTop + _pageContainer.clientTop);
    const max = _pageContainer.scrollHeight - _pageContainer.clientHeight;
    if (end > max)
        end = max;
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
_page1.fn_pagesPositiontOrder = fn_pagesPositiontOrder;
_page1.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page1);
//#endregion
//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2) Page2
_page2.rootContainer = _rootContainer;
_page2.leftMenuContainer = _leftMenuContainer;
_page2.pageContainer = _pageContainer;
_page2.fn_pagesPositiontOrder = fn_pagesPositiontOrder;
_page2.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page2);
//#endregion
//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 3) Page3
_page3.rootContainer = _rootContainer;
_page3.leftMenuContainer = _leftMenuContainer;
_page3.pageContainer = _pageContainer;
_page3.fn_pagesPositiontOrder = fn_pagesPositiontOrder;
_page3.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page3);
//#endregion
//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 4) Page4
_page4.rootContainer = _rootContainer;
_page4.leftMenuContainer = _leftMenuContainer;
_page4.pageContainer = _pageContainer;
_page4.fn_pagesPositiontOrder = fn_pagesPositiontOrder;
_page4.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page4);
//#endregion
//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 5) Page5
_page5.rootContainer = _rootContainer;
_page5.leftMenuContainer = _leftMenuContainer;
_page5.pageContainer = _pageContainer;
_page5.fn_pagesPositiontOrder = fn_pagesPositiontOrder;
_page5.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page5);
//#endregion
fn_createMenuAll();
fn_createPageAll();
