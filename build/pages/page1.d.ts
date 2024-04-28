import { IPageData } from "./base";
export interface IPage1 extends IPageData {
    textArea: HTMLTextAreaElement;
    fn_print: (msg?: string) => void;
    footerButtons: Array<HTMLButtonElement>;
}
export declare const _page1: IPage1;
