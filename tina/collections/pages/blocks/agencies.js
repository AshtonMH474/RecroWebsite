export const agencies = {
    name: "agencies",
    label: 'Partners',
    fields:[
        {
            name:"agencies_heading",
            type:'string',
            label: 'Heading'
        },
        {
            name:'agencies_id',
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
            name:'partners',
            label:'Partners',
            type:'object',
            list:true,
            fields:[
                {
                    name:'agency',
                    label:'Partner Image',
                    type:'image'
                }
            ]
        }
    ]
}