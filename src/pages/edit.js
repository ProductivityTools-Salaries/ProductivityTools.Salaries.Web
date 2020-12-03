import React, { useState, useEffect } from 'react'
import apiService from '../services/apiService'
import {fields} from './fields'

function Edit() {

    const [salary, setSalary] = useState({ name: "", b2b: false, valueConfirmed: 1 })

    // const fields = [
    //     { Label: "SalaryId", Type: "text", Name: "salaryId", field: salary.id, readonly: true },
    //     { Label: "Position", Type: "text", Name: "position", field: salary.position, readonly: false },
    //     { Label: "Value", Type: "text", Name: "value", field: salary.value, readonly: false },
    //     { Label: "Comment", Type: "text", Name: "comment", field: salary.comment, readonly: false },
    //     { Label: "Company", Type: "text", Name: "company", field: salary.company, readonly: false },
    //     { Label: "ValueConfirmed", Type: "number", Name: "valueConfirmed", field: salary.valueConfirmed, readonly: false },
    //     { Label: "CreationDate", Type: "date", Name: "creationDate", field: salary.creationDate, readonly: false },
    //     { Label: "Name", Type: "text", Name: "name", field: salary.name, readonly: false },
    //     { Label: "Source", Type: "text", Name: "source", field: salary.source, readonly: false },
    //     { Label: "Expectation", Type: "text", Name: "expectation", field: salary.expectation, readonly: false },
    //     { Label: "B2b", Type: "checkbox", Name: "b2b", field: salary.b2b, readonly: false },
    // ]

    const f = (type, value, checked) => {
        debugger;
        switch (type) {
            case "checkbox": return checked;
            case "number": return Number(value);
            default: return value;
        }
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        debugger
        setSalary(prevState => ({
            ...prevState,
            [name]: f(type, value, checked)

        }));
    }

    async function saveSalary() {
        debugger;
        await apiService.saveSalary(salary);
    }

    return (
        <div>
            <div style={{ float: "left", width: "200px" }}>Item</div>
            <div>Value</div>
            {fields.map((item) => {
                return (
                    <p style={{ margin: "0px" }}>
                        <div style={{ float: "left", width: "200px" }}>{item.Label}</div>
                        <input style={{ width: "200px" }} type={item.Type} name={item.Name} value={salary[item.field]} onChange={handleChange} readOnly={item.readonly}  />
                    </p>)
            })} 
            <button onClick={() => saveSalary(salary)}>Save</button>
        </div>
    )
}

export default Edit