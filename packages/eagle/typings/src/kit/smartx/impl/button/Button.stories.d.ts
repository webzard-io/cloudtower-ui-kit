/// <reference types="react" />
declare const story: {
    title: string;
    decorators: ((...args: any) => any)[];
};
export declare const Basic: {
    (): JSX.Element;
    story: {
        name: string;
        parameters: {
            design: {
                type: string;
                url: string;
            };
        };
    };
};
export default story;
