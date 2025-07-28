import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";
// import axios from 'axios'
export const sendMessage = async (req, res) => {
    console.log("Message sent", req.params.id, req.body.message)

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();  it take time to save both , one by one 
        await Promise.all([conversation.save(),newMessage.save()]); // run parallel
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(200).json({
            message:"Message send successfully",
            newMessage
        });

    } catch (error) {
        console.log("Error in sendMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
} 

export const getMessage = async (req, res) => {
    try{
        const {id:chatUser} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] }
        }).populate("messages");
        if(!conversation){
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
        console.log("messages received", messages);
        res.status(201).json(messages);
    }
    catch(error){
        console.log("Error in getMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
