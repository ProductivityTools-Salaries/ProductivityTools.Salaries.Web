import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'
import Moment from 'react-moment';
import { fields } from './fields'


function Home() {

    const [salaries, setSalaries] = useState([])
    const [filter, setFilter] = useState({ name: "", company: "" })

    useEffect(() => {
        getSalaries(filter);
    }, []);

    const applyFilters = e => {
        debugger;
        const { name, value } = e.target;

        setFilter(prevState => ({
            ...prevState, [name]: value
        }))
    }

    async function getSalaries(filter) {
        debugger;
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
                                <td><button>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;