import { IconPickerField } from "../../../components/IconPicker";
import * as FaIcons from "react-icons/fa";
const iconNames = Object.keys(FaIcons);

export const cards = {
    name:"cards",
    label:'Cards',
    fields:[
        {
            name:'cards_heading',
            type:'string',
            label:'heading'
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
           
            ]
        },

    ]
}