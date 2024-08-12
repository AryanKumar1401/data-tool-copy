import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.p`
  color: #333;
`;

const Maintenance = () => {
  return (
    <PageContainer>
      <Content>
        Page currently under maintenance T_T
      </Content>

      <footer className="bg-black text-white text-center py-4 mt-auto">
          <p>&copy; {new Date().getFullYear()} DataTool. All rights reserved.</p>
        </footer>
    </PageContainer>
  );
};

export default Maintenance;
