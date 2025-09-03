export const performancesSolution = {
    name:'performances',
    label:'Past Performances for Solution',
    fields:[
        {
            name:'performance_heading',
            label:'Heading',
            type:'string'
        },
        {
            name:'underline_width',
            type:'number',
            label:'Underline Width(in pixles)'
        },
        {
            name:'performances',
            label:'Past Perfromances',
            type:'object',
            list:true,
            fields:[
                {
                    name:'performance',
                    label:'Performance',
                    type:'reference',
                    collections:["performance"]
                }
            ]
        }
    ]
}