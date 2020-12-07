import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'
import Moment from 'react-moment';
import { fields } from './fields'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useConfirm } from 'material-ui-confirm';
import { useHistory } from 'react-router-dom'

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

    useEffect(() => {
        getSalaries(filter);
    }, []);

    const checkboxFilter=(value)=>{
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

    const applyFilters = (e,type) => {
        const { name, value } = e.target;
        debugger;
       
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

    const createFilter = f => {
        if (f.Type == "checkbox") {
            return (
            <Select width="100px" id="select" name={f.Name} data-type='pawel' value={filter[f.field]} onChange={(e)=>applyFilters(e,f.Type)}>
                <MenuItem value="">Both</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
            </Select>)
        }
        return (<input style={{ width: f.width }} name={f.Name} value={filter[f.field]} onChange={(e)=>applyFilters(e,f.Type)} />)
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
                                return (<th>[{field.Label}]</th>)
                            })}
                        </tr>
                        <tr>
                            {fields.map((f) => {
                                if (f.filtered) {
                                    return (<td>{createFilter(f)}</td>)
                                }
                                else {
                                    return (<td>{f.Label}</td>)
                                }
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map(item => (
                            <tr key={item.salaryId}>
                                {fields.map((f) => {
                                    if (f.Type == "date") {
                                        return <td><Moment format="YYYY.MM.DD">{item[f.field]}</Moment></td>
                                    }
                                    else {
                                        if (f.Type == "checkbox") {
                                            return <td>{Number(item.b2b)}</td>
                                        }
                                        else {
                                            return <td>{item[f.field]}</td>
                                        }
                                    }
                                })}
                                <td>
                                    <IconButton onClick={() => handleDelete(item)}>
                                        <DeleteIcon />
                                    </IconButton>
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