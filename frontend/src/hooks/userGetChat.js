import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { MyContext } from "../App";

const UserGetChats = () => {
    const { clickedMeToSeeMyChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);

    const getChats = async () => {
        setLoading(true);

        if (!clickedMeToSeeMyChat) {
            toast.error("Invalid user ID");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/messages/${clickedMeToSeeMyChat}`);
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (Array.isArray(data)) {
                setChatMessages(data);
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            console.error("Error fetching chats:", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch chats on `clickedMeToSeeMyChat` change
    useEffect(() => {
        getChats();
    }, [clickedMeToSeeMyChat]);

    return { loading, chatMessages, refetch: getChats };
};

export default UserGetChats;
