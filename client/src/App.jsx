
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Products from "./views/ShopNow/Products";
import About from "./views/About/About";
import Detail from "./views/Detail/Detail";
import Shopping from "./views/ShoppingCart/ShoppingCart";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import UploadProduct from './views/UploadProduct/UploadProduct'
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContex";
import { ToastContainer } from "react-toastify";
import Dashboard from './views/Dashboard Admin/Dashboard'
import CreateProduct from './views/CreateProduct/CreateProduct'
import Profile from "./views/Profile/Profile";
import "react-toastify/dist/ReactToastify.css";
import ChatBot from "react-simple-chatbot";
import { useState } from "react";
import person from "../src/assets/image/person-placeholder-400x400.png"
import { ThemeProvider } from 'styled-components';
import PropTypes from "prop-types";
import {SiChatbot} from "react-icons/si"
import {theme} from "../src/utils/theme"
import {steps} from "../src/utils/steps"
import Puchases from "./views/Purchases/Puchases";
import Reviews from "./views/Reviews/Reviews";
import Stars from "./components/Stars/Stars";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};




function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setShowButton(false);
  };

  const hideChatbot = () => {
    setShowChatbot(false);
    setShowButton(true);
  };
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/checkout" element={<Layout><Shopping /></Layout>} />
          <Route path="/products/:id" element={<Layout><Detail /></Layout>} />
          <Route path="/adminDashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/createProduct" element={<Layout><CreateProduct /></Layout>} />
          <Route path="/editProduct/:id" element={<Layout><UploadProduct /></Layout>} />
          <Route path="/my_profile" element={<Layout><Profile/></Layout>} />
          <Route path="/my_puchases" element={<Layout><Puchases/></Layout>} />
          <Route path="/my_reviews" element={<Layout><Reviews/></Layout>} />
          <Route path="/stars" element={<Layout><Stars/></Layout>} />
        </Routes>
     
        <ThemeProvider theme={theme}>
  <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
    {showButton && (
      <button
        className="bg-blue-100 text-blue-800 text-5xl font-semibold mb-20 px-5 py-5 rounded-full dark:bg-blue-200 dark:text-blue-800 mr-20"
        onClick={toggleChatbot}
      >
        <SiChatbot />
      </button>
    )}
    {showChatbot && (
      <div style={{ position: "relative" }}>
        <ChatBot
          steps={steps}
          headerTitle="Chatbot"
          userAvatar={person}
        />
        <button
          className="text-white hover:text-white-900 dark:hover:text-white text-m mr-5 mt-3"
          onClick={hideChatbot}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "right 1s ease-in-out",
            zIndex:9999,
          }}
        >
          X
        </button>
      </div>
    )}
  </div>
</ThemeProvider>
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
