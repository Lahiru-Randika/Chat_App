import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({

    // participations and messages are arrays
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }],
    message:{
        type : String,
        required: true,
        default: "conversation started"
    }

    //to get the createdAt and updatedAt time
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;