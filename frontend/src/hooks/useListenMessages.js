import { useEffect, useState, useContext } from "react";
import { useSocketContext } from "../context/socketContext.jsx";
// import useConversation from "../zustand/useConversation.js";
import { MyContext } from "../App.jsx";
import UserGetChats from "./userGetChat.js";
import notificationSound from "../assets/notificationSound.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext();
    // const { messages, setMessages} = useConversation()
    const { currentRequestedChatName, clickedMeToSeeMyChat } = useContext(MyContext);
    const { chatMessages } = UserGetChats();
    const [messages, setMessages] = useState(chatMessages || []);

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            console.log("Received new message:", newMessage.receiverId ,"and clickedMeToSeeMyChat: ", clickedMeToSeeMyChat);

            // Update state based on the previous state
            if (newMessage.senderId === clickedMeToSeeMyChat) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }

            // Note: This log will still show the old value of messages
            console.log("New message set after the set (async):", messages);

            //message sound 
            const sound = new Audio(notificationSound);
            sound.play();

        };


        // Listen for new messages
        socket?.on("newMessage", handleNewMessage);

        // Cleanup listener
        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket]); // Remove `messages` and `setMessages` from dependencies

    // Optional: Log the updated messages whenever they change
    // useEffect(() => {
    //     console.log("Messages updated:", messages);
    // }, [messages]);

    return {messages}; // Optionally return the messages state if needed
};

export default useListenMessages;
