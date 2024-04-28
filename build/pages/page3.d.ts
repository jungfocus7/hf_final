import { IPageData } from "./base";
import { ITween } from "../hfs/tool/hfTween";
export interface IPage3 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;
    _svgContainer: SVGElement;
    _scc: SVGCircleElement;
    _ex: number;
    _ey: number;
    _twx: ITween;
    _twy: ITween;
    footerButtons: Array<HTMLButtonElement>;
}
export declare const _page3: IPage3;
