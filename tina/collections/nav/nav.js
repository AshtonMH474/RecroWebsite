

const nav = {
  name: "nav",
  label: "Navigation",
  path: "content/nav",
  format: "md",
  fields: [
    {
      name: "logo",
      label: "Logo",
      type: "image",
    },
    {
        name:'animation',
        label:'Animation Link Name',
        type:'string'
    },
    {
      name: "links",
      label: "Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: `${item?.label || "Link"} → ${item?.link || ""}`,
        }),
      },
      fields: [
        {
          type: "string",
          name: "link",
          label: "Link URL",
        },
        {
          type: "string",
          name: "label",
          label: "Link Label",
          
        },    
        {
          type: "string",
          name: "style",
          label: "Style",
          options: ["link", "button"],
          ui: {
            component: "select",
          },
        },
        
      ],
    },
  ],
  ui: {
    defaultItem: {
      links: [
        { label: "About", link: "/about", style: "link" },
        { label: "Careers", link: "/careers", style: "link" },
        { label: "Login", link: "/login", style: "button" },
      ],
    },
  },
};

export default nav;
