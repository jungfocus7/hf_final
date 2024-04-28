export interface IPageData {
    rootContainer: HTMLDivElement;
    leftMenuContainer: HTMLDivElement;
    pageContainer: HTMLDivElement;

    buttonElement: HTMLButtonElement,
    pageElement: HTMLDivElement;

    fn_createMenu: () => void;
    fn_createPage: () => void;
    fn_stop: () => void;

    fn_scrollJump: (he: HTMLElement) => void;
    fn_pagesPositiontOrder: () => void;
};
