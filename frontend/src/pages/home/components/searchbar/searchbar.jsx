import { useContext} from "react"
import "./searchbar.css"
import useGetConversations from "../../../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { MyContext } from "../../../../App";

const SearchBar = ()=>{

    const { searchedUser, setSearchedUser} = useContext(MyContext)

    const {loading, conversations} = useGetConversations();


    const handleClick=(e)=>{
        e.preventDefault();

        if(!conversations){
            return
        };

        if (searchedUser.length==0){
            return toast.error("Can not search empty values");
        }else if (searchedUser.length <3){
            return toast.error("Type atleast three characters");
        }

        for (let index in conversations) {
            if (conversations[index].userName.toLowerCase().includes(searchedUser.toLowerCase())) {
                console.log("found: ", conversations[index].userName);
                setSearchedUser("");
            }else{
                toast.error("No user found");
                setSearchedUser("");
                return
            }
        }
    }

    return(
        <div class="chat-search-box">
            <div class="input-group">
                <input class="form-control" placeholder="Search" value={searchedUser} onChange={(e)=>setSearchedUser(e.target.value)}></input>
                <div class="input-group-btn">
                    <button type="button" class="btn btn-info" onClick={handleClick}>
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;