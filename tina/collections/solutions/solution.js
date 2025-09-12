import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../components/IconPicker";
import { cards } from "./blocks/cards";
import { statements } from "./blocks/statements";
import { performancesSolution } from "./blocks/performance";
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
            name:'width',
            type:'number',
            label:"Width(percentage) For Desktop on this specifc page"
        },
        {
            name:'arrow',
            label:'Do you want an arrow pointing down?',
            type:'boolean'
        },
        {
            name:'blocks',
            label:"Blocks",
            type:'object',
            list:true,
            templates:[cards,statements,performancesSolution]
        }
    ]
}

export default solutions