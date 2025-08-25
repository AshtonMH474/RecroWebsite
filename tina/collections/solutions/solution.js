import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../components/IconPicker";
import { cards } from "./blocks/cards";
import { statements } from "./blocks/statements";
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
            name:'mainPdf',
            label:'Main Pdf',
            type:'image'
        },
        {
            name:'blocks',
            label:"Blocks",
            type:'object',
            list:true,
            templates:[cards,statements]
        }
    ]
}

export default solutions