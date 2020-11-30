import axios from 'axios'

async function getSalaries(filter){
    const response=await axios.post('https://localhost:44322/Salary/List',filter)
    return response.data;
}

export default {
    getSalaries
}