import axios from 'axios'

async function getSalaries(filter) {
    const response = await axios.post('https://localhost:44322/Salary/List', filter)
    return response.data;
}

async function saveSalary(salary) {
    const response = await axios.post('https://localhost:44322/Salary/Save', salary)
    return response.data;
}

async function getSalary(id){
    var address='https://localhost:44322/Salary/Get?salaryId='+id;
    const response = await axios.post(address, {})
    return response.data;
}

async function removeSalary(id) {
    var address='https://localhost:44322/Salary/Remove?salaryId='+id;
    debugger;
    const response = await axios.post(address, {})
    return response.data;
}

export default {
    getSalaries,
    saveSalary,
    removeSalary,
    getSalary
}