import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import { useState } from "react";
library.add(faCircleXmark);

function App() {
  const [islog, setIsLog] = useState(true);
  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState(false);
  return (
    <div className={visible && "App"}>
      <Router>
        <Header
          visible={visible}
          setVisible={setVisible}
          login={login}
          setLogin={setLogin}
          isLog={islog}
          setIsLog={setIsLog}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
        {visible && (
          <Modal
            setVisible={setVisible}
            visible={visible}
            login={login}
            setLogin={setLogin}
            isLog={islog}
            setIsLog={setIsLog}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
