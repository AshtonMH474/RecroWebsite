import { IconPickerField } from "../../../components/IconPicker";
import * as FaIcons from "react-icons/fa";
const iconNames = Object.keys(FaIcons);

export const statements = {
    name:'statements',
    label:"Capability Statements",
    fields:[
        {
            name:'statement_heading',
            type:'string',
            label:'heading'
        },
        {
            name:'statements',
            label:'Statements',
            type:'object',
            list:true,
            fields:[
                {
                    name:'title',
                    label:'Title',
                    type:'string'
                },
                {
                    name:'icon',
                    type:'string',
                    label:'Icon',
                    options:iconNames,
                    ui:{
                        component:IconPickerField
                    }
                },
                {
                    name:'description',
                    label:'Description',
                    type:'rich-text'
                }, 
                {
                name:'file',
                label:'Statement File',
                type:'image'
            }
            ]
        }
    ]
}