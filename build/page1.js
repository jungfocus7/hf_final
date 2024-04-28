import { dcs, eventTypes } from "./hfs/hfcom";
import { fn_isNum, fn_notNum, fn_isFloat, fn_isMinus, fn_isOdd, fn_isEven, fn_randRange } from "./hfs/hfnum";
import { fn_isStr, fn_notStr, fn_getLastNum, fn_str2Ab, fn_ab2Str } from "./hfs/hfstr";
import { fn_isArr, fn_notArr, fn_contains, fn_shuffle, fn_copy } from "./hfs/hfarr";
/**
 * 메뉴 생성
 * @returns
 */
const fn_createMenu = () => {
    const rt = _page1;
    if (rt.buttonElement !== null) {
        dcs.log('# 메뉴가 생성되어 있음');
        return;
    }
    else {
        const htmlButtonTag = `
<button type="button" class="c_bt"><span>01) hfcom</span></button>`.trim();
        rt.leftMenuContainer.insertAdjacentHTML('beforeend', htmlButtonTag);
        rt.buttonElement = rt.leftMenuContainer.querySelector('button.c_bt:last-child');
        // console.log('#rt.buttonElement:', rt.buttonElement);
        rt.buttonElement.addEventListener(eventTypes.CLICK, (e) => {
            rt.fn_createPage();
        });
        dcs.log('# 메뉴 생성완료');
    }
};
/**
 * 페이지 생성
 * @returns
 */
