import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'
import Moment from 'react-moment';


function Home() {

    const [salaries, setSalaries] = useState([])
    const [filter,setFilter]=useState({name:"",company:""})

    useEffect(() => {
        getSalaries(filter);
    }, []);

    async function getSalaries(filter) {
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
                    <thead>
                    <tr>
                        <th>[SalaryId]</th>
                        <th>[Position]</th>
                        <th>[Value]</th>
                        <th>[B2b]</th>
                        <th>[Company]</th>
                        <th>[CreationDate]</th>
                        <th>[Source]</th>
                        <th>[Comment]</th>
                        <th>[ValueConfirmed]</th>                 
                        <th>[Name]</th>                
                        <th>[Expectation]</th>
                        
                    </tr>
                    <tr>
                        <td>salaryId</td>
                        <td>position</td>
                        <td>value</td>
                        <td>b2b</td>
                        <td><input type="text" value={filter.company} onChange={e => setFilter({company: e.target.value})}/></td>
                        <td>creationDate</td>
                        <td>source</td>
                        <td>comment</td>
                        <td>.valueConfirmed</td>
                        <td><input type="text" value={filter.name} onChange={e => setFilter({name: e.target.value})}/></td>
                        <td>expectation</td>
                       
                    </tr>
                    </thead>
                    <tbody>
                    {salaries.map(item => (
                        <tr key={item.salaryId}>
                            <td>{item.salaryId}</td>
                            <td>{item.position}</td>
                            <td>{item.value}</td>
                            <td>{item.b2b?<p>Yes</p>:<p>No</p>}</td>
                            <td>{item.company}</td>
                            <td><Moment format="YYYY.MM.DD">{item.creationDate}</Moment></td>
                            <td>{item.source}</td>
                            <td>{item.comment}</td>
                            <td>{item.valueConfirmed}</td>
                            <td>{item.name}</td>
                            <td>{item.expectation}</td>                
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;