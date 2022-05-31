export const careerInput = [
    {
        id: 1,
        name: "title",
        type: "text",
        placeholder: "Title of activity",
        label: "Title of activity",
        required: true
    },
    {
        id: 2,
        name: "company",
        type: "text",
        placeholder: "Name of organisation",
        label: "Name of organisation",
        required: true
    },
    {
        id: 3,
        name: "location",
        type: "text",
        placeholder: "Location",
        label: "Location",
        required: false
    },
    {
        id: 4,
        name: "position",
        type: "text",
        placeholder: "Position",
        label: "Position",
        required: false
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
        required: false,
        customClass: "formEndDate"
    },
    {
        id: 8,
        name: "jobDescription",
        type: "textarea",
        placeholder: "Description",
        label: "Description",
        errorMessage: "Please provide a valid Description!",
        pattern: "^.{1,}$",
        required: false,
        customClass: "formDescription"
    }

]