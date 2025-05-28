const form = {
    name:'contactForm',
    label:"Contact Forms",
    path:'content/forms',
    format:'md',
    fields:[
        { name: "firstName", type: "string", label: "First Name" },
        { name: "lastName", type: "string", label: "Last Name" },
        { name: "email", type: "string", label: "Email" },
        { name: "organization", type: "string", label: "Organization" },
        { name: "subject", type: "string", label: "Subject" },
        { name: "date", type: "datetime", label: "Date" },
        { name: "message", type: "rich-text", isBody: true },
    ]
}

export default form