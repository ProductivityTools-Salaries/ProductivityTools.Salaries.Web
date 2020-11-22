import React, {useState, useEffect} from 'react';
import apiService from '../services/apiService'


function Home(){

    useEffect(()=>{
        getSalaries();
    },[]);

    async function getSalaries(){
        const r=await apiService.getSalaries();

    }

    return(
        <div>pawel</div>
    )
}

export default Home;