import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'
import Moment from 'react-moment';
import { fields } from './fields'
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useConfirm } from 'material-ui-confirm';
import { useHistory } from 'react-router-dom'

function Home() {

    const [salaries, setSalaries] = useState([])
    const [filter, setFilter] = useState({ name: "", company: "" })
    const history = useHistory()
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

    const newSalary = () => {
        history.push('/Add')
    }

    async function getSalaries(filter) {
        const r = await apiService.getSalaries(filter);
        setSalaries(r);
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
                                    return (<td><input type={f.Type} name={f.Name} value={filter[f.field]} onChange={applyFilters} /></td>)
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
                                            debugger;
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