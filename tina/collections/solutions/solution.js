import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../components/IconPicker";
const iconNames = Object.keys(FaIcons);


const solutions = {
    name:'solution',
    label: "Solution",
    path: "content/solutions",
    format: "md",
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
        }
    ]
}

export default solutions