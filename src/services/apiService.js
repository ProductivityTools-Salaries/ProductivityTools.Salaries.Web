import axios from 'axios'

async function getSalaries(filter){
    const response=await axios.post('https://localhost:44322/Salary/List',filter)
    return response.data;
}

async function saveSalary(salary){
    const response=await axios.post('https://localhost:44322/Salary/Add',salary)
    return response.data;
}

export default {
    getSalaries,
    saveSalary
}