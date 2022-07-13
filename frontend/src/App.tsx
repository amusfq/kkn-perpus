import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}

export default App;
