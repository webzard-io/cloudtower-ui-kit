import SkeletonContent, { type SkeletonContentProps } from "./Content";

export interface SkeletonType {
  Content: typeof SkeletonContent;
}

const Skeleton: SkeletonType = {
  Content: SkeletonContent,
};

export default Skeleton;

export { Skeleton, SkeletonContent };
export type { SkeletonContentProps };
