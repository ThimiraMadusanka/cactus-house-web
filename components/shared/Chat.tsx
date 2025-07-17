"use client"
import React, { useEffect, useState } from 'react';
import { getMessages, message } from '@/services/chat.service';
import { GetMessages, Message } from '@/types/chat.types';
import { BsThreeDots } from 'react-icons/bs';
import moment from 'moment';

const Chat = () => {
  const [messageData, setMessageData] = useState<Message>({
    message_content: ""
  });
  const [data, setData] = useState<GetMessages[]>([]);
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [session, setSession] = useState<string | null>(null);

  // Fetch data
  const fetchData = async (sessionId: string) => {
    try {
      setIsDataFetching(true);
      const response = await getMessages(sessionId);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: any) {
      console.log("Err", error);
      setIsDataFetching(false);
    } finally {
      setIsDataFetching(false);
    }
  }

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetchData(sessionId);
      setSession(sessionId);
    }
  }, [isSendMessage])
    
  // Method for input onChange 
  const handelOnChange = (e: any) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  
  // Form Submit
  const handelSubmit = async () => {
    try {
      setIsLoading(true);
      if (session !== null) {
        const response = await message(session, messageData);
        if (response.status === 201) {
          // success 
          console.log("Successfully send.");
          setIsSendMessage(!isSendMessage);
          setMessageData({ message_content: "" });
        }  
      } else {
        console.log("No session found");
      }
    } catch (error: any) {
      // error
      setIsLoading(false);
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-h-[70vh] flex flex-col p-3">
      {/* Messages */}
      <div className="flex-grow overflow-y-auto pb-4">
        <div className="flex flex-col gap-4 pe-3">
            {isDataFetching && (
              <div className="flex justify-end">
                <div
                    className="rounded-lg px-4 py-2 max-w-[80%] bg-lime-600 text-white"
                >
                    <p className="text-sm">
                        <BsThreeDots />
                    </p>
                </div>
            </div>
            )}
            {!isDataFetching && data.length === 0 ? (<></>) : (
              data.map((chat: GetMessages, i: number) => {
                return (
                <div
                  key={i}
                  className={`flex ${chat.role === "USER" ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    chat.role === "USER" ? 'bg-lime-600 text-white' : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">
                      {chat.message_content}
                    </p>
                    <div className={`flex ${chat.role === "USER" ? 'justify-start' : 'justify-end'}`}>
                      <span className={chat.role === "USER" ? "text-white" : "text-gray-500"} style={{ fontSize: "10px"}}>{moment(chat.created_at).format('LT')}</span>
                    </div>
                  </div>
                </div>
              )})
            )}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center mt-2">
        <input
          type="text"
          name="message_content"
          id="message_content"
          className="border border-gray-300 rounded-lg py-2 px-3 w-full mr-2 text-sm"
          placeholder="Type a message..."
          value={messageData.message_content}
          onChange={(e) => handelOnChange(e)}
        />
        <button 
          type="button"
          disabled={messageData.message_content === ""}
          onClick={() => handelSubmit()}
          className="bg-lime-800 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          {isLoading? <BsThreeDots /> : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
