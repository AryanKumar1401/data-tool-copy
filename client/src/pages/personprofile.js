import React from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adds space between the rows */
  padding: 20px;
  background-color: #f0f0f0; /* Optional: background color for better visibility */
`;

const TopSection = styled.div`
  /* Styles for the top section */
`;

const BottomSection = styled.div`
  display: flex;
  gap: 20px; /* Adds space between the columns */
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
`;

const BottomBox = styled.div`
  flex: 1;
  min-width: 200px; /* Ensures each box has a minimum width */
  background-color: #fff; /* Optional: background color for better visibility */
  padding: 20px; /* Adds padding inside each box */
  border-radius: 8px; /* Optional: rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow */
`;


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto; /* Center the form */
`;

const FormLabel = styled.label`
  margin-bottom: 10px; /* Space between labels */
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin-top: 5px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #000000;
`;

const SubmitButton = styled.input`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;


function PersonProfile() {
    const navigate = useNavigate();
const goToNewPage2 = () => {
    navigate("/maintain");
  };

  return (
    <Container>
      <TopSection>
        <h1>Hello XXXXX, Welcome to Your DataTool Dashboard</h1>
        <h2>You Currently Have XXXXX Tokens</h2>
        <button onClick={goToNewPage2} class="flex items-center justify-center w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200">
                <i class="fas fa-broom mr-2"></i>
                Buy Some More?
            </button>
      </TopSection>
      <BottomSection>
        <BottomBox>
          <h2>Your Stats</h2>
          <h3>X Visualizations Created</h3>
          <h3>X Tokens Used</h3>
          <h3>X Data Points Analyzed</h3>
        </BottomBox>
        <BottomBox>
          <h2>Edit Your Details</h2>
          <FormContainer>
      <form>
        <FormLabel>
          Name:
          <FormInput type="text" name="name" />
        </FormLabel>
        <FormLabel>
          Email:
          <FormInput type="text" name="email" />
        </FormLabel>
        <FormLabel>
          Password:
          <FormInput type="password" name="password" />
        </FormLabel>

        <button onClick={goToNewPage2} class="flex items-center justify-center w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200">
                <i class="fas fa-broom mr-2"></i>
                Change
            </button>
        
      </form>
    </FormContainer>
        </BottomBox>
      </BottomSection>

      <div>
        <h1>Your Visualizations. Preserved.</h1>
      </div>
    </Container>
  );
}

export default PersonProfile;
