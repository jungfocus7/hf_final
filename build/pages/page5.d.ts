import { IPageData } from "./base";
import { ScrollLogic } from "../hfs/controls/hfScrollLogic";
export interface IPage5 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;
    _vscr: ScrollLogic;
    _hscr: ScrollLogic;
    footerButtons: Array<HTMLButtonElement>;
}
export declare const _page5: IPage5;
