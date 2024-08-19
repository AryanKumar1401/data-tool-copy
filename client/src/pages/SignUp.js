import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth, db, provider } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function SignUp() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ organization, setOrganization ] = useState("");
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleSignInWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User Created!")
                setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    organization: organization,
                    // Initial amount of tokens
                    tokens: 100,
                });
                navigate("/login");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user);
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    console.log("User Created!")
                }).catch((error) => {
                    console.error(error)
                });
                setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                    organization: organization,
                    // Initial amount of tokens
                    tokens: 100,
                });
                navigate("/login");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        var user = auth.currentUser;
        if (user) {
            navigate("/login");
        }
    }, [])
    

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
                    <h2 className="text-6xl font-medium mb-16">Sign Up</h2>
                    <p className="text-2xl mb-8">
                        Sign Up to get started and receive your first free X tokens<sup>*</sup> to take a deeper dive into your raw data through visualizations and insights with the power of AI
                    </p>
                </div>
                <div>
                    <p className='text-2xl'>
                        Already have an account?
                    </p>
                    <button
                        className='bg-white rounded text-black px-4 py-3 w-25 text-xl flex justify-evenly items-center'
                        onClick={ () => navigate("/login") }
                    >
                        Login
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <div className="text-md">
                    <p><sup>*</sup> To learn more about tokens have a look at our <Link to="/pricing" className='text-white'>pricing</Link></p>
                </div>
            </div>
            <form className="w-1/2 h-screen flex flex-col justify-center px-28 text-lg" onSubmit={ handleFormSubmit }>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        placeholder="Ex: John Doe"
                        className="w-full p-2 outline outline-gray-300 rounded focus:outline-black focus:outline-2"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
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
                            minLength={8}
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="organization" className="block text-gray-700">Organization (optional)</label>
                    <input
                        type="text"
                        id="organization"
                        placeholder="Organization"
                        className="w-full p-2 outline outline-gray-300 rounded focus:outline-black focus:outline-2"
                        value={ organization }
                        onChange={ (e) => setOrganization(e.target.value) }
                    />
                </div>
                <div className="mb-4 self-center">
                    <button type="submit" className="px-16 py-2.5 bg-black text-white rounded">Sign Up</button>
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
        </div>
    );
}

export default SignUp;
