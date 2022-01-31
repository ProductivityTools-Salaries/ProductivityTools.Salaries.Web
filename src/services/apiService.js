import axios from 'axios'
import { config } from '../Consts'
import { toast } from 'react-toastify';
import { AuthService } from './authService'

async function getSalaries(filter) {

    let call = async (header) => {
        const response = await axios.post(`${config.path_base}/Salary/List`, filter, header)
        return response.data;
    }
    return callAuthorizedEndpointWithToast(call, "Waiting for salary list", "Salary list returned");
}

async function saveSalary(salary) {

    let call = async (header) => {
        const response = await axios.post(`${config.path_base}/Salary/Save`, salary, header)
        return response.data;
    }
    return callAuthorizedEndpointWithToast(call, "Send save salary", "Salary saved");
}

async function getSalary(id) {
    let call = async (header) => {
        var address = `${config.path_base}/Salary/Get?salaryId=` + id;
        const response = await axios.post(address, {}, header)
        return response.data;
    }
    return callAuthorizedEndpointWithToast(call, "Save request sent", "Save done");
}

async function removeSalary(id) {
    let call=async(header)=>{
        var address = `${config.path_base}/Salary/Remove?salaryId=` + id;
        const response = await axios.post(address, {}, header)
        return response.data;
    }
   return callAuthorizedEndpointWithToast(call, "Remove salary request sent", "Remove done");
}

async function getDate() {
    const response = await axios.post(`${config.path_base}/Date/GetDate`)
    return response.data;
}


async function callAuthorizedEndpointWithToast(call, pendingMessage, successMessage) {
    return toast.promise(
        callAuthorizedEndpoint(call),
        {
            pending: pendingMessage ? pendingMessage : "Missing pending message",
            success: successMessage ? successMessage : "Missing sucesss message",
            error: 'something happned!!!!'
        }
    )
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
                throw error;
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