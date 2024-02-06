export interface BreadcrumbLink {
  name: string;
  // TODO Attributes that need to be removed
  id?: string;
  resource: string;
  tab?: string;

  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

export interface IBreadcrumbProps {
  items: BreadcrumbLink[];
}
