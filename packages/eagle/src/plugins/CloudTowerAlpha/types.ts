type Markdown = {
  type: "markdown";
};

type Link = {
  type: "link";
  link: string;
};

type Iframe = {
  type: "iframe";
};

type SunmaoUi = {
  type: "sunmao-ui";
};

export type Action = {
  id: string;
  name: string;
  keywords?: string;
  subtitle?: string;
  background_scripts?: string[];
  payload: Markdown | Link | Iframe | SunmaoUi;
};
