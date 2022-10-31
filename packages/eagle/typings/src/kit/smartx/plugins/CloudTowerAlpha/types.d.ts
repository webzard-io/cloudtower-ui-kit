declare type Markdown = {
    type: "markdown";
};
declare type Link = {
    type: "link";
    link: string;
};
declare type Iframe = {
    type: "iframe";
};
declare type SunmaoUi = {
    type: "sunmao-ui";
};
export declare type Action = {
    id: string;
    name: string;
    keywords?: string;
    subtitle?: string;
    background_scripts?: string[];
    payload: Markdown | Link | Iframe | SunmaoUi;
};
export {};
