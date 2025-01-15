import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import mongoose from "mongoose";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; 

//------------------------for message sending---------------------------//
export const sendMessage = async (req,res)=>{

    try{
        const {message} = req.body;

        //in the url we use like /send/:userid thts why we use req.params.userid
        const {userid: receiverId } = req.params;

        //take the senderId through protectRouter.js because we are in here after that next() call in protectRouter.js
        const senderId = req.user._id;

        // Ensure senderId and receiverId are valid
        if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ error: "Invalid receiver ID" });
        }
        if (!senderId || !mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).json({ error: "Invalid sender ID" });
        }
        console.log("Sender ID:", senderId.toString());
        console.log("Receiver ID:", receiverId);

        //find a conversation where these thing are in that array
        let conversationOf = await Conversation.findOne({
            //like => senderId, receiverId in one array
            participants: {$all: [senderId, receiverId]}
        })

        //if no conversation before=> create a new one
        if (!conversationOf){
            conversationOf = await Conversation.create({
                participants : [senderId, receiverId]
            })
        }

        //create a new message usin Message model
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        //add the message also to the conversation list
        //if this is the first message this is pushed into the empty default array. Check the ConversationModel.js
        if (newMessage){
            conversationOf.messages.push(newMessage._id);
        }

        // both entries are save to the Db parallelly
        await Promise.all([conversationOf.save(), newMessage.save()]);

        //send message to the receiver also using socket server | realtime conversation
        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log("receiverSocketId: ",receiverSocketId)
        if (receiverSocketId){
            //io.to(<socketId>).emit() ===> this method is used to send events to one specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }else {
            console.log("Receiver is not connected or socket ID not found.");
        }


        res.status(200).json({newMessage});

    }catch(error){
        console.log("internal server error in message sending", error.message)
        return res.status(500).json({
            error:"Internal message sending error"
        })
    }
}

//------------------------to get messages from db-----------------------//
export const getMessage = async (req,res)=>{

    try{
        //get the message receiver's id from the url
        const {userid:receiverId} = req.params;
        console.log(receiverId);

        //get the message sender's id from cookies through protectRouter func
        const senderId = req.user._id;

        //find a conversation between two users in the db (in the Conversation schema)
        //.populate("messages"); this is a mongoose function to get the ids' of the messages in the messages array
        const conversationOf = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        }).populate("messages");

        console.log("Conversation found:", conversationOf);
        
        //if conversationOf does not existrs => return an empty array
        if (!conversationOf){
            return res.status(200).json([]);
        }

        const messages = conversationOf.messages;

        res.status(200).json(messages);

    }catch(error){
        console.log("internal server error in message getting", error.message)
        return res.status(500).json({
            error:"Internal message getting error"
        })
    }
}