export const landingBlock = {
  name: "landing",
  label: "Landing",
  fields: [
    {
      name: "heading",
      label:'Heading',
      type: "rich-text",
    },
    {
      name:'width',
      label:'Width(percentage) for Heading for Desktop',
      type:'number'
    },
    {
            name:'arrow',
            label:'Do you want an arrow pointing down?',
            type:'boolean'
    },
    {
      name:'isSection',
      label:'Is the next area solutions or cards?',
      type:'boolean'
    },
    {
      name: "buttons",
      label: "Buttons",
      type: "object",
      list: true,
      fields: [
        {
          type: "string",
          name: "link",
        },
        {
          type: "string",
          name: "label",
        },
        {
          type: "string",
          name: "style",
          options: ["border", "button"],
        },
      ],
    },
  ],
};