import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from "./pages/Register";
function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
