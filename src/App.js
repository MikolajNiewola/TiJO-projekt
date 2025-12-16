import './App.css';
import { Routes, Route } from 'react-router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import About from './pages/About';
import Statistics from './pages/Statistics';
import LoginPage from './pages/LoginPage';
import Error from './pages/Error';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
