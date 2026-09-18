import { useState } from "react";
import api from "../services/api";

export const useMessage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (id, messageData) => {
        setLoading(true);
        try {
            const response = await api.post(`/sendMessage/${id}`, messageData);
            setMessages((prevMessages) => [...prevMessages, response.data]);
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };
    const getMessages = async () => {
        setLoading(true);
        try {
            const response = await api.get('/getMessages');
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            setMessages(data);
            return data;
        } catch (error) {
            console.error('Error getting messages:', error);
        } finally {
            setLoading(false);
        }
    };

    return { messages, loading, sendMessage, getMessages };
};
