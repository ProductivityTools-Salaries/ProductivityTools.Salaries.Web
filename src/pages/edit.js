import React, { useState, useEffect } from 'react'
import apiService from '../services/apiService'
import {fields} from './fields'
import Button from '@material-ui/core/Button';

function Edit() {

    const [salary, setSalary] = useState({ name: "", b2b: false, valueConfirmed: 1 })
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
            <Button onClick={() => saveSalary(salary)} color="primary" variant="contained">Save</Button>
        </div>
    )
}

export default Edit