import React, { useState, useEffect } from 'react'
import apiService from '../services/apiService'
import { fields } from './fields'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'

function Edit(params) {

    
    const [salary, setSalary] = useState({ name: "", b2b: false, valueConfirmed: 1 })
    const history = useHistory()

    useEffect(() => {
        var salaryid = params.match.params.salaryId;
        getSalary(salaryid);
    }, [params.match.params.salaryId]);

    async function getSalary(id) {
        
        var result = await apiService.getSalary(id);
        result.creationDate=result.creationDate.split('T')[0]
        setSalary(result);
    }

    const f = (type, value, checked) => {
        switch (type) {
            case "checkbox": return checked;
            case "number": return Number(value);
            default: return value;
        }
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
                setSalary(prevState => ({
            ...prevState,
            [name]: f(type, value, checked)

        }));
    }

    async function saveSalary() {
        await apiService.saveSalary(salary);
        history.push('/')
    }

    async function cancel(){
        history.push('/');
    }

    return (
        <div>
            <div style={{ float: "left", width: "200px" }}>Item</div>
            <div>Value</div>
            {fields.map((item) => {
                return (
                    <p style={{ margin: "0px" }} key={item.field}>
                        <span style={{ float: "left", width: "200px" }}>{item.Label}</span>
                        <input style={{ width: "200px" }} type={item.Type} name={item.Name} value={salary[item.field]||""} onChange={handleChange} readOnly={item.readonly} />
                    </p>)
            })}
            <Button onClick={() => saveSalary(salary)} color="primary" variant="contained">Save</Button>
            <Button onClick={cancel} color="secondary" variant="contained">Cancel</Button>
        </div>
    )
}

export default Edit