import { useEffect , useState} from "react";
import axios from 'axios'
import { ChatState } from "../context/chatContext";
import Sidebar from "./Sidebar";
import SearchAppBar from "./Navbar";
import Page from "./Page";
export default function Chat(){

    const [chats, setChats] = useState([]);
    const user = ChatState()
    // const fetchChats = async()=>{
    //     const {data} = await axios.get('http://localhost:3000/api/chat')
    //         //console.log(data);
    //     setChats(data)
    // }
    // useEffect(()=>{
    //     fetchChats();
    // },[])
    return(
       <>
  
            <SearchAppBar/>
            <div className="chat">
<div>
{  user &&   <Sidebar/>}
<p>{user.name} name of user</p>
   <Page/>
</div>
        </div>
        </>
    )
}