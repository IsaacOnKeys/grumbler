import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { fireDB, app } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";

 
function Register() {  
 
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading } = useSelector(store => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const register = () => {
        const auth = getAuth(app);
        dispatch({ type: 'showLoading' });
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: user.email,
                    profilePicUrl: '',
                    bio: 'Hi I am using grumper!',
                };
                setDoc(doc(fireDB, 'users', user.uid), userData);
                dispatch({ type: 'hideLoading' });
                toast.success("Registration Successful!")
                navigate('/login'); 
            })
            .catch((error) => {
                dispatch({ type: 'hideLoading' });
                toast.error("Invalid username or password")
                console.log(error);
            });
    };
    useEffect(() => {
        if (localStorage.getItem('grumper.user')) {
            navigate('/');
        }
    });
    return (
        <div className="h-screen flex justify-between flex-col overflow-x-hidden bg-primary">
               {loading && <Loader/>} 
            {/* Top Shape */}
            <div className="flex justify-start">
                <div className="h-35 bg-white w-80 skew-x-[35deg] -ml-16 flex items-center justify-center">
                    <h1 className="grumbler-head text-[3ch] font-bold skew-x-[-35deg] pl-5 text-primary">
                        Grumbler :(
                    </h1>
                </div>
            </div>

            {/* form */}
            <div className="flex justify-center ">
                <div className="w-96 flex flex-col space-y-5 login-card p-6 bg-transparent">
                    <h1 className="text-4xl text-white font-semibold">Register</h1>
                    <hr />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        className="border border-primary h-10 rounded-sm pl-5 hover:border-secondary text-primary-dark placeholder:text-primary-dark-grey focus:outline-none focus:ring-2 focus:ring-primary-dark-grey focus:border-none"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className="border border-primary h-10 rounded-sm pl-5 hover:border-secondary text-primary-dark placeholder:text-primary-dark-grey focus:outline-none focus:ring-2 focus:ring-primary-dark-grey focus:border-none"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="confirm password"
                        //focuse-border-not-working- check out tailwind css doc
                        className="border border-primary h-10 rounded-sm pl-5 hover:border-secondary text-primary-dark placeholder:text-primary-dark-grey focus:outline-none focus:ring-2 focus:ring-primary-dark-grey focus:border-none"
                    />
                    <div>
                        <button
                            className="bg-white h-10 rounded-sm pl-5 pr-5 font-bold text-primary hover:ring-2 focus:outline-none hover:ring-secondary"
                            onClick={register}>
                            Register
                        </button>
                    </div>
                    <hr />
                    <Link
                        to="/login"
                        className="text-[2ch] text-white hover:text-[]"
                    >
                        Already registered? Click here to log in.
                    </Link>
                </div>
            </div>

            {/* Bottom Shape */}
            <div className="flex justify-end">
                <div className="h-35 bg-white w-80 skew-x-[35deg] -mr-16 flex items-center justify-center">
                    <h1 className="grumbler-head text-[3ch] font-bold skew-x-[-35deg] pr-5 text-primary">
                        Grumbler :(
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Register;