const fn_createPage = () => {
    const rt = _page1;
    if (rt.pageElement !== null) {
        dcs.log('# 페이지가 생성되어 있음');
        rt.fn_scrollJump?.(rt.pageElement);
        return;
    }
    else {
        const htmlPageTag = `
<div class="c_page" data-index="0">
<textarea class="c_tam" placeholder="empty" spellcheck="false" readonly></textarea>
<div class="c_btc">
    <button type="button" class="c_bt"><span>00)clear</span></button>
    <button type="button" class="c_bt"><span>01)hfnum</span></button>
    <button type="button" class="c_bt"><span>02)hfstr</span></button>
    <button type="button" class="c_bt"><span>03)hfarr</span></button>
</div>
</div>
        `.trim();
        rt.pageContainer.insertAdjacentHTML('beforeend', htmlPageTag);
        rt.pageElement = rt.pageContainer.querySelector('div.c_page:last-child');
        rt.fn_pagesPositiontOrder?.();
        rt.textArea = rt.pageElement.querySelector('textarea.c_tam');
        const btns = rt.pageElement.querySelectorAll('div.c_btc > button.c_bt');
        rt.footerButtons = Array.from(btns);
        const fn_btnClick0 = (e = null) => {
            rt.fn_print();
        };
        btns[0].addEventListener(eventTypes.CLICK, fn_btnClick0);
        const fn_btnClick1 = (e = null) => {
            rt.fn_print('{{------------------------------  hfnum');
            const fn_print_isNum = (val) => {
                rt.fn_print(`fn_isNum(${val}): ${fn_isNum(val)}`);
            };
            fn_print_isNum(3.7);
            fn_print_isNum(6.0);
            fn_print_isNum('94123');
            fn_print_isNum((Math.PI / 2) + '::');
            rt.fn_print('');
            const fn_print_notNum = (val) => {
                rt.fn_print(`fn_notNum(${val}): ${fn_notNum(val)}`);
            };
            fn_print_notNum(3.7);
            fn_print_notNum(6.0);
            fn_print_notNum('94123');
            fn_print_notNum((Math.PI / 2) + '::');
            rt.fn_print('');
            const fn_print_isFloat = (val) => {
                rt.fn_print(`fn_isFloat(${val}): ${fn_isFloat(val)}`);
            };
            fn_print_isFloat(3.7);
            fn_print_isFloat(6.0);
            fn_print_isFloat(909.3);
            fn_print_isFloat(Math.PI);
            rt.fn_print('');
            const fn_print_isMinus = (val) => {
                rt.fn_print(`fn_isMinus(${val}): ${fn_isMinus(val)}`);
            };
            fn_print_isMinus(-3.45);
            fn_print_isMinus(943);
            fn_print_isMinus(-Math.PI);
            fn_print_isMinus(400 - 329);
            rt.fn_print('');
            const fn_print_randRange = (min, max) => {
                rt.fn_print(`fn_randRange(${min}, ${max}): ${fn_randRange(min, max)}`);
            };
            fn_print_randRange(1, 5);
            fn_print_randRange(17, 35);
            fn_print_randRange(92, 182);
            fn_print_randRange(7, 13);
            rt.fn_print('');
            const fn_print_isOdd = (val) => {
                rt.fn_print(`fn_isOdd(${val}): ${fn_isOdd(val)}`);
            };
            fn_print_isOdd(6);
            fn_print_isOdd(475);
            fn_print_isOdd(77);
            fn_print_isOdd(34);
            rt.fn_print('');
            const fn_print_isEven = (val) => {
                rt.fn_print(`fn_isEven(${val}): ${fn_isEven(val)}`);
            };
            fn_print_isEven(5);
            fn_print_isEven(17);
            fn_print_isEven(182);
            fn_print_isEven(93);
            rt.fn_print('}}------------------------------');
            rt.fn_print('');
            rt.fn_print('');
        };
        btns[1].addEventListener(eventTypes.CLICK, fn_btnClick1);
        const fn_btnClick2 = (e = null) => {
            rt.fn_print('{{------------------------------  hfstr');
            const fn_print_isStr = (val) => {
                rt.fn_print(`fn_isStr(${val}): ${fn_isStr(val)}`);
            };
            fn_print_isStr(true);
            fn_print_isStr('6.0');
            fn_print_isStr('jhb');
            fn_print_isStr(Math.PI);
            rt.fn_print('');
            const fn_print_notStr = (val) => {
                rt.fn_print(`fn_notStr(${val}): ${fn_notStr(val)}`);
            };
            fn_print_notStr(true);
            fn_print_notStr('6.0');
            fn_print_notStr('jhb');
            fn_print_notStr(Math.PI);
            rt.fn_print('');
            const fn_print_getLastNum = (val) => {
                rt.fn_print(`fn_getLastNum(${val}): ${fn_getLastNum(val)}`);
            };
            fn_print_getLastNum('name_1');
            fn_print_getLastNum('pook_061');
            fn_print_getLastNum('inoff_792');
            fn_print_getLastNum('name_9734');
            rt.fn_print('');
            const fn_print_str2Ab = (val) => {
                rt.fn_print(`fn_str2Ab(${val}): ${fn_str2Ab(val)}`);
            };
            fn_print_str2Ab('정희범');
            fn_print_str2Ab('박종명');
            fn_print_str2Ab('임헌진');
            fn_print_str2Ab('치치와몽이');
            rt.fn_print('');
            const fn_print_ab2Str = (ab) => {
                rt.fn_print(`fn_ab2Str(${ab}): ${fn_ab2Str(ab)}`);
            };
            fn_print_ab2Str(fn_str2Ab('정희범'));
            fn_print_ab2Str(fn_str2Ab('박종명'));
            fn_print_ab2Str(fn_str2Ab('임헌진'));
            fn_print_ab2Str(fn_str2Ab('치치와몽이'));
            rt.fn_print('}}------------------------------');
            rt.fn_print('');
            rt.fn_print('');
        };
        btns[2].addEventListener(eventTypes.CLICK, fn_btnClick2);
        const fn_btnClick3 = (e = null) => {
            rt.fn_print('{{------------------------------  hfarr');
            const fn_print_isArr = (arr) => {
                rt.fn_print(`fn_isArr(${arr}): ${fn_isArr(arr)}`);
            };
            fn_print_isArr([0, 1, 2, 3]);
            fn_print_isArr(Array.from('abcdefg'));
            fn_print_isArr('jhb');
            fn_print_isArr(337);
            rt.fn_print('');
            const fn_print_notArr = (arr) => {
                rt.fn_print(`fn_notArr(${arr}): ${fn_notArr(arr)}`);
            };
            fn_print_notArr([0, 1, 2, 3]);
            fn_print_notArr(Array.from('abcdefg'));
            fn_print_notArr('jhb');
            fn_print_notArr(337);
            rt.fn_print('');
            const fn_print_contains = (arr, e) => {
                rt.fn_print(`fn_contains(${arr}, ${e}): ${fn_contains(arr, e)}`);
            };
            fn_print_contains([0, 1, 2, 3], 3);
            fn_print_contains(Array.from('abcdefg'), 'g');
            fn_print_contains([9, 8, 7], 2);
            rt.fn_print('');
            const fn_print_shuffle = (arr) => {
                const pv = `fn_shuffle(${arr})`;
                fn_shuffle(arr);
                rt.fn_print(`${pv}: ${arr}`);
            };
            fn_print_shuffle([0, 1, 2, 3]);
            fn_print_shuffle(Array.from('abcdefg'));
            fn_print_shuffle(Array.from('pook61'));
            rt.fn_print('');
            const fn_print_copy = (arr) => {
                rt.fn_print(`fn_copy(${arr}): ${fn_copy(arr)}`);
            };
            fn_print_copy([0, 1, 2, 3]);
            fn_print_copy(Array.from('abcdefg'));
            fn_print_copy(Array.from('pook61'));
            rt.fn_print('}}------------------------------');
            rt.fn_print('');
            rt.fn_print('');
        };
        btns[3].addEventListener(eventTypes.CLICK, fn_btnClick3);
        fn_btnClick1();
        fn_btnClick2();
        fn_btnClick3();
        // rt.fn_scrollJump?.(rt.pageElement);
        dcs.log('# 페이지 생성완료');
    }
};
/**
 * 작업중지
 */
const fn_stop = () => {
};
/**
 * 기능출력
 * @param msg
 * @returns
 */
const fn_print = (msg = null) => {
    const rt = _page1;
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
export const _page1 = Object.seal({
    rootContainer: null,
    leftMenuContainer: null,
    pageContainer: null,
    buttonElement: null,
    pageElement: null,
    fn_createMenu,
    fn_createPage,
    fn_stop,
    fn_scrollJump: null,
    fn_pagesPositiontOrder: null,
    //~~extends
    textArea: null,
    fn_print,
    footerButtons: null,
});
