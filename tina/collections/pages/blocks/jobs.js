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
            name:'jobs_id',
            type:'string',
            label:'Jobs Id(Must be the same Id as Link Id if you want scroll affect for Section)'
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