export const fields = [
    { Label: "SalaryId", Type: "text", Name: "salaryId", field: "salaryId", readonly: true, filtered: false },
    { Label: "Position", Type: "text", Name: "position", field: "position", readonly: false, filtered: true },
    { Label: "Value", Type: "text", Name: "value", field: "value", readonly: false, filtered: true },
    { Label: "B2b", Type: "checkbox", Name: "b2b", field: "b2b", readonly: false, filtered: true },
    { Label: "Company", Type: "text", Name: "company", field: "company", readonly: false, filtered: true },
    { Label: "CreationDate", Type: "date", Name: "creationDate", field: "creationDate", readonly: false, filtered: true },
    { Label: "Name", Type: "text", Name: "name", field: "name", readonly: false, filtered: true },
    { Label: "Source", Type: "text", Name: "source", field: "source", readonly: false, filtered: true },
    { Label: "Expectation", Type: "text", Name: "expectation", field: "expectation", readonly: false, filtered: true },
    { Label: "Comment", Type: "text", Name: "comment", field: "comment", readonly: false, filtered: true },
    { Label: "ValueConfirmed", Type: "number", Name: "valueConfirmed", field: "valueConfirmed", readonly: false, filtered: false },
]

export default { fields, }