import { useState } from "react";
import api from "../services/api";

export const useMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Send message
  const sendMessage = async (id, messageData) => {
    setLoading(true);

    try {
      const response = await api.post(`/sendMessage/${id}`, messageData);

      setMessages([...messages, response.data]);

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get messages
  const getMessages = async () => {
    setLoading(true);

    try {
      const response = await api.get("/getMessages");

      let data = response.data;

      if (!Array.isArray(data)) {
        data = response.data?.data || [];
      }

      setMessages(data);

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Post message
  const postMessages = async (id, messageData) => {
    setLoading(true);

    try {
      const response = await api.post(`/postMessages/${id}`, messageData);

      setMessages([...messages, response.data]);

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    getMessages,
    postMessages,
  };
};
