import axios from 'axios'
import { config } from '../Consts'
import { toast } from 'react-toastify';
import { auth } from '../firebase'


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
    console.log("auth", auth);
    console.log("current user", auth.currentUser)
    if (auth && auth.currentUser && auth.currentUser.accessToken) {
        const header = {
            headers: { Authorization: `Bearer ${auth.currentUser.accessToken}` }
        };
        try {
            const result = await call(header);
            return result;
        }
        catch (error) {
            console.log(error)
        }
    }

    else {
        console.log("User not authenticated")
    }
}

const exportedObject={
    getSalaries,
    saveSalary,
    removeSalary,
    getSalary,
    getDate
}

export default exportedObject