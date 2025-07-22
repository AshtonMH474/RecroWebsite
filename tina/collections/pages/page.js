import { cards } from "./blocks/cards";
import { jobsBlock } from "./blocks/jobs";
import { landingBlock } from "./blocks/landing";
import { landing2Block } from "./blocks/landing2";
import { leadershipBlock } from "./blocks/leadership";
import { learnAboutTeamBlock } from "./blocks/learn";
import { solutionsBlock } from "./blocks/solutions";
import { testimonies } from "./blocks/testimonies";

const pages = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "md",
  ui: {
    router: (props) => {
      if (props.document._sys.relativePath === "home.md") return "/";
      if (props.document._sys.relativePath === "about.md") return "/about";
      if (props.document._sys.relativePath === "careers.md") return "/careers";
      if(props.document._sys.relativePath === 'solutions.md') return "/solutions"
      if(props.document._sys.relativePath === 'vehicles.md') return "/about/vehicles"
      if(props.document._sys.relativePath === 'values.md') return "/careers/values"
      if(props.document._sys.relativePath === 'partners.md') return '/partners'
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
      templates: [landingBlock,landing2Block,cards,learnAboutTeamBlock,leadershipBlock,jobsBlock,solutionsBlock,testimonies],
    },
  ],
};

export default pages;
