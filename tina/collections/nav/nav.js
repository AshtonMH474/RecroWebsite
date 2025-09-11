import SubLinkSelectorField from "../../components/LinkSelectorField";
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
      name:'height',
      label:'Logo Height(px)',
      type:'number',
    },
    {
      name:'authLabelLogin',
      label:'Login Label',
      type:'string'
    },
    {
      name:'authLabelSignout',
      label:'Sign Out Label',
      type:'string'
    },
    {
      name:'authStyle',
      label:'Style of Authentication Button',
      type:'string',
      options:['border','button']
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
            name: "linkOptions",
            label: "Link Options",
            type: "object",
            ui: {
              component: SubLinkSelectorField,
            },
            fields: [
              {
                name: "type",
                label: "Type",
                type: "string",
                options: ["link", "id"],
              },
              {
                name: "link",
                label: "Link URL",
                type: "string",
              },
              {
                name: "id",
                label: "Section ID (ID must be the same as cards Id to naviagte to section with Scroll affect when clicked)",
                type: "string",
              },
              {
              name: 'scrollPosition',
              label: 'Scroll Position',
              type: 'string',
              options: ['start', 'center', 'end']
              }
            ],
        },
        {
          type: "string",
          name: "label",
          label: "Link Label",
          
        },    
        {
        name: "link",
        label: "Link URL",
        type: "string",
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
        {
          type:'object',
          name:'sublinks',
          label:'Sublinks',
          list:true,
          fields:[
            {
              name: "linkOptions",
            label: "Link Options",
            type: "object",
            ui: {
              component: SubLinkSelectorField,
            },
            fields: [
              {
                name: "type",
                label: "Type",
                type: "string",
                options: ["link", "id"],
              },
              {
                name: "link",
                label: "Link URL",
                type: "string",
              },
              {
                name: "id",
                label: "Section ID (ID must be the same as cards Id to naviagte to section with Scroll affect when clicked)",
                type: "string",
              },
              {
              name: 'scrollPosition',
              label: 'Scroll Position',
              type: 'string',
              options: ['start', 'center', 'end']
              }
            ],
            },
            {
              type:"string",
              label:"Label",
              name:'label'
            }
          ]
        }
        
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
