import React, { useContext, useState } from 'react';
import { DropdownVizContext } from '../components/DropdownVizContext';
import axios from 'axios';
import UploadPageAfterUploading from './UploadPageAfterUploading';
import UploadPageAfterLoadingVisualization from './UploadPageAfterLoadingVisualization';
import styled from 'styled-components';
import Select from "react-select";

export let imageSrcExportDDV = '';
let file_Id_DropDown = '';

const PageContainer = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;







function DropDownVisualize() { 

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const [threadSuccessCreate, setthreadSuccessCreate] = useState(false);

const [threadFinishNotiferDDV, setthreadFinishNotifierDDV] = useState(false);
    const [selectedValueQ1, setSelectedValueQ1] = useState("Bar");
    const [selectedValueQ2, setSelectedValueQ2] = useState("Exploratory");
    const [Info, setInfo] = useState("");
    const [imageSrc, setImageSrc] = useState(null); // State for storing imageSrc
  const [cleanFileUrl, setCleanFileUrl] = useState(null); // State for storing clean CSV file URL
  const [threadFinishNotifier, setThreadFinishNotifier] = useState(false);

  const handleChangeQ1 = (event) => {
    setSelectedValueQ1(event.target.value);
  };

  const handleChangeQ2 = (event) => {
    setSelectedValueQ2(event.target.value);
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };



  // const getFileResponse = async () => {
  //   const response = await axios.post('/api/file_storer');
  //   file_Id_DropDown = response.data.file_Id;

  //   console.log(file_Id_DropDown);

  //   return file_Id_DropDown;
  // }
 


const handleThreadRun = async () => {

  //file_Id_DropDown = await getFileResponse();

  const assistant = await axios.post('/api/create-assistant');


  console.log('Assistant created with ID:', assistant.data.id);

  const thread = await axios.post('/api/create-thread', { file_Id_DropDown, assistantId: assistant.data.id, selectedValueQ1, selectedValueQ2, Info});
  console.log('Thread created with ID:', thread.data.id);

  setthreadSuccessCreate(true);
  

  const responseFromThread = await axios.post('/api/run-thread');
  const { imageUrl, messages, fileContent } = responseFromThread.data;
  console.log('Image ID:', imageUrl);
  console.log('Messages:', messages);
  console.log('file content: ', fileContent);
  setImageSrc(imageUrl); // Update state with the image src
  imageSrcExportDDV = imageUrl;
  setthreadFinishNotifierDDV(true);
  


}

  const contentDisplay = () => {
    if(threadSuccessCreate && !threadFinishNotiferDDV) {
      return <UploadPageAfterUploading />
    }
    else if(threadSuccessCreate && threadFinishNotiferDDV) {
      return <UploadPageAfterLoadingVisualization />
    }
    else {
      return (
        <PageContainer>


<div class="relative bg-gray-100 flex items-center justify-center min-h-screen font-mono">
      
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
    <div class="relative max-w-md w-full bg-white shadow-md rounded-lg p-6">

  

      <h2>What sort of graph are you looking to create?</h2>

    

     
      <select value={selectedValueQ1} onChange={handleChangeQ1}>
        <option value="Bar">Bar</option>
        <option value="Line">Line</option>
        <option value="Pie">Pie</option>
        <option value="Scatter">Scatterplot</option>
        <option value="Geomap">Geomap</option>
        <option value="Pairplots">Pairplot</option>
      </select>

      <h2>What is the main purpose of your dataset?</h2>
      <select value={selectedValueQ2} onChange={handleChangeQ2}>
        <option value="Exploratory">Exploratory data analysis</option>
        <option value="Present">Presentation</option>
        <option value="Trend">Trend Identification</option>
      </select>

      <div className="form-group">
        <h2>Are there any specific trends you are interested in exploring?</h2>
        <input
          type="text"
          value={Info}
          onChange={handleInfoChange}
        />
      </div>

      <button onClick={handleThreadRun}>Submit</button>

      </div>

      </div>

    </PageContainer>
      )
    }
  }

  return (
    <div>
    {contentDisplay()}
    </div>
  );
}

export default DropDownVisualize;
