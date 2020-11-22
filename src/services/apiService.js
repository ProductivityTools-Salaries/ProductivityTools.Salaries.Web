import axios from 'axios'

async function getSalaries(){
    const response=await axios.get('https://localhost:44322/Salary/List')
    return response.data;
}

export default {
    getSalaries
}