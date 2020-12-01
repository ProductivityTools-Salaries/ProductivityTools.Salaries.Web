import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'


function Home() {

    const [salaries, setSalaries] = useState([])
    const [filter,setFilter]=useState({name:"",company:""})

    useEffect(() => {
        getSalaries();
    }, []);

    async function getSalaries() {
        const r = await apiService.getSalaries(filter);
        setSalaries(r);
    }

    return (
        <div>
            <div>
                <button onClick={()=>getSalaries(filter)}>Get</button>
            </div>
            <div>
                <table>
                    <tr>
                        <th>[SalaryId]</th>
                        <th>[Position]</th>
                        <th>[Value]</th>
                        <th>[Comment]</th>
                        <th>[Company]</th>
                        <th>[ValueConfirmed]</th>
                        <th>[CreationDate]</th>
                        <th>[Name]</th>
                        <th>[Source]</th>
                        <th>[Expectation]</th>
                        <th>[B2b]</th>
                    </tr>
                    <tr>
                        <td>salaryId</td>
                        <td>position</td>
                        <td>value</td>
                        <td>comment</td>
                        <td><input type="text" value={filter.company} onChange={e => setFilter({company: e.target.value})}/></td>
                        <td>.valueConfirmed</td>
                        <td>creationDate</td>
                        <td><input type="text" value={filter.name} onChange={e => setFilter({name: e.target.value})}/></td>
                        <td>source</td>
                        <td>expectation</td>
                        <td>b2b</td>
                    </tr>
                    {salaries.map(item => (
                        <tr>
                            <td>{item.salaryId}</td>
                            <td>{item.position}</td>
                            <td>{item.value}</td>
                            <td>{item.comment}</td>
                            <td>{item.company}</td>
                            <td>{item.valueConfirmed}</td>
                            <td>{item.creationDate}</td>
                            <td>{item.name}</td>
                            <td>{item.source}</td>
                            <td>{item.expectation}</td>
                            <td>{item.b2b?<p>Yes</p>:<p>No</p>}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Home;