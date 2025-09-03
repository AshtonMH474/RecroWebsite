export const allPerformances = {
    name: "performances",
    label: "All Performances",
    fields:[
        {
            name:'performance_heading',
            type:'string',
            label:'Heading'
        },
        {
            name:'performance_id',
            type:'string',
            label:'Performance Id(Must be the same Id as Link Id if you want scroll affect for Section)'
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
        }
    ]
}