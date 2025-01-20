import { useContext, useState} from "react"
import "./searchbar.css"
import useGetConversations from "../../../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { MyContext } from "../../../../App";
import { debounce } from "lodash";

const SearchBar = ()=>{

    const { searchedUser, setSearchedUser, searchedConversation, setSearchedConversation} = useContext(MyContext)
    const {loading, conversations} = useGetConversations();


    const handleSearch = (query) => {
        if (!conversations) return;

        if (query.length === 0) {
            setSearchedConversation([]);
            return;
        }

        const filteredConversations = conversations.filter((conv) =>
            conv.userName.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredConversations.length > 0) {
            setSearchedConversation(filteredConversations);
        } else {
            toast.error("No user found");
            // setSearchedConversation([]);
        }
    };
    
     // Debounce the search function
     const debouncedSearch = debounce(handleSearch, 300);

    const handleChange=(e)=>{
        e.preventDefault();
        const query = e.target.value;
        setSearchedUser(query);
        debouncedSearch(query);
    }

    return(
        <div class="chat-search-box">
            <div class="input-group">
                <input
                    className="form-control"
                    placeholder="Search..."
                    value={searchedUser}
                    onChange={handleChange}
                />
                <div class="input-group-btn">
                    <button type="button" class="btn btn-info" onClick={handleChange}>
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;