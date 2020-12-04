import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'
import Moment from 'react-moment';
import { fields } from './fields'
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useConfirm } from 'material-ui-confirm';


function Home() {

    const [salaries, setSalaries] = useState([])
    const [filter, setFilter] = useState({ name: "", company: "" })
    const confirm = useConfirm();

    const handleDelete = (item) => {
        confirm({ description: 'This will delete salary record from database.' })
            .then(() => {
                 apiService.removeSalary(item.salaryId); 
                })
            .catch(() => { /* ... */ });
    };

    useEffect(() => {
        getSalaries(filter);
    }, []);

    const applyFilters = e => {
        const { name, value } = e.target;

        setFilter(prevState => ({
            ...prevState, [name]: value
        }))
    }

    async function getSalaries(filter) {
        const r = await apiService.getSalaries(filter);
        setSalaries(r);
    }

    return (
        <div>
            <div>
                <button onClick={() => getSalaries(filter)}>Get</button>
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
                                return (<td><input type={f.Type} name={f.Name} value={filter[f.field]} onChange={applyFilters} /></td>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {salaries.map(item => (
                            <tr key={item.salaryId}>
                                {fields.map((f) => {
                                    return <td>{item[f.field]}</td>
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