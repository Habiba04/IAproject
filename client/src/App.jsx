import './App.css'
import ChatPage from './Components/Chat/ChatPage';
//import About from './Components/About';
//import Contact from './Components/Contact';
// import AboutUsPage from './Components/AboutUsPage'
// import HomePage from './Components/homePage'
import NavBar from './Components/navbar/NavBar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './context/CharContext';

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<ChatPage />} />
        <Route
          path="/chat/:id?"
          element={<ChatProvider children={<ChatPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
