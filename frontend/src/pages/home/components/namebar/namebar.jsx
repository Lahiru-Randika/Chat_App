import { useState, useContext, useEffect  } from "react";
import useGetConversations from "../../../../hooks/useGetConversations";
import { getRandomEmoji } from "../../../../utils/emojis";
import { MyContext } from "../../../../App.jsx";
import "./namebar.css"
import useConversation from "../../../../zustand/useConversation.js";
import SearchBar from "../searchbar/searchbar.jsx";
import { useSocketContext } from "../../../../context/socketContext.jsx";
import useListenNewMembers from "../../../../hooks/useListenNewMembers.js";
import useListenMessages from "../../../../hooks/useListenMessages.js";

const NameBar=({setClicked})=>{

    const {loading, conversations} = useGetConversations();
    const [clickedConIndex, setClickedConIndex] = useState(null);
    const [conWithNewUsers, setConWithNewUsers] = useState([]);

    const { currentRequestedChatName, setCurrentRequestedChatName, clickedMeToSeeMyChat, setClickedMeToSeeMyChat, searchedUser, setSearchedUser, currentRequestedPropic, setCurrentRequestedPropic, searchedConversation , unseenMessage, setUnseenMessage} = useContext(MyContext);

    //for listen to the message even if any chat is not selected
    useListenMessages();

    //--------------------------
    // const {selectedConversation, setSelectedConversation} = useConversation();
    // const isSelected = selectedConversation?._id === conversations._id;
    //-------------------------

    // console.log("All conversations: ",conversations)

    // map emojis with the conversations
    // const emojis = conversations.map(() => getRandomEmoji());

    const {onlineUsers} = useSocketContext();
    // const isOnline = onlineUsers.hasOwnProperty(conversations._id);

    const { conversationsList: realTimeNewUsers = []} = useListenNewMembers();



    useEffect(() => {
        if (Array.isArray(realTimeNewUsers) && Array.isArray(conversations)) {
            const allUsers = [...conversations, ...realTimeNewUsers];

            // const uniqueMessages = allMessages.filter(
            //     (msg, index, self) =>
            //         index === self.findIndex((m) => m._id === msg._id)
            // );

            setConWithNewUsers(allUsers);
        }
    }, [conversations, realTimeNewUsers]);

    const handleClicked = (Clickedindex, conversations)=>{

        // setSelectedConversation(conversations._id);
        setClicked(true);
        setClickedConIndex(Clickedindex);
        // console.log(conversations)

        setClickedMeToSeeMyChat(conversations._id);
        setCurrentRequestedChatName(conversations.userName);
        setCurrentRequestedPropic(conversations.profilepic);

        //remove the clicked_Id from the list for unseenMessages because we clicked that chat to see that message
        unseen();
    }

    useEffect(()=>{
        const unseen=()=>{
            setUnseenMessage((prevUnseen) => 
                prevUnseen.filter((id) => id !== clickedMeToSeeMyChat)
            );
        }
        unseen();
    },[setUnseenMessage,clickedMeToSeeMyChat])
    
    // console.log("UnseenMessage from namebar: ",unseenMessage)

    return(
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
            <div class="users-container">
                <div className="searchbar">
                    <SearchBar/>
                </div>
                
                <ul class="users">

                {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    ) : (
                        searchedConversation?.length === 0 ?
                            conWithNewUsers.map((conversation, index) => {
                                const isOnline = onlineUsers.includes(conversation._id);
                                return (
                                    <li
                                        className={`person ${clickedConIndex === index ? "active" : ""}`}
                                        data-chat={`person${index}`}
                                        onClick={() => handleClicked(index, conversation)}
                                        key={index}
                                    >
                                        <div className="user_list d-flex">
                                            <div className="user">
                                                <img src={conversation.profilepic} alt="User Avatar" />
                                                <span className={`status ${isOnline ? "online" : "offline"}`}></span>
                                            </div>
                                            <span>
                                                {unseenMessage.length>0 && unseenMessage.includes(conversation._id)?(
                                                    <p className="newMessage">New message</p>):(
                                                    ""
                                                    // emojis[index]
                                                )}
                                            </span>
                                        </div>
                                        <p className="name-time d-flex align-items-center">
                                            <span className="name">{conversation.userName}</span>
                                            <span className="time">{new Date(conversation.updatedAt).toLocaleString()} </span>
                                        </p>
                                    </li>
                                );
                            })
                            :
                            searchedConversation.map((conversation, index) => {
                                const isOnline = onlineUsers.includes(conversation._id);
                                return (
                                    <li
                                        className={`person ${clickedConIndex === index ? "active" : ""}`}
                                        data-chat={`person${index}`}
                                        onClick={() => handleClicked(index, conversation)}
                                        key={index}
                                    >
                                        <div className="user_list d-flex">
                                            <div className="user">
                                                <img src={conversation.profilepic} alt="User Avatar" />
                                                <span className={`status ${isOnline ? "online" : "offline"}`}></span>
                                            </div>
                                            <span>
                                                {unseenMessage?(
                                                    <p>No</p>):(
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                        <p className="name-time d-flex align-items-center">
                                            <span className="name">{conversation.userName}</span>
                                            <span className="time">{new Date(conversation.updatedAt).toLocaleString()} </span>
                                        </p>
                                    </li>
                                );
                            })
                        )
                    }
                </ul>
            </div>
        </div> 
    )
}
export default NameBar;




{/* <li class="person" data-chat="person1" onClick={() => setClicked(true)}>
    <div class="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
        <span class="status busy"></span>
    </div>
    <p class="name-time">
        <span class="name">Steve Bangalter</span>
        <span class="time">15/02/2019</span>
    </p>
</li>
<li class="person" data-chat="person1" onClick={() => setClicked(true)}>
    <div class="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar1.png" alt="Retail Admin"/>
        <span class="status offline"></span>
    </div>
    <p class="name-time">
        <span class="name">Steve Bangalter</span>
        <span class="time">15/02/2019</span>
    </p>
</li>
<li class="person active-user" data-chat="person2" onClick={() => setClicked(true)}>
    <div class="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar2.png" alt="Retail Admin"/>
        <span class="status away"></span>
    </div>
    <p class="name-time">
        <span class="name">Peter Gregor</span>
        <span class="time">12/02/2019</span>
    </p>
</li>
<li class="person" data-chat="person3" onClick={() => setClicked(true)}>
    <div class="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
        <span class="status busy"></span>
    </div>
    <p class="name-time">
        <span class="name">Jessica Larson</span>
        <span class="time">11/02/2019</span>
    </p>
</li>
<li class="person" data-chat="person4" onClick={() => setClicked(true)}>
    <div class="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar4.png" alt="Retail Admin"/>
        <span class="status offline"></span>
    </div>
    <p class="name-time">
        <span class="name">Lisa Guerrero</span>
        <span class="time">08/02/2019</span>
    </p>
</li>
<li class="person" data-chat="person5" onClick={() => setClicked(true)}>
    <div class="user">
        <img src="https://www.bootdey.com/img/Content/avatar/avatar5.png" alt="Retail Admin"/>
        <span class="status away"></span>
    </div>
    <p class="name-time">
        <span class="name">Michael Jordan</span>
        <span class="time">05/02/2019</span>
    </p>
</li> */}