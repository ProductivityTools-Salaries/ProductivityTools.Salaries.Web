import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'
import Moment from 'react-moment';
import { fields } from './fields'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useConfirm } from 'material-ui-confirm';
import { Link, useHistory } from 'react-router-dom'

function Home() {

    const [salaries, setSalaries] = useState([])
    const [filter, setFilter] = useState({ name: "", company: "" })
    const history = useHistory()
    const confirm = useConfirm();

    const handleDelete = async (item) => {
        confirm({ description: 'This will delete salary record from database.' })
            .then(async () => {
                await apiService.removeSalary(item.salaryId);
                getSalaries(filter);
            })
            .catch(() => { /* ... */ });
    };

    const handleEdit = async (item) => {
        history.push('/Edit/' + item.salaryId)
    };

    useEffect(() => {
        getSalaries(filter);
    }, []);

    const checkboxFilter = (value) => {
        switch (value) {
            case "true": return true;
            case "false": return false;
            default: return undefined;
        }
    }

    const applyFiltersTyped = (type, value) => {
        switch (type) {
            case "checkbox": return checkboxFilter(value);
            case "number": return Number(value);
            default: return value;
        }
    }

    const applyOrder = (field) => {
        debugger;
        if (filter.orderBy == null) {
            setFilter(prevState => ({
                ...prevState, 'orderBy': field.field, 'OrderByDescending': null
            }))
        }
        else {
            setFilter(prevState => ({
                ...prevState, 'orderBy': null, 'OrderByDescending': field.field
            }))
        }
        getSalaries(filter);
    }


    const applyFilters = (e, type) => {
        const { name, value } = e.target;

        setFilter(prevState => ({
            ...prevState, [name]: applyFiltersTyped(type, value)
        }))
    }

    const newSalary = () => {
        history.push('/Add')
    }

    async function getSalaries(filter) {
        const r = await apiService.getSalaries(filter);
        setSalaries(r);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
           getSalaries(filter)
        }
    }


    const createFilter = f => {
        if (f.field === "b2b") {
            return (
                <Select width="100px" id="select" name={f.Name} data-type='pawel' value={filter[f.field]} onChange={(e) => applyFilters(e, f.Type)}>
                    <MenuItem value="">Both</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>)
        }
        return (<input style={{ width: f.width }} name={f.Name} value={filter[f.field]} onChange={(e) => applyFilters(e, f.Type)} onKeyDown={handleKeyDown} />)
    }



    return (
        <div>
            <div>
                <Button onClick={() => getSalaries(filter)} color="primary" variant="contained">Update list</Button>
                <Button onClick={() => newSalary()} color="primary" variant="contained">New</Button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {fields.map((field) => {
                                return (
                                    <th key={field.field}>
                                        <a href="#" onClick={() => applyOrder(field)}>  {field.Label}</a>
                                    </th>)
                            })}
                        </tr>
                        <tr>
                            {fields.map((f) => {
                                if (f.filtered) {
                                    return (<td key={f.field}>{createFilter(f)}</td>)
                                }
                                else {
                                    return (<td key={f.field}>{f.Label}</td>)
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {salaries && salaries.map(item => (
                            <tr key={item.salaryId}>
                                {fields.map((f) => {
                                    if (f.Type === "date") {
                                        return <td key={f.field}><Moment format="YYYY.MM.DD">{item[f.field]}</Moment></td>
                                    }
                                    else {
                                        if (f.Type === "checkbox") {
                                            return <td  key={f.field}>{Number(item.b2b)}</td>
                                        }
                                        else {
                                            return <td  key={f.field}>{item[f.field]}</td>
                                        }
                                    }
                                })}
                                <td >
                                    <span>
                                        <a href="#" onClick={() => handleEdit(item)}>Edit</a>
                                    </span>
                                </td>
                                <td >
                                    <span>
                                        <a href="#" onClick={() => handleDelete(item)}>Delete</a>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;