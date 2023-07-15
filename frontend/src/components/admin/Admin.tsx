import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Admin(){
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    const navigate = useNavigate()
    useEffect(() => {
        userInfo && !userInfo.isAdmin && navigate("/records");
    },[])
    return <></>
}