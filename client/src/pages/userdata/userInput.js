const  userInput = [
    {
        id: 1,
        name: "firstName",
        type: "text",
        placeholder: "Vorname",
        label: "Vorname",
        required: true
    },
    {
        id: 2,
        name: "lastName",
        type: "text",
        placeholder: "Nachname",
        label: "Nachname",
        required: true
    },
    {
        id: 3,
        name: "eMail",
        type: "text",
        placeholder: "E-Mail",
        label: "E-Mail",
        required: true
    },
    {
        id: 4,
        name: "sprachen",
        type: "text",
        placeholder: "Deutsch,Englisch,...",
        label: "Sprachen",
        errorMessage: "Please use the right Formatation! (..,..)",
        required: true
    },
    {
        id: 5,
        name: "kurzprofil",
        type: "textarea",
        label: "Kurzprofil",
        required: true,
    },
    {
        id: 6,
        name: "beratungsschwerpunkte",
        type: "text",
        placeholder: "Managment,Leiter,...",
        label: "Beratungsschwerpunkte",
        errorMessage: "Please use the right Formatation! (..,..)", 
        required: true
    },
    {
        id: 7,
        name: "projektRollen",
        type: "text",
        placeholder: "Scrum Master,Product Owner,...",
        label: "Projektrollen",
        errorMessage: "Please use the right Formatation! (..,..)",
        required: false,
    }
];

export{
    userInput
}