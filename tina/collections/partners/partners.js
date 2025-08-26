export const partners = {
    name:'partner',
    label:'Partner',
    path:'content/partners',
    format:'md',
    fields:[
        {
            name:'title',
            label:'Title',
            type:'string',
        },
        {
            name:'logo',
            label:'Logo',
            type:'image'
        },
        {
            name:'needsTitle',
            label:'Needs Title?',
            type:'boolean'
        },
        {
            name:'priority',
            label:'Is Partner a Priority?',
            type:'boolean'
        },
        {
            name: "category",
            label: "Category",
            type: "reference",
            collections: ["category"], 
        },
        {
            name:'link',
            label:'Partners Link',
            type:'string'
        }
    ]
}