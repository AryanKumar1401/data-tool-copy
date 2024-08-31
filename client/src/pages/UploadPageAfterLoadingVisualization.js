import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import AssistantAPIKeyFunctions from '../components/AssistantAPIKeyFunctions';
import { fileContentExporter, imageSrcExport } from './UploadPage';
import { imageSrcExportDDV } from './DropDownVisualize';
import GridPattern from '../components/magicui/background.tsx';
import BoxReveal from '../components/magicui/box-reveal.tsx';
import { UserContext } from '../utils/UserContext.js';


const PageContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const UploadPageAfterLoadingVisualization = ({ fileUrl }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ chatVisible, setChatVisible ] = useState(true);
  
  const user = useContext(UserContext);

  const {
    handleFileChange,
    handleUpload,
    returnProgress,
    returnMsg,
    returnfileUploadSuccess,
    returnThreadNotifier,
    imageSrcExport,
    imageSrcReturn,
    cleanFileUrlExport,
    cleanFileUrlReturn,
    returnInput,
    fileContentExporter,
  } = AssistantAPIKeyFunctions();


  let flag = 0;

  const handleChatSubmit = async () => {
    if (flag === 0) {
      const response = await axios.post('/api/get-response');
      const botMessages = response.data.messages.map(message => ({
        text: message.content.find(content => content.type === 'text').text,
        isUser: false,
      }));
      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      flag = 1;
    }
    if (!input.trim()) return;

    const newMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/get-response', { input, fileContentExporter });

      const botMessages = response.data.messages.map(message => ({
        text: message.content.find(content => content.type === 'text').text,
        isUser: false,
      }));
      console.log(botMessages);
      setMessages((prevMessages) => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error('Error with OpenAI API:', error);
    }
  };

  const [threadNotifier, setThreadNotifier] = useState(false);
  const [imgSRCReturnLocal, setimgSRCReturnLocal] = useState(null);
  const [cleanFileUrlLocal, setCleanFileUrlLocal] = useState(null);

  useEffect(() => {
    const notifier = returnThreadNotifier();
    setThreadNotifier(notifier);
  }, []);

  useEffect(() => {
    const imgSrc = imageSrcReturn();
    setimgSRCReturnLocal(imgSrc);
  }, []);

  useEffect(() => {
    const cleanFileUrl = cleanFileUrlReturn();
    setCleanFileUrlLocal(cleanFileUrl);
  }, []);
  useEffect(() => {
    const fetchInitialMessage = async () => {
     
      try {
        const response = await axios.post('/api/get-initial-response', {}, { headers: { "Authorization": await user.getIdToken() } });
        // const botMessages = response.data.messages.map(message => ({
        //   text: message.content.find(content => content.type === 'text').text,
        //   isUser: false,
        // }));
        const runId = response.data.run_id;
        const botMessages = response.data.messages
        .filter(message => message.role === "assistant" && message.run_id === runId)
        .map(message => ({
          text: message.content.find(content => content.type === 'text').text,
          isUser: false,
        }));
        console.log(botMessages);
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
        console.log(messages);
      
      } catch (error) {
        console.error('Error fetching initial message:', error);
      }
    };
    fetchInitialMessage();
   
    
  }, []);

  return (
    // className="flex flex-col items-center w-1/3 ml-5 bg-white p-5 border border-gray-300 h-4/5 overflow-y-auto"
    <div>



    <PageContainer className="items-center cols-2 bg-white p-5 border border-gray-300 overflow-y-auto">
      
        <BoxReveal boxColor={"white"} duration={0.5}>
        <h1 class="text-xl font-bold tracking-tight text-black sm:text-5xl text-center">
          File Processed<span className="text-black">.</span>
        </h1>
      </BoxReveal>
      <div className="flex flex-col items-center w-2/3 bg-white p-5 border border-gray-300 h-4/5 overflow-y-auto rounded-lg shadow-lg mr-auto ml-20">
      {imageSrcExportDDV && <img src={imageSrcExportDDV} alt="Uploaded Visualization" />}
      {fileUrl && (
        <a href={fileUrl} download className="mt-3 text-blue-500 hover:underline">
          Download File
        </a>
      )}
      </div>


        {/* Button to toggle chatbox visibility */}
        <button 
          className={`fixed bottom-4 right-4 ${chatVisible ? 'bg-red-500' : 'bg-blue-500'} text-white p-2 rounded`}
          onClick={() => setChatVisible(!chatVisible)}
        >
          {chatVisible ? 'Close Chat' : 'Open Chat'}
        </button>
        {chatVisible && (
          // <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-1/3">
          //   <button 
          //     className="absolute top-2 right-2 text-gray-500"
          //     onClick={() => setChatVisible(false)}
          //   >
          //     &#10005;
          //   </button>
          <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg mb-12 w-1/4 h-2/3">
            <ChatBox
              messages={messages}
              input={input}
              setMessages={setMessages}
          
            />
            </div>

        )}
    </PageContainer>
    </div>
  );
};

export default UploadPageAfterLoadingVisualization;
