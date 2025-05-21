const nav = {
    name:'nav',
    label:'Navigation',
    path:'content/nav',
    format:'md',
    fields:[
        {   
            name:'logo',
            label:'Logo',
            type:'image'
        },
        {
            name:'links',
            label:'Links',
            type:"object",
            list:true,
            fields:[
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
                options: ["link", "button"],
                },
            ]
        },
    ]
}

export default nav;