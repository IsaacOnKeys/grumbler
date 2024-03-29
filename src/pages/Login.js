import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { app, fireDB } from "../firebaseConfig";
import Loader from "../components/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { loading } = useSelector(store => store);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    dispatch({ type: 'showLoading' });
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(fireDB, 'users', user.uid)).then((user) => {
          localStorage.setItem('grumper.user', JSON.stringify({ ...user.data(), id: user.id }))
          toast.success('Login Successful')
        });
        dispatch({ type: 'hideLoading' });
        navigate('/')
      })
      .catch((error) => {
        toast.error('login failed');
        dispatch({ type: 'hideLoading' });
      });
  };

  useEffect(() => {
    if (localStorage.getItem('grumper.user')) {
      navigate('/');
    }
  });
  
  return (
    <div className="h-screen flex justify-between flex-col overflow-x-hidden">
      {loading && <Loader />}

      {/* Top Shape */}
      <div className="flex justify-start" >
        <div className="h-35 bg-primary w-80 skew-x-[35deg] -ml-16 flex items-center justify-center">
          <h1 className="grumbler-head text-[3ch] font-bold skew-x-[-35deg] pl-5 text-white">Grumbler :(</h1>
        </div>
      </div>

      {/* form */}
      <div className="flex justify-center">
        <div className="w-96 flex flex-col space-y-5 login-card p-6">
          <h1 className="text-4xl text-primary font-semibold">Login</h1>
          <hr />

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border border-primary h-10 rounded-sm pl-5 hover:border-secondary text-primary-dark placeholder:text-primary-dark-grey focus:outline-none focus:ring-2 focus:ring-primary focus:border-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="border border-primary h-10 rounded-sm pl-5 hover:border-secondary text-primary-dark placeholder:text-primary-dark-grey focus:outline-none focus:ring-2 focus:ring-primary focus:border-none"
          />
          <div>
            <button className="bg-primary h-10 rounded-sm pl-5 pr-5 font-bold text-white hover:ring-2 hover:ring-[#eee] hover:bg-secondary" onClick={login}>
              LOGIN
            </button>
          </div>
          <hr />
          <Link
            to="/Register"
            className="text-[2ch] text-primary hover:text-secondary">
            Not yet registered? Click here to register.
          </Link>
        </div>
      </div>

      {/* Bottom Shape */}
      <div className="flex justify-end" >
        <div className="h-35 bg-primary w-80 skew-x-[35deg] -mr-16 flex items-center justify-center">
          <h1 className="grumbler-head text-[3ch] font-bold skew-x-[-35deg] pr-5 text-white">Grumbler :(</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
