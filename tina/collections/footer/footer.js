const footer = {
    name:"footer",
    label:"Footer",
    path:'content/footer',
    format:"md",
    fields:[
        {
            name:"footerMessage",
            label:"Footer Message",
            type:"string"
        },
        {
            name:"links",
            label:"Links",
            type:"object",
            list:true,
            fields:[
                {
                    type:"string",
                    name:"link",
                    label:"Link URL"
                },
                {
                    type: "string",
                    name: "label",
                    label: "Link Label",
                }
            ]
        },
        {
            type:"string",
            name:"copyright",
            label:"Copyright"
        }
    ]
}

export default footer