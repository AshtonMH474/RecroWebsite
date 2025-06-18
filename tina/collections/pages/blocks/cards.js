
import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../../components/IconPicker";
const iconNames = Object.keys(FaIcons);

export const cards = {
    name:"cards",
    label:"Cards",
    fields:[
        {
            name:"cards_heading",
            type:'string'
        },
        {
            name:'underline_width',
            type:'number'
        },
        {
            name:'cards',
            label:'Cards',
            type:'object',
            list:true,
            fields:[
                {
                    name:'title',
                    type:'string'
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
                    type:'rich-text'
                },
                {
                    name:'allContentLink',
                    type:'string'
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
                    type:'rich-text'
                }
            ]
        }
    ]
}