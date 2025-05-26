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
            ui:{
                defaultItem:{
                    width:420,
                    height:220
                }
            },
            fields:[{
                name:'src',
                label:'Images',
                type:'image'
            },
            {
            name: 'width',
            label: 'Image-Width',
            type: 'number',
            },
            {
            name: 'height',
            label: 'Image-Height',
            type: 'number',
            },
            {
                name:'top',
                label:'Top',
                type:'number'
            },
            {
                name:'right',
                label:'Right',
                type:'number'
            },
            {
                name:'bottom',
                label:'Bottom',
                type:'number'
            },
            {
                name:'left',
                label:'Left',
                type:'number'
            },
            {
                name:'zIndex',
                label:'Z-Index',
                type:'number'
            }]
        }
    ]
}