
import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../../components/IconPicker";
const iconNames = Object.keys(FaIcons);

export const expertise = {
    name:"expertise",
    label:"Expertise",
    fields:[
        {
            name:"expertise_heading",
            type:'string'
        },
        {
            name:'underline_width',
            type:'number'
        },
        {
            name:'expertise',
            label:'Expertise',
            type:'object',
            list:true,
            ui: {
                validate: (items) => {
                if (items?.length > 6) return "You can only have up to 6 items.";
                },
             },
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
                }
            ]
        }
    ]
}