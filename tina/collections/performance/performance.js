import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../components/IconPicker";
const iconNames = Object.keys(FaIcons);

export const performances = {
    name: 'performance',
    label:'Past Performance',
    path:'content/performance',
    format:'md',
    fields:[
        {
            name:'title',
            label:'Title',
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
            name:'mainPdf',
            label:'Main PDF',
            type:'image'
        },
        {
            name:'category',
            label:"Category",
            type:'reference',
            collections:["category"]
        }
    ]
}