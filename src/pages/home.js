import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'


function Home() {

    const [salaries, setSalaries] = useState([])

    useEffect(() => {
        getSalaries();
    }, []);

    async function getSalaries() {
        const r = await apiService.getSalaries();
        setSalaries(r);
    }

    return (
        <div>
            <div>
                header
            </div>
            <div>
                <table>
                    {salaries.map(item => (
                        <tr>
                            <td>{item.salaryId}</td>
                            <td>{item.position}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Home;