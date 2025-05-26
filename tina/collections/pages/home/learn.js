export const learnAboutTeamBlock = {
    name: "learnTeam",
    label:"Learn About Team",
    fields:[
        {
            name:'headingLearnTeam',
            type:'rich-text'
        },
        {
            name:'learnTeamImages',
            label:'LearnTeamImages',
            type:'object',
            list:true,
            fields:[{
                name:'src',
                label:'Images',
                type:'image'
            }]
        }
    ]
}