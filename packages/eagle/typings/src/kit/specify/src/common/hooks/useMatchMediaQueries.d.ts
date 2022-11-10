export declare enum LayoutMode {
    XS = "xs",
    SM = "sm",
    MD = "md",
    LG = "lg"
}
declare const useMatchMediaQueries: (mode?: {
    [key in LayoutMode]: string;
}) => LayoutMode;
export default useMatchMediaQueries;
