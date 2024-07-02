import React, { useContext, useState } from 'react';
import { DropdownVizContext } from '../components/DropdownVizContext';

function DropDownVisualize() { 
    const [selectedValueQ1, setSelectedValueQ1] = useState("Bar");
    const [selectedValueQ2, setSelectedValueQ2] = useState("Exploratory");
    const [Info, setInfo] = useState("");

  const handleChangeQ1 = (event) => {
    setSelectedValueQ1(event.target.value);
  };

  const handleChangeQ2 = (event) => {
    setSelectedValueQ2(event.target.value);
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };

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

      <button>Submit</button>
    </div>
  );
}

export default DropDownVisualize;
