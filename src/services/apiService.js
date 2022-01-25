import axios from 'axios'
import {config} from '../Consts'
import {AuthService} from './authService'

async function getSalaries(filter) {

    let call=async(header)=>{
        const response=await axios.post(`${config.path_base}/Salary/List`, filter, header)
        return response.data;
    }

    return callAuthorizedEndpoint(call);
}

async function saveSalary(salary) {
    const response = await axios.post(`${config.path_base}/Salary/Save`, salary)
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

async function getDate(){
    const response = await axios.post(`${config.path_base}/Date/GetDate`)
    return response.data;
}


async function callAuthorizedEndpoint(call) {
    let authService = new AuthService();
    return await authService.getUser().then(async user => {
        if (user && user.access_token) {
            const header = {
                headers: { Authorization: `Bearer ${user.access_token}` }
            };
            try {
                const result = await call(header);
                return result;
            }
            catch (error) {
                if (error.response != null && error.response.status === 401) {
                    authService.logout();
                    console.log("more code needed");
                }
            }
        }
        else {
            console.log("user not in the storage, cannot perform authorized call, trying normal call");
            return await call();
        }
    })
}

export default {
    getSalaries,
    saveSalary,
    removeSalary,
    getSalary,
    getDate
}