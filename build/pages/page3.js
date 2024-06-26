import { dcs, eventTypes } from "../hfs/hfcom";
import { Tween, easeExponential } from "../hfs/tool/hfTween";
const fn_createMenu = () => {
    const rt = _page3;
    if (rt.buttonElement !== null) {
        dcs.log('# 메뉴가 생성되어 있음');
        return;
    }
    else {
        const htmlButtonTag = `
<button type="button" class="c_bt"><span>03) hfTween</span></button>`.trim();
        rt.leftMenuContainer.insertAdjacentHTML('beforeend', htmlButtonTag);
        rt.buttonElement = rt.leftMenuContainer.querySelector('button.c_bt:last-child');
        rt.buttonElement.addEventListener(eventTypes.CLICK, (e) => {
            rt.fn_createPage();
        });
        dcs.log('# 메뉴 생성완료');
    }
};
const fn_createPage = () => {
    const rt = _page3;
    if (rt.pageElement !== null) {
        dcs.log('# 페이지가 생성되어 있음');
        rt.fn_scrollJump?.(rt.pageElement);
        return;
    }
    else {
        const htmlPageTag = `
<div class="c_page" data-index="2">
    <div class="c_round">
        <span class="c_nm">Tester__hfTween</span>
        <svg class="c_svg">
            <circle id="scc" cx="60" cy="60" r="30" stroke="black" stroke-width="3" fill="blue"/>
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
        rt.pageElement = rt.pageContainer.querySelector('div.c_page:last-child');
        rt.fn_pagesPositionOrder?.();
        rt.textArea = rt.pageElement.querySelector('textarea.c_tam');
        rt._svgContainer = rt.pageElement.querySelector('svg.c_svg');
        rt._scc = rt._svgContainer.querySelector('circle#scc');
        rt._ex = ~~rt._scc.getAttribute('cx');
        rt._ey = ~~rt._scc.getAttribute('cy');
        rt._twx = new Tween(rt._ex, 60, easeExponential.easeInOut);
        rt._twy = new Tween(rt._ey, 60, easeExponential.easeInOut);
        const fn_updateX = (evt) => {
            const ex = rt._twx.current.toString();
            rt._scc.setAttribute('cx', ex);
            rt.fn_print(`UPDATE: X=${ex};`);
        };
        rt._twx.addEventListener(eventTypes.UPDATE, fn_updateX);
        const fn_updateY = (evt) => {
            const ey = rt._twy.current.toString();
            rt._scc.setAttribute('cy', ey);
            rt.fn_print(`UPDATE: Y=${ey};`);
        };
        rt._twy.addEventListener(eventTypes.UPDATE, fn_updateY);
        const fn_endX = (evt) => {
            const ex = rt._twx.end.toString();
            rt._scc.setAttribute('cx', ex);
            rt.fn_print(`END: X=${ex};`);
        };
        rt._twx.addEventListener(eventTypes.END, fn_endX);
        const fn_endY = (evt) => {
            const ey = rt._twy.end.toString();
            rt._scc.setAttribute('cy', ey);
            rt.fn_print(`END: Y=${ey};`);
        };
        rt._twy.addEventListener(eventTypes.END, fn_endY);
        rt._svgContainer.addEventListener(eventTypes.CLICK, (evt) => {
            const mx = evt.offsetX;
            const my = evt.offsetY;
            rt._twx.to(mx);
            rt._twy.to(my);
            rt.fn_print(null);
            rt.fn_print(`BEGIN: (X=${rt._twx.current}, Y=${rt._twy.current});`);
            rt.fn_print(`END: (X=${rt._twx.end}, Y=${rt._twy.end});`);
        });
        const btns = rt.pageElement.querySelectorAll('div.c_btc > button.c_bt');
        rt.footerButtons = Array.from(btns);
        btns[0].addEventListener(eventTypes.CLICK, (evt) => {
            rt._twx.stop();
            rt._twy.stop();
            rt.fn_print(null);
        });
        btns[1].addEventListener(eventTypes.CLICK, (evt) => {
            rt._twx.stop();
            rt._twy.stop();
        });
        dcs.log('# 페이지 생성완료');
    }
};
const fn_stop = () => {
};
const fn_print = (msg = null) => {
    const rt = _page3;
    if (msg === null) {
        rt.textArea.value = '';
        return;
    }
    let txv = rt.textArea.value;
    txv += msg + '\n';
    rt.textArea.value = txv;
    rt.textArea.scrollTop = rt.textArea.scrollHeight;
};
;
export const _page3 = Object.seal({
    rootContainer: null,
    leftMenuContainer: null,
    pageContainer: null,
    buttonElement: null,
    pageElement: null,
    fn_createMenu,
    fn_createPage,
    fn_stop,
    fn_scrollJump: null,
    fn_pagesPositionOrder: null,
    textArea: null,
    fn_print,
    _svgContainer: null,
    _scc: null,
    _ex: null,
    _ey: null,
    _twx: null,
    _twy: null,
    footerButtons: null,
});
