import { useState, useEffect } from "react"

import { Axios } from "@/utils/axios"
import axios from "axios"


export default function Userlist() {
    const [users, setUsers] = useState([])


    const fetchUser = () => {
        Axios.get("/users")
        // axios.get("http://localhost:4000/users", {
        //     headers : {
        //         Authorization : 'Bearer '+ localStorage.getItem("access_token")
        //     }
        // })
            .then(res => {
                setUsers(res?.data?.data)
            })

    }


    useEffect(() => {
        fetchUser()
    }, [])



    return(
        <div className = "m-6">
        User list
        
        {
            users?.map(item=>{
                return (
                    <div key ={item?.id}> {item.name} </div>
                )
            })
        }
        
     </div>
    )
}