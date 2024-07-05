import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import UploadPageAfterUploading from './UploadPageAfterUploading';
import styled from 'styled-components';
import DropDownVisualize from './DropDownVisualize';

const PageContainer = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;
export let imageSrcExport = '';
let fileContentExporter = '';
export let cleanFileUrlExport = '';
const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [fileSelected, setFileSelected] = useState(false); // State to track if file is selected
  const [progress, setProgress] = useState({ started: false, percentageCompleted: 0 });
  const [imageSrc, setImageSrc] = useState(null); // State for storing imageSrc
  const [cleanFileUrl, setCleanFileUrl] = useState(null); // State for storing clean CSV file URL
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const [threadFinishNotifier, setThreadFinishNotifier] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
      fileContentExporter = fileContent;
      setFileSelected(true);
    };
    reader.readAsText(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please choose a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
        onUploadProgress: (progressEvent) => {
          const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress({ started: true, percentageCompleted });
        },
        
      }
      );

      const fileId = response.data.fileId;
      console.log('File uploaded with ID:', fileId);
      setFileUploadSuccess(true);

      

      

      //NEW FUNCTION

      const fileExporter = await axios.post('/api/file_storer', {fileId});

      //NEW FUNCTION SECTION END


          
    } catch (error) {
      console.error('Error uploading file:', error);
      setFileUploadSuccess(false);
    }
  };


  const returnfileUploadSuccess = () => fileUploadSuccess;
  const returnThreadNotifier = () => threadFinishNotifier;
  const imageSrcReturn = () => imageSrc;
  const returnProgress = () => progress;
  const cleanFileUrlReturn = () => cleanFileUrl;



// DIVISION

















  
  


 

  

  


  const [msgStatus, setMsgStatus] = useState(null);
  let flag = 0;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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

  const renderContentAfterVizualization = () => {
    return(
    <PageContainer>
      <ChatBox
        messages={messages}  
        input={input}
        setInput={setInput}
        handleChatSubmit={handleChatSubmit}
      />
      <div className="flex flex-col items-center w-1/3 ml-5 bg-white p-5 border border-gray-300 h-4/5 overflow-y-auto">
      {
        imageSrcExport && <img src={imageSrcExport} alt="Uploaded Visualization" />
      }
        <img src={imageSrcExport} alt="Uploaded Visualization" />
      </div>
    </PageContainer>
    )
  }



  //LOAD VIZUALIZATION SECTION END
  const renderContentUpload = () => {
    if (fileUploadSuccess) {
      return <DropDownVisualize />;
    } else if (fileUploadSuccess && threadFinishNotifier) {
      return (<PageContainer>
        <div className="flex flex-col items-center w-1/3 ml-5 bg-white p-5 border border-gray-300 h-4/5 overflow-y-auto">
        {
          imageSrcExport && <img src={imageSrcExport} alt="Uploaded Visualization" />
        }
        </div>
        <ChatBox
          messages={messages}  
          input={input}
          setInput={setInput}
          handleChatSubmit={handleChatSubmit}
        />
      </PageContainer>);
    } else {
      return (
        
        <PageContainer>
          <FileUpload
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            progress={progress}
            msg={msgStatus}
            fileSelected={fileSelected}
          />
        </PageContainer>
      );
    }
  };

  

  return (
    
    <div>
      {renderContentUpload()}
    </div>
  );
  
};



export default UploadPage;
