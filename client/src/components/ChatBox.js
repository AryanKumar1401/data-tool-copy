// src/components/ChatBot.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { checkCredits } from '../utils/firebaseUtils';
import { UserContext } from '../utils/UserContext';


const ChatBot = ({ fileId, messages, setMessages }) => {
  const [ input, setInput ] = useState('');
  
  const [ creditCheck, setCreditCheck ] = useState(true);
  const user = useContext(UserContext);
 

  // useEffect(() => {
  //   const fetchInitialMessage = async () => {
     
  //     try {

  //       const response = await axios.post('/api/get-initial-response', { fileId });
  //       // const botMessages = response.data.messages.map(message => ({
  //       //   text: message.content.find(content => content.type === 'text').text,
  //       //   isUser: false,
  //       // }));
  //       const runId = response.data.run_id;
  //       const botMessages = response.data.messages
  //       .filter(message => message.role === "assistant" && message.run_id === runId)
  //       .map(message => ({
  //         text: message.content.find(content => content.type === 'text').text,
  //         isUser: false,
  //       }));
  //       console.log(botMessages);
  //       setMessages((prevMessages) => [...prevMessages, ...botMessages]);
  //       console.log(messages);
      
  //     } catch (error) {
  //       console.error('Error fetching initial message:', error);
  //     }
  //   };
  //   fetchInitialMessage();
   
    
  // }, []);

  const execute_check = async () => {
    if (!user) return;
    setCreditCheck((await checkCredits(user, 0.5)));
  }

  useEffect(() => {

    execute_check();
  }, [user])
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessage = { text: input, isUser: true };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/send-message', { message: input }, { headers: { "Authorization": await user.getIdToken() } });
      const runId = response.data.run_id;
      const botMsgs = response.data.messages
      .filter(message => message.role === "assistant" && message.run_id === runId)
      .map(message => ({
        text: message.content.find(content => content.type === 'text').text,
        isUser: false,
      }));
      console.log(botMsgs);
      setMessages((prevMessages) => [...prevMessages, ...botMsgs]);
      console.log(messages);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    await execute_check();
  };

  return (
    // className="flex flex-col items-center w-1/3 ml-5 bg-white p-5 border border-gray-300 h-4/5 overflow-y-auto rounded-lg shadow-lg"
    <div className="flex flex-col items-center bg-white py-5 border border-gray-300 h-full rounded-lg shadow-lg mx-auto relative">
    <div className="flex flex-col items-start w-full mt-3 overflow-y-auto h-96">
      {messages.map((msg, index) => (
        <div key={index} className={`p-2 rounded my-1 mx-3 ${msg.isUser ? 'bg-gray-900 text-white self-end rounded-full' : 'bg-gray-200 text-black self-start rounded-full'}`}>
          {msg.isUser && msg.text}
          {!msg.isUser && msg.text.value}
        </div>
      ))}
    </div>
    
    <div className="flex items-center w-full px-2 py-2 bg-gray-300 absolute bottom-0 left-0 right-0">
      <input 
        value={input} 
        id="chat" 
        onChange={(e) => setInput(e.target.value)} 
        rows="1" 
        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="Ask me about your data..."
      />
      <button 
          onClick={ handleSendMessage } 
          disabled={!creditCheck}
        className="disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300 inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 hover:bg-white"
      >
        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
        </svg>
        <span className="sr-only">Send message</span>
      </button>
        <div className={ 'text-gray-700 text-sm absolute -top-16 text-center bg-gray-300 rounded mr-2 p-2' + (creditCheck ? " collapse" : "") }>
          You do not have sufficient credits to perform this task. Please head over to the <Link to={ "/pricing" }>pricing page</Link> to buy more.
        </div>
    </div>
  </div>
  
  );
};

export default ChatBot;
