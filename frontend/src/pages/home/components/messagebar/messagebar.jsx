import userLogOut from "../../../../hooks/userLogOut.js";
import userGetChat from "../../../../hooks/userGetChat.js";
import useGetConversations from "../../../../hooks/useGetConversations.js";
import userSendMessage from "../../../../hooks/userSendMessage.js";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "../../../../App.jsx";
import "./messagebar.css";
import useListenMessages from "../../../../hooks/useListenMessages.js";
import toast from "react-hot-toast";

const MessageBar = () => {
    const { logout } = userLogOut();
    const { loadingconversations, conversations } = useGetConversations();

    const [message, setMessage] = useState("");
    const { currentRequestedChatName, clickedMeToSeeMyChat, currentRequestedPropic } = useContext(MyContext);
    const { loadingChats, chatMessages, refetch } = userGetChat();
    const { loading: sending, sendMessage } = userSendMessage();
    const [lastSentMessage, setLastSentMessage]= useState();

    // Define state for messages
    const [messages, setMessages] = useState([]);
    
    // Using real-time messages from useListenMessages hook
    const { messages: realTimeMessages = []} = useListenMessages();

    // Merging the messages (static + real-time)
    useEffect(() => {
        if (Array.isArray(realTimeMessages) && Array.isArray(chatMessages)) {
            const allMessages = [...chatMessages, ...realTimeMessages].filter(
                (message) => message.senderId === clickedMeToSeeMyChat || message.receiverId === clickedMeToSeeMyChat
            );

            //Stop apending the same message again and again to the allMessages queqe
            const uniqueMessages = allMessages.filter(
                (msg, index, self) =>
                    index === self.findIndex((m) => m._id === msg._id) // Ensure unique `_id`
            );

            setMessages(uniqueMessages);
        }
    }, [chatMessages, realTimeMessages, clickedMeToSeeMyChat]);

    const currentUser = JSON.parse(localStorage.getItem("chat-user"));

    const userToChat = conversations.find(
        conversation => conversation.userName === currentRequestedChatName
    );

    const sortedMessages = messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const handleSubmit = async () => {
        if (!message.trim()) {
            toast.error("Message cannot be empty");
            return;
        }

        try {
            console.log("Sending message:", message);
            const result = await sendMessage(message, clickedMeToSeeMyChat);

            if (result) {
                setLastSentMessage(result);
                setMessage(""); // Clear the input
                await refetch(); // Refetch the chat messages
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
            toast.error("Failed to send the message");
        }
    };

    return (
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
            <div className="selected-user">
                <span>
                    To: <span className="name">{currentRequestedChatName}</span>
                </span>
                <button className="btn btn-success logout" type="button" onClick={logout}>
                    <i class="bi bi-box-arrow-right"></i>
                </button>
            </div>
            <div className="chat-container">
            <ul className="chat-box chatContainerScroll">
                    {!loadingChats && sortedMessages.length === 0 ? (
                        <p className="select-chat d-flex align-items-center justify-content-center h-100">Send a message to start the chat</p>
                    ) : (
                        sortedMessages.map((message) => (
                            message.senderId !== currentUser._id ? (
                                // Message from the other user (left-aligned)
                                <li className="chat-left" key={message._id}>
                                    <div className="chat-avatar">
                                        <img
                                            src={currentRequestedPropic}
                                            alt="😊"
                                        />
                                        <div className="chat-name">{currentRequestedChatName}</div>
                                    </div>
                                    <div className="chat-text">{message.message}</div>
                                    <div className="chat-hour">
                                        {new Date(message.createdAt).toLocaleString()} 
                                        <span className="fa fa-check-circle"></span>
                                    </div>
                                </li>
                            ) : (
                                // Message from the current user (right-aligned)
                                <li className="chat-right" key={message._id}>
                                    <div className="chat-hour">
                                        {new Date(message.createdAt).toLocaleString()} 
                                        <span className="fa fa-check-circle"></span>
                                    </div>
                                    <div className="chat-text">{message.message}</div>
                                    <div className="chat-avatar">
                                        <img
                                            src={currentUser.profilepic}
                                            alt="😊"
                                        />
                                        <div className="chat-name">{currentUser.userName}</div>
                                    </div>
                                </li>
                            )
                        ))
                    )}
                </ul>
                <div className="form-group mt-3 mb-0">
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button className="button btn btn-primary" type="button" onClick={handleSubmit}>
                        <i class="bi bi-send-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageBar;
