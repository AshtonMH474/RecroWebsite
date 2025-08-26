import { allPartners } from "./blocks/allPartners";
import { cards } from "./blocks/cards";
import { jobsBlock } from "./blocks/jobs";
import { landingBlock } from "./blocks/landing";
import { landing2Block } from "./blocks/landing2";
import { leadershipBlock } from "./blocks/leadership";
import { learnAboutTeamBlock } from "./blocks/learn";
import { priorityPartners } from "./blocks/priorityPartners";
import { solutionsBlock } from "./blocks/solutions";
import { testimonies } from "./blocks/testimonies";

const pages = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "md",
  ui: {
    router: (props) => {
  // Remove the file extension
  const slug = props.document._sys.relativePath.replace(/\.md$/, "");

  // If it's `home.md`, route to root
  if (slug === "home") return "/";

  // Otherwise, convert folder paths like `careers/values` → `/careers/values`
  return `/${slug}`;
}
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
      templates: [landingBlock,landing2Block,cards,learnAboutTeamBlock,leadershipBlock,jobsBlock,solutionsBlock,testimonies,allPartners,priorityPartners],
    },
  ],
};

export default pages;
