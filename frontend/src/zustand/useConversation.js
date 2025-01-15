//Zustand will allow us to maintain global states throughout the whole function

//import create fuction to use the hook
import { create} from "zustand";

const useConversation = create((set)=>({
    selectedConversation : null,
    //define the set function
    setSelectedConversation: (selectedConversation)=> set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages})
}))

export default useConversation;