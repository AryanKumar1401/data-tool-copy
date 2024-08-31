import React, { useContext, useState, useEffect } from 'react';
import { DropdownVizContext } from '../components/DropdownVizContext';
import axios from 'axios';
import UploadPageAfterUploading from './UploadPageAfterUploading';
import UploadPageAfterLoadingVisualization from './UploadPageAfterLoadingVisualization';
import styled from 'styled-components';
import { UserContext } from '../utils/UserContext';


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
  const [optionsArr,setOptionsArr] = useState([]);

  const [threadSuccessCreate, setthreadSuccessCreate] = useState(false);

  const [threadFinishNotiferDDV, setthreadFinishNotifierDDV] = useState(false);
    const [selectedValueQ1, setSelectedValueQ1] = useState("Bar");
    const [selectedValueQ2, setSelectedValueQ2] = useState("Exploratory");
    const [Info, setInfo] = useState("");
    const [imageSrc, setImageSrc] = useState(null); // State for storing imageSrc
  const [ cleanFileUrl, setCleanFileUrl ] = useState(null); // State for storing clean CSV file URL
  
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const formResponse = await axios.post('/api/run-thread-form');
        const {options} = formResponse.data;
        console.log("options:",options.text.value);
        setOptionsArr(options.text.value.split(',').map(item=>item.trim()));
        console.log("Options array on dropdown:",optionsArr);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);



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
  

  const responseFromThread = await axios.post('/api/run-thread', {}, { headers: { "Authorization": await user.getIdToken() } });
  const { imageUrl, messages, fileContent } = responseFromThread.data;
  console.log('Image ID:', imageUrl);
  console.log('Messages:', messages);
  console.log('file content: ', fileContent);
  setImageSrc(imageUrl); // Update state with the image src
  imageSrcExportDDV = imageUrl;
  setthreadFinishNotifierDDV(true);
  


}

  const contentDisplay = () => {
    if (optionsArr.length === 0) {
      return <UploadPageAfterUploading />;
    }
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

    <div class="relative max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4 text-gray-700">What sort of graph (suggested by our AI) are you looking to create?</h2>
        <select value={selectedValueQ1} onChange={handleChangeQ1} class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
        {optionsArr.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
        </select>

        <h2 class="text-xl font-bold mb-4 text-gray-700">What is the main purpose of your dataset?</h2>
        <select value={selectedValueQ2} onChange={handleChangeQ2} class="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="Exploratory">Exploratory data analysis</option>
            <option value="Present">Presentation</option>
            <option value="Trend">Trend Identification</option>
        </select>

        <div class="mb-6">
            <h2 class="text-xl font-bold mb-2 text-gray-700">Are there any specific trends you are interested in exploring?</h2>
            <input type="text" value={Info} onChange={handleInfoChange} class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter trends here" />
        </div>

        <button onClick={handleThreadRun} class="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300">Submit</button>
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
