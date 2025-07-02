export const leadershipBlock = {
    name:"leadership",
    label:"Leadership",
    fields:[
        {
            name:'leadershipHeading',
            type:"string",
            label:"Leadership Heading"
        },
        {
            name:'leadership_id',
            type:'string',
            label:'Leadership Id(Must be the same Id as Link Id if you want scroll affect for Section)'
        },
        {
            name:'leaders',
            label:'Leaders',
            type:'object',
            list:true,
            fields:[
                {
                    name:'src',
                    label:'image',
                    type:'image'
                },
                {
                    name:'name',
                    label:'Name',
                    type:'string'
                },
                {
                    name:'title',
                    label:'Title',
                    type:'string'
                },
                {
                    name:'bio',
                    label:'Bio',
                    type:'rich-text'
                }
            ]
        }
    ]

}