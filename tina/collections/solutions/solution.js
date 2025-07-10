import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../components/IconPicker";
import { cards } from "./blocks/cards";
const iconNames = Object.keys(FaIcons);


const solutions = {
    name:'solution',
    label: "Solution",
    path: "content/solutions",
    format: "md",
    ui: {
        router: ({ document }) => {
        return `/solutions/${document._sys.filename}`;
        },
    },
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
            name:'blocks',
            label:"Blocks",
            type:'object',
            list:true,
            templates:[cards]
        }
    ]
}

export default solutions