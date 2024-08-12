import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UploadPage from './pages/UploadPage';
import PricingPage from './pages/PricingPage';
import SignIn from './components/SignIn';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Helmet } from 'react-helmet';
import VizualizeOrClean from './pages/VizualizeOrClean';
import UploadPageCleanse from './pages/UploadPageCleanse';
import UploadPageAfterLoadingVisualization from './pages/UploadPageAfterLoadingVisualization';
import DropDownVisualize from './pages/DropDownVisualize';
import Maintenance from './pages/MaintenancePage';
import ContactPage from './pages/ContactPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import PersonProfile from './pages/personprofile';


function App() {

  // const navigate = useNavigate();
  // const navigateToExplore = () => {
  //   navigate('/maintain');
  // };
  const [ user, setUser ] = useState(null);
  const [ verified, setVerified ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (auth_user) => {
      if (auth_user) {
        if (!auth_user.emailVerified) {
          setVerified(false);
        } else {
          setVerified(true);
        }
        setUser(auth_user)
      } else {
        setUser(null)
      }
    });
  }, [])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Routes>
        <Route element={ <RootLayout user={ user } signOut={ handleLogout } verified={ verified } /> } >
          <Route path="/" element={ <HomePage /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="/upload" element={ <UploadPage /> } />
          <Route path="/pricing" element={ <PricingPage /> } />
          <Route path="/choose" element={ <VizualizeOrClean /> } />
          <Route path="/cleanse" element={ <UploadPageCleanse /> } />
          <Route path="/chat" element={ <UploadPageAfterLoadingVisualization /> } />
          <Route path="/dropdownviz" element={ <DropDownVisualize /> } />
          <Route path="/maintain" element={ <Maintenance /> } />
          <Route path="/contact" element={ <ContactPage /> } />
          <Route path="/profile" element = {<PersonProfile />} />
        </Route>
        <Route path="/signup" element={ <SignUp /> } />
        <Route path="/login" element={ <LogIn /> } />
      </Routes>
    </>
  );
}

function RootLayout({ user, signOut, verified }) {
  const navigate = useNavigate();


  return (
    <div className='flex flex-col h-screen'>
      <Helmet>
        <title>Data Tool</title>
      </Helmet>
      <GlobalStyles />

      <header className="bg-black fixed top-0 left-0 w-full p-3 flex justify-between items-center z-50">
        <div className="flex items-center">
          <div
            className="w-10 h-10 bg-center bg-no-repeat bg-contain mr-3"
            style={ { backgroundImage: `url('https://img.icons8.com/?size=100&id=69617&format=png&color=FFFFFF')` } }
          ></div>
          <Link to="/">
            <h1 className="text-2xl font-bold text-white">DataTool</h1>
          </Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="nav-link rounded-md text-white font-bold text-lg hover:bg-white hover:text-black hover:shadow px-3 py-2 ">Main</Link>
          <Link to="/choose" className="nav-link rounded-md text-white font-bold text-lg hover:bg-white hover:rounded-md hover:text-black hover:shadow px-3 py-2">Explore</Link>
          <Link to="/maintain" className="nav-link rounded-md text-white font-bold text-lg hover:bg-white hover:rounded-md hover:text-black hover:shadow px-3 py-2">Pricing</Link>
          <Link to="/contact" className="nav-link rounded-md text-white font-bold text-lg hover:bg-white hover:rounded-md hover:text-black hover:shadow px-3 py-2">Contact</Link>
        </nav>
        { user ? verified ?(
          <span className="text-white font-bold text-lg">{ user.displayName }
            <button
              onClick={ signOut }
              className="bg-red-600 text-white rounded-md px-4 py-2 ml-4 hover:bg-red-700"
            >
              Logout
            </button>
          </span>
        ) : (
            <button
              onClick={ () => navigate("/login") }
              className="bg-white border-2 border-gray-800 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-100"
            >
              Verify Email
            </button>
        )
          : (
            <button
              onClick={ () => navigate("/login") }
              className="bg-white border-2 border-gray-800 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-100"
            >
              Sign Up / Log In
            </button>
          ) }
      </header>

      <div className="flex-1 mt-20">
        <Outlet />
        {/* { showAuth && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <SignIn setUser={ setUser } closeModal={ closeModal } />
            </div>
          </div>
        ) } */}
      </div>

      <footer className="bg-black text-white text-center py-4 mt-auto">
        <p>&copy; { new Date().getFullYear() } DataTool. All rights reserved.</p>
      </footer>

    </div>
  );
}



export default App;
