import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDescription from "./pages/PostDescription";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from "./pages/AddPost";


function App() {
  function ProtectedRoute({ children }) {
    if (localStorage.getItem('grumper.user')) {
      return children
    }
    else {
      return <Navigate to="/login" />
    }
  }
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          {/* <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
          <Route path='/addpost' element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path='/post/:id' element={<ProtectedRoute><PostDescription /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
