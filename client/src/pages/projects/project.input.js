export const ProjectInputs = [
    {
        id: 1,
        name: "title",
        type: "text",
        placeholder: "Title",
        label: "Title",
        errorMessage: "The Title should be 10-64 characters long!",
        pattern: "^.{10-64}$",
        required: true,
        customClass: "formTitle"
    },
    {
        id: 2,
        name: "customer",
        type: "text",
        placeholder: "Customer",
        label: "Customer",
        errorMessage: "Please enter a valid Customer Name! A valid Customer Name should contain 1-32 characters.",
        pattern: "^.{1-32}$",
        required: true,
        customClass: "formCustomer"
    },
    {
        id: 3,
        name: "industry",
        type: "text",
        placeholder: "Industry",
        label: "Industry",
        errorMessage: "Please enter a valid Industry Name! A valid Industry Name should contain 1-32 characters and no special Characters.",
        pattern: "^[A-Za-z]{1-32}$",
        required: true,
        customClass: "formIndustry"
    },
    {
        id: 4,
        name: "country",
        type: "text",
        placeholder: "Country",
        label: "Country",
        errorMessage: "Username should be 3-16 characters and shoulden't include any special character!",
        pattern: "^[A-Za-z]{3,}$",
        required: true,
        customClass: "formCountry"
    },
    {
        id: 5,
        name: "position",
        type: "text",
        placeholder: "Position",
        label: "Position",
        errorMessage: "Position should be 4-32 characters long and shoulden't include any special character!",
        pattern: "^[A-Za-z]{3-16}$",
        required: true,
        customClass: "formPosition"
    },
    {
        id: 6,
        name: "startDate",
        type: "date",
        placeholder: "Start Date",
        label: "Start Date",
        errorMessage: "Start Date should be a valid date (YYYY-MM-DD).",
        pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
        required: true,
        customClass: "formStartDate"
    },
    {
        id: 7,
        name: "endDate",
        type: "date",
        placeholder: "End Date",
        label: "End Date",
        errorMessage: "End Date should be a valid date (YYYY-MM-DD).",
        pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
        required: true,
        customClass: "formEndDate"
    },
    {
        id: 8,
        name: "description",
        type: "textarea",
        placeholder: "Description",
        label: "Description",
        errorMessage: "Please enter a Description!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formDescription"
    },
    {
        id: 9,
        name: "skills",
        type: "text",
        placeholder: "Skills",
        label: "Skills*",
        errorMessage: "Skills should be seperated by a comma!",
        pattern: "^(?:[a-zA-Z0-9 ]+,)*[a-zA-Z0-9 ]+$",
        required: false,
        customClass: "formSkills"
    },
    {
        id: 10,
        name: "location",
        type: "text",
        placeholder: "Location",
        label: "Location",
        errorMessage: "Username should be 3-16 characters and shoulden't include any special character!",
        pattern: "^[A-Za-z0-9]{3-16}$",
        required: true,
        customClass: "formLocation"
    },
    {
        id: 11,
        name: "teamSize",
        type: "text",
        placeholder: "Team Size",
        label: "Team Size",
        errorMessage: "Please enter a valid Team size! At leaset 16 characters.",
        pattern: "^.{16,}$",
        required: true,
        customClass: "formTeamSize"
    }
]