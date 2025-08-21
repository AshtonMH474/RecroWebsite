export const priorityPartners = {
    name: "priorityPartners",
    label: 'Priority Partners',
    fields:[
        {
            name:"partners_heading",
            type:'string',
            label: 'Heading'
        },
        {
            name:'partners_id',
            type:'string',
            label:'Partners Id(Must be the same Id as Link Id if you want scroll affect for Section)'
        },
        {
            name:'scroll',
            type:'string',
            label:'Scroll Position(Must be same as sublinks or links scroll position)',
            options: ['start', 'center', 'end']
        },
         {
            name:'underline_width',
            type:'number',
            label:'Underline Width(in pixles)'
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
        }
        
    ]
}