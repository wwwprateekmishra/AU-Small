import { createContext } from "react";
import axios from "./Axios";
const URL = `http://${window.location.hostname}:3002`

const DasboardContext = createContext({
    getStates: async () => {
        let res = await axios.post(`${URL}/getstate`)
        return res.data
    },
    getData:async()=>{
        let res = await axios.post(`${URL}/getdata`)
        return res.data
    }
})
export default DasboardContext