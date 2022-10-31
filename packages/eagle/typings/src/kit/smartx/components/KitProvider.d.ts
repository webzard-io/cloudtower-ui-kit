import { PropsWithChildren } from "react";
import { RootState } from "../store";
interface IProps {
}
declare const KitProvider: (props: PropsWithChildren<IProps>) => JSX.Element;
export default KitProvider;
export declare const useKitDispatch: () => import("redux").Dispatch<import("redux").AnyAction>;
export declare const useKitSelector: <Selected extends unknown>(selector: (state: RootState) => Selected, equalityFn?: ((previous: Selected, next: Selected) => boolean) | undefined) => Selected;
