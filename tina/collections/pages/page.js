import { landingBlock } from "./home/landing";

const pages = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "md",
  ui: {
    router: (props) => {
      if (props.document._sys.relativePath === "home.md") return "/";
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "blocks",
      label: "Blocks",
      type: "object",
      list: true,
      templates: [landingBlock],
    },
  ],
};

export default pages;
