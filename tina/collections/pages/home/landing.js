export const landingBlock = {
  name: "landing",
  label: "Landing",
  fields: [
    {
      name: "heading",
      type: "rich-text",
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