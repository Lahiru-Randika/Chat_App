import { useEffect, useState, useContext } from "react";
import { useSocketContext } from "../context/socketContext.jsx";
// import useConversation from "../zustand/useConversation.js";
import { MyContext } from "../App.jsx";
import UserGetChats from "./userGetChat.js";
import notificationSound from "../assets/notificationSound.mp3"
import useGetConversations from "./useGetConversations.js";

const useListenNewMembers = () => {
    const { socket } = useSocketContext();
    const { conversations } = useGetConversations();
    const [conversationsList, setConversationsList] = useState(conversations || []);

    useEffect(() => {
        const handleNewLogin = (newUser) => {
            console.log("New User Joined:", newUser);

            setConversationsList((prevConversations) => [...prevConversations, newUser]);

            console.log("New user set after the set (async):", conversationsList);

            const sound = new Audio(notificationSound);
            sound.play();

        };


        socket?.on("newUser", handleNewLogin);

        return () => {
            socket?.off("newUser", handleNewLogin);
        };
    }, [socket]); // Remove `messages` and `setMessages` from dependencies

    // Optional: Log the updated messages whenever they change
    // useEffect(() => {
    //     console.log("Messages updated:", messages);
    // }, [messages]);

    return {conversationsList}; // Optionally return the messages state if needed
};

export default useListenNewMembers;
