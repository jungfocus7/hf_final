import { IPageData } from "./base";
import { hfCountTask } from "./hfs/tool/hfCountTask";
export interface IPage2 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;
    _ct: hfCountTask;
    footerButtons: Array<HTMLButtonElement>;
}
export declare const _page2: IPage2;
