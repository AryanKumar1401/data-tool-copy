import React, { useState, useEffect, useContext } from 'react';
import FileUpload from '../components/FileUpload';
import axios from 'axios';
import UploadPageAfterUploading from './UploadPageAfterUploading';
import UploadPageAfterLoadingVisualization from './UploadPageAfterLoadingVisualization';
import styled from 'styled-components';
import DropDownClean from './DropDownClean';
import { UserContext } from '../utils/UserContext';

const PageContainer = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;



const UploadPageCleanse = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [fileSelected, setFileSelected] = useState(false); // State to track if file is selected
  const [progress, setProgress] = useState({ started: false, percentageCompleted: 0 });
  const [uploadFlag, setUploadFlag] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const [threadFinishNotifier, setThreadFinishNotifier] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // State for storing imageSrc
  const [ fileUrl, setFileUrl ] = useState(null); // State for storing the clean CSV file URL
  
  const user = useContext(UserContext);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
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
          'Authorization': await user.getIdToken(),
        },
        onUploadProgress: (progressEvent) => {
          const percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress({ started: true, percentageCompleted });
        },
      });

      const fileId = response.data.fileId;
      console.log('File uploaded with ID:', fileId);
      setUploadFlag(true);
      setFileUploadSuccess(true);

      // //NEW FUNCTION

      const response2 = await axios.post('/api/file_storer', {fileId});
      console.log(response2.data)
      

      // //NEW FUNCTION SECTION END






      // const assistant = await axios.post('/api/create-assistantClean', { fileId });
      // console.log('Assistant created with ID:', assistant.data.id);

      // const thread = await axios.post('/api/create-threadClean', { fileId, assistantId: assistant.data.id });
      // console.log('Thread created with ID:', thread.data.id);

      // const responseFromThread = await axios.post('/api/run-threadClean');
      // const { fileUrl } = responseFromThread.data;
      // console.log('Clean data URL:', fileUrl);
      // setFileUrl(fileUrl); // Store the clean CSV file URL
      // setThreadFinishNotifier(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };



  

  const returnfileUploadSuccess = () => fileUploadSuccess;
  const returnThreadNotifier = () => threadFinishNotifier;
  const imageSrcReturn = () => imageSrc;
  const returnProgress = () => progress;

  useEffect(() => {
    setFileUploadSuccess(returnfileUploadSuccess());
  }, [returnfileUploadSuccess]);


  const renderContentCleanse = () => {
    if (uploadFlag) {
      return <DropDownClean />;
    } else if (uploadFlag && threadFinishNotifier) {
      return <UploadPageAfterLoadingVisualization fileUrl={fileUrl} />;
    } else {
      return (
        <PageContainer>
          <FileUpload
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            progress={progress}
            fileSelected={fileSelected}
          />
        </PageContainer>
      );
    }
  };

  return <div>{renderContentCleanse()}</div>;
};

export default UploadPageCleanse;
