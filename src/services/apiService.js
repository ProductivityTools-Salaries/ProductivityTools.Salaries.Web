import axios from 'axios'
import {config} from '../Consts'

async function getSalaries(filter) {
    const response = await axios.post(`${config.path_base}/Salary/List`, filter)
    return response.data;
}

async function saveSalary(salary) {
    const response = await axios.post('https://localhost:44322/Salary/Save', salary)
    return response.data;
}

async function getSalary(id){
    var address=`${config.path_base}/Salary/Get?salaryId=`+id;
    const response = await axios.post(address, {})
    return response.data;
}

async function removeSalary(id) {
    var address=`${config.path_base}/Salary/Remove?salaryId=`+id;
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