export const testimonials ={
    name:"testimonials",
    label:"Testimonials",
    fields:[
        {
        name:'testimonialsHeading',
        type:'string',
        label:'Heading'
        },
        {
            name:"testimonials_id",
            type:"string",
            label:'Testimonials Id(Must be the same Id as Link Id if you want scroll affect for Section)'
        },
        {
            name:'testimonials',
            label:'Testimonials',
            type:'object',
            list:true,
            fields:[
                {
                    name:'src',
                    label:'Image',
                    type:'image'
                },
                {
                    name:'name',
                    label:'Name',
                    type:'string'
                },
                {
                    name:"job",
                    label:'Job Title',
                    type:"string"
                },
                {
                    name:'quote',
                    label:'Quote',
                    type:'rich-text'
                }
            ]
        }

    ]
}