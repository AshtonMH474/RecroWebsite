export const jobsBlock = {
    name:"jobs",
    label:"Jobs",
    fields:[
        {
            name:'jobsHeading',
            type:'string',
            label:"Jobs Heading"
        },
        {
            name:"buttonLabel",
            label:"Button Label",
            type:"string"
        },
        {
            name:"buttonType",
            label:"Button Type",
            type:"string",
            options:["border", "button"]
        }
    ]
}