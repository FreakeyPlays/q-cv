const AdminUserInput = [
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
    
];

const pwdInput = {
    id: 4,
    name: "password",
    type: "text",
    placeholder: "neues Passwort",
    required: true
}

export{
    AdminUserInput,
    pwdInput
}