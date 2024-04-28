import { IPageData } from "./base";
import { Weich } from "./hfs/tool/hfWeich";
export interface IPage5 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;
    _svgContainer: SVGElement;
    _scc: SVGCircleElement;
    _ex: number;
    _ey: number;
    _twx: Weich;
    _twy: Weich;
    footerButtons: Array<HTMLButtonElement>;
}
export declare const _page5: IPage5;
