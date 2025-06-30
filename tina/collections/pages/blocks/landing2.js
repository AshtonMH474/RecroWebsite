export const landing2Block = {
    name:'landing2',
    label:"Landing2",
    fields:[
        {
        name:"headingLanding2",
        label:"Heading",
        type:'rich-text'
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
        {
            name:'landing2Images',
            label:'Images',
            type:'object',
            list:true,
            fields:[
                {
                    name:'src',
                    label:"Image",
                    type:'image'
                }
            ]
        }
    ]
}