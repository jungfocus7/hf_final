import { dcs, eventTypes } from "./hfs/hfcom";
import { Tween, easeBounce } from "./hfs/tool/hfTween";
import { _page1 } from "./pages/page1";
import { _page2 } from "./pages/page2";
import { _page3 } from "./pages/page3";
import { _page4 } from "./pages/page4";
import { _page5 } from "./pages/page5";
import "./style.css";
import "./pages/page-com.css";
dcs.isLog = true;
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
const fn_pagesPositionOrder = () => {
    const elArr = Array.from(_pageContainer.children);
    elArr.forEach((te, ti, ta) => {
        te.remove();
    });
    elArr.sort((e1, e2) => {
        const m1 = e1.dataset;
        const m2 = e2.dataset;
        const i1 = ~~m1.index;
        const i2 = ~~m2.index;
        return i1 - i2;
    });
    for (const he of elArr) {
        _pageContainer.appendChild(he);
    }
};
const _twr = new Tween(0, 64, easeBounce.easeOut);
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
_page1.rootContainer = _rootContainer;
_page1.leftMenuContainer = _leftMenuContainer;
_page1.pageContainer = _pageContainer;
_page1.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page1.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page1);
_page2.rootContainer = _rootContainer;
_page2.leftMenuContainer = _leftMenuContainer;
_page2.pageContainer = _pageContainer;
_page2.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page2.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page2);
_page3.rootContainer = _rootContainer;
_page3.leftMenuContainer = _leftMenuContainer;
_page3.pageContainer = _pageContainer;
_page3.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page3.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page3);
_page4.rootContainer = _rootContainer;
_page4.leftMenuContainer = _leftMenuContainer;
_page4.pageContainer = _pageContainer;
_page4.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page4.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page4);
_page5.rootContainer = _rootContainer;
_page5.leftMenuContainer = _leftMenuContainer;
_page5.pageContainer = _pageContainer;
_page5.fn_pagesPositionOrder = fn_pagesPositionOrder;
_page5.fn_scrollJump = fn_scrollJump;
_pageDataArr.push(_page5);
fn_createMenuAll();
fn_createPageAll();
fn_scrollJump(_pageDataArr?.at(-1)?.pageElement);
const _mooInfo = Object.seal({
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
    const moobt = _leftMenuContainer.querySelector('span.moobt');
    moobt.addEventListener(eventTypes.CLICK, (e) => {
        console.log('시박하세요.', _leftMenuContainer.style, _mooInfo.isOn);
        const sts = _leftMenuContainer.style;
        if (_mooInfo.isOn === true) {
            sts.setProperty('width', '10px');
            _mooInfo.isOn = false;
        }
        else {
            sts.removeProperty('width');
            _mooInfo.isOn = true;
        }
    });
    _mooInfo.elBtn = moobt;
})();
