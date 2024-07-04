import React, { useContext, useState } from 'react';
import { DropdownVizContext } from '../components/DropdownVizContext';
import axios from 'axios';

let imageSrcExport = '';

function DropDownVisualize() { 
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


 
const fileID = axios.get('/api/file_storer');


const handleThreadRun = async () => {

   const assistant = await axios.post('/api/create-assistant', { fileID });


  console.log('Assistant created with ID:', assistant.data.id);

  const thread = await axios.post('/api/create-thread', { fileID, assistantId: assistant.data.id, selectedValueQ1, selectedValueQ2, Info});
  console.log('Thread created with ID:', thread.data.id);
  

  const responseFromThread = await axios.post('/api/run-thread');
  const { imageUrl, messages, fileContent } = responseFromThread.data;
  console.log('Image ID:', imageUrl);
  console.log('Messages:', messages);
  console.log('file content: ', fileContent);
  setImageSrc(imageUrl); // Update state with the image src
  imageSrcExport = imageUrl;
  setThreadFinishNotifier(true); 
  


}

  

  return (
    <div>
      <h1>What sort of graph are you looking to create?</h1>
      <select value={selectedValueQ1} onChange={handleChangeQ1}>
        <option value="Bar">Bar</option>
        <option value="Line">Line</option>
        <option value="Pie">Pie</option>
        <option value="Scatter">Scatterplot</option>
        <option value="Geomap">Geomap</option>
        <option value="Pairplots">Pairplot</option>
      </select>

      <h1>What is the main purpose of your dataset?</h1>
      <select value={selectedValueQ2} onChange={handleChangeQ2}>
        <option value="Exploratory">Exploratory data analysis</option>
        <option value="Present">Presentation</option>
        <option value="Trend">Trend Identification</option>
      </select>

      <div className="form-group">
        <label>Are there any specific trends you are interested in exploring?</label>
        <input
          type="text"
          value={Info}
          onChange={handleInfoChange}
        />
      </div>

      <button onClick={handleThreadRun}>Submit</button>
    </div>
  );
}

export default DropDownVisualize;
