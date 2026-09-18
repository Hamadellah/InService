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

    return { messages, loading, sendMessage };
};
