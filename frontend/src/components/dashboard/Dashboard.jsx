import React, { useEffect, useState } from "react";

const Dashboard = ()=>{
    const token= localStorage.getItem("token");
    const [users,setUser]= useState([]);

    useEffect(()=>{
        const fetchUser= async()=>{
            try {
                 const response = await fetch("http://localhost:8070/api/users",{
                    headers: {
                            Authorization : `Bearer ${token}`
                    }
            })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])
    return(
        <>
        </>
    )
}

export default Dashboard;