import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';

function LogIn() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ needsVerification, setNeedsVerification ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((error) => {
                console.error(error);
                setError(error.code);
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                if (!user.emailVerified) {
                    sendEmailVerification(user);
                    setNeedsVerification(true);
                }
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/invalid-credential")
                    setError("Invalid Email/Password");
            });
    };

    const resendVerificationEmail = () => {
        sendEmailVerification(user);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (auth_user) => {
            if (auth_user) {
                setUser(auth_user)
                if (auth_user.emailVerified) {
                    navigate("/");
                } else {
                    setNeedsVerification(true);
                }
            } else {
                setUser(null)
            }
        });
    }, [ user ]);



    return (
        <div className="flex shadow-lg rounded-lg bg-white w-screen h-screen font-mono">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
            <div className="w-1/2 p-8 bg-black text-white flex flex-col justify-between">
                <Link to="/" className='flex self-end'>
                    <div
                        className="w-10 h-10 bg-center bg-no-repeat bg-contain mr-3"
                        style={ { backgroundImage: `url('https://img.icons8.com/?size=100&id=69617&format=png&color=FFFFFF')` } }
                    ></div>
                    <h1 className="text-3xl font-bold text-white">DataTool</h1>
                </Link>
                <div>
                    <h2 className="text-6xl font-medium mb-16">Login</h2>
                    <p className="text-2xl mb-8">
                        Login to gain access to your tokens<sup>*</sup> and our powerful set of tools geared towards providing you with insightful visualizations and analysis of your data
                    </p>
                </div>
                <div>
                    <p className='text-2xl'>
                        Don't have an account?
                    </p>
                    <button
                        className='bg-white rounded text-black px-4 py-3 w-25 text-xl flex justify-evenly items-center'
                        onClick={ () => navigate("/signup") }
                    >
                        Sign Up
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <div className="text-md">
                    <p><sup>*</sup> To learn more about tokens have a look at our <Link to="/pricing" className='text-white'>pricing</Link></p>
                </div>
            </div>
            { needsVerification ?
                <div className='flex flex-col justify-center px-28 w-1/2'>
                    <p className='mb-0'>A verification email has been sent to you. </p>
                    <p className='mt-0'>Please verify your email to proceed.</p>
                    <div className='mb-4 self-center' >
                        <button className='px-16 py-2.5 bg-black text-white rounded'>
                            Resend verification email
                        </button>
                    </div>
                </div> :
                <form className="w-1/2 h-screen flex flex-col justify-center px-28 text-lg" onSubmit={ handleFormSubmit }>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="example@company.com"
                            className="w-full p-2 outline outline-gray-300 rounded focus:invalid:outline-red-500 focus:invalid:text-red-600 focus:outline-black focus:outline-2 invalid:outline-red-500 invalid:text-red-600"
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Password must be at least 8 characters"
                            className="w-full p-2 outline outline-gray-300 rounded focus:invalid:outline-red-500 focus:invalid:text-red-600 focus:outline-black focus:outline-2 invalid:outline-red-500 invalid:text-red-600"
                            value={ password }
                            minLength={ 8 }
                            onChange={ (e) => setPassword(e.target.value) }
                        />
                    </div>
                    <div className="mb-4 self-center">
                        <button type="submit" className="px-16 py-2.5 bg-black text-white rounded">Login</button>
                    </div>
                    <p className='text-red-600 self-center'>{ error }</p>
                    <div className="text-center mb-4 self-center flex flex-col justify-center">
                        <p className="text-gray-700">Or continue with</p>
                        <button onClick={ handleSignInWithGoogle } className="px-16 py-2.5 bg-black text-white rounded flex justify-center items-center mt-2">
                            <img src="googleLogo.png" alt="Google logo" className="w-7 h-7 mr-2" />
                            Google
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}

export default LogIn;
