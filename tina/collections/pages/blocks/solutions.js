import * as FaIcons from "react-icons/fa";
import { IconPickerField } from "../../../components/IconPicker";
const iconNames = Object.keys(FaIcons);
export const solutionsBlock = {
    name:'solutions',
    label:'Solutions',
    fields:[
        {
            name:"solutions_heading",
            label:"Heading",
            type:'string'
        },
        {
            name:'link_heading',
            label:' Link Heading',
            type:'string'
        },
        {
            name:'pdf_heading',
            label:'PDF Heading',
            type:'string'
        },
        {
            name:'underline_width',
            type:'number',
            label:'Underline Width(in pixles)'
        },
        {
            name:'solutions_id',
            type:'string',
            label:'Solution Id(Must be the same Id as Link Id if you want scroll affect for Section)'
        },
        {
            name:'scroll',
            type:'string',
            label:'Scroll Position(Must be same as sublinks or links scroll position)',
            options: ['start', 'center', 'end']
        },
        {
            name:'link_icon',
            label:'Link Icon',
            type:'string',
            options:iconNames,
            ui:{
             component:IconPickerField
            }
        }
    ]
}