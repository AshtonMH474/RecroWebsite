export const testimonies ={
    name:"testimonies",
    label:"Testimonies",
    fields:[
        {
        name:'testimoniesHeading',
        type:'string',
        label:'Heading'
        },
        {
            name:"testimonies_id",
            type:"string",
            label:'Testimonies Id(Must be the same Id as Link Id if you want scroll affect for Section)'
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
            name:'testimonies',
            label:'Testimonies',
            type:'object',
            list:true,
            fields:[
                {
                    name:'src',
                    label:'Image',
                    type:'image'
                },
                {
                    name:'name',
                    label:'Name',
                    type:'string'
                },
                {
                    name:"job",
                    label:'Job Title',
                    type:"string"
                },
                {
                    name:'quote',
                    label:'Quote',
                    type:'rich-text'
                }
            ]
        }

    ]
}