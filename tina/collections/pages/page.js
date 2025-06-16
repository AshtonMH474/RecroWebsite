import { expertise } from "./home/expertise";
import { landingBlock } from "./home/landing";
import { learnAboutTeamBlock } from "./home/learn";

const pages = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "md",
  ui: {
    router: (props) => {
      if (props.document._sys.relativePath === "home.md") return "/";
      if (props.document._sys.relativePath === "about.md") return "/about";
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
      templates: [landingBlock,expertise,learnAboutTeamBlock],
    },
  ],
};

export default pages;
