import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { ButtonToolbar } from 'react-bootstrap';
import { checkCredits } from '../utils/firebaseUtils';
import { UserContext } from '../utils/UserContext';


const VizualizeOrClean = () => {
  const navigate = useNavigate();
  const [ insufficientCredits, setInsufficientCredits ] = useState(false);
  const user = useContext(UserContext);

  const goToCleanPage = () => {
    if (!user?.emailVerified) {
      navigate("/login");
      return;
    }
    navigate("/cleanse");
  };

  const goToVisualizePage = () => {
    if (!user?.emailVerified) {
      navigate("/login");
      return;
    }
    navigate("/upload");
  };

  
  useEffect(() => {
    const execute_check = async () => {
      if (!user?.emailVerified) return;
      setInsufficientCredits(!(await checkCredits(user, 0.1)));
    }

    execute_check();
  }, [user])
  

  return (

   
    <div class="relative bg-gray-100 flex items-center justify-center min-h-screen font-mono">
      
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
    <div class="relative max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">What would you like to do today?</h1>
        <p class="text-center text-gray-600 mb-6">
            You can either clean your dataset to prepare it for analysis or directly visualize your data to gain insights.
        </p>
        <div class="flex flex-col space-y-4">
          <button onClick={ goToCleanPage } class="disabled:opacity-75 disabled:shadow-none flex items-center justify-center w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200" disabled={insufficientCredits}>
                <i class="fas fa-broom mr-2"></i>
                Clean Dataset
            </button>
          <button onClick={ goToVisualizePage } class="disabled:opacity-75 disabled:shadow-none flex items-center justify-center w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition duration-200" disabled={insufficientCredits}>
                <i class="fas fa-chart-line mr-2"></i>
                Visualize Dataset
            </button>
          <div className={ insufficientCredits ? "" : "collapse" }>You do not have enough credits, please visit the <Link to={"/pricing"}>pricing page</Link> to buy some.</div>
        </div>
    </div>
</div>


  );
};

export default VizualizeOrClean;
