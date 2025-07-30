
import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../../components/IconPicker";
const iconNames = Object.keys(FaIcons);

export const cards = {
    name:"cards",
    label:"Cards",
    fields:[
        {
            name:"cards_heading",
            type:'string',
            label:'Heading'
        },
        {
            name:'cards_id',
            type:'string',
            label:'Cards Id(Must be the same Id as Link Id if you want scroll affect for Section)'
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
            name:'cards',
            label:'Cards',
            type:'object',
            list:true,
            fields:[
                {
                    name:'title',
                    type:'string',
                    label:'Title'
                },
                {
                    name:'icon',
                    type:'string',
                    options:iconNames,
                    ui:{
                        component:IconPickerField
                    }
                },
                {
                    name:'description',
                    type:'rich-text',
                    label:'Description'
                },
                {
                    name:'allContentLink',
                    type:'string',
                    label:'Open Card Link(if you want a modal with more content fill out the icon below, the link here , and the content'
                },
                {
                    name:'contentIcon',
                    type:'string',
                    options:iconNames,
                    ui:{
                        component:IconPickerField
                    }
                },
                {
                    name:'content',
                    type:'rich-text',
                    label:'Content'
                }
            ]
        }
    ]
}