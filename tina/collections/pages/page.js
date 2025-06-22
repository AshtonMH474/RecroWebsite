import { cards } from "./blocks/cards";
import { landingBlock } from "./blocks/landing";
import { leadershipBlock } from "./blocks/leadership";
import { learnAboutTeamBlock } from "./blocks/learn";

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
      templates: [landingBlock,cards,learnAboutTeamBlock,leadershipBlock],
    },
  ],
};

export default pages;
