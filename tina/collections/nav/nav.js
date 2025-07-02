

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
              type:'string',
              name:'type',
              label:'Type of Sublink',
              options:['link','id']
        },
        {
              name:'id',
              label:'Id(Link connected to Section must have same Id for scroll affect)',
              type:'string',
        },
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
        {
          type:'object',
          name:'sublinks',
          label:'Sublinks',
          list:true,
          fields:[
            {
              type:'string',
              name:'type',
              label:'Type of Sublink',
              options:['link','id']
            },
            {
              name:'id',
              label:'Id(Link connected to Section must have same Id for scroll affect)',
              type:'string',
            },
            {
              name:'link',
              label:'Link',
              type:'string'
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
