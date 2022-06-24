export const ProjectInputs = [
    {
        id: 1,
        name: "title",
        type: "text",
        placeholder: "e.g. Project Manager at...",
        label: "Title",
        errorMessage: "Please provide a valid Title!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formTitle"
    },
    {
        id: 2,
        name: "customer",
        type: "text",
        placeholder: "e.g. EnBW",
        label: "Customer",
        errorMessage: "Please provide a valid Customer!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formCustomer"
    },
    {
        id: 3,
        name: "industry",
        type: "text",
        placeholder: "e.g. Telecommunications",
        label: "Industry",
        errorMessage: "Please provide a valid Industry!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formIndustry"
    },
    {
        id: 4,
        name: "country",
        type: "text",
        placeholder: "e.g. Germany",
        label: "Country",
        errorMessage: "Please provide a valid Country!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formCountry"
    },
    {
        id: 5,
        name: "position",
        type: "text",
        placeholder: "e.g. Project Manager",
        label: "Position",
        errorMessage: "Please provide a valid Position!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formPosition"
    },
    {
        id: 6,
        name: "startDate",
        type: "date",
        placeholder: "Start Date",
        label: "Start Date",
        errorMessage: "Please provide a valid Date! (DD-MM-YYY)",
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
        errorMessage: "Please provide a valid Date! (DD-MM-YYY)",
        pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
        required: true,
        customClass: "formEndDate"
    },
    {
        id: 8,
        name: "description",
        type: "textarea",
        placeholder: "e.g. Mr. Doe took...",
        label: "Description",
        errorMessage: "Please provide a valid Description!",
        pattern: "^.{1,}$",
        required: true,
        customClass: "formDescription"
    },
    {
        id: 9,
        name: "activities",
        type: "text",
        placeholder: "e.g. Project management, Analysis,...",
        label: "Activities*",
        errorMessage: "Please provide valid Activities!",
        pattern: '(?:^|,)(?=[^"]|(")?)"?((?(1)[^"]*|[^,"]*))"?(?=,|$)',
        required: false,
        customClass: "formActivities"
    },
    {
        id: 10,
        name: "environment",
        type: "text",
        placeholder: "e.g. The Project environ...",
        label: "Environment*",
        errorMessage: "Please provide a valid Environment!",
        pattern: "^.{1,}$",
        required: false,
        customClass: "formEnvironment"
    },
    {
        id: 11,
        name: "location",
        type: "text",
        placeholder: "e.g. Stuttgart",
        label: "Location*",
        errorMessage: "Please provide a valid Location!",
        pattern: "^.{1,}$",
        required: false,
        customClass: "formLocation"
    },
    {
        id: 12,
        name: "teamSize",
        type: "text",
        placeholder: "e.g. About 20 Advisor",
        label: "Team Size*",
        errorMessage: "Please provide a valid Team Size!",
        pattern: "^.{1,}$",
        required: false,
        customClass: "formTeamSize"
    }
]