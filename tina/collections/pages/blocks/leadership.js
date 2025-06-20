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
                }
            ]
        }
    ]

}