import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Header from "./components/Header";
import { useState } from "react";
library.add(faCircleXmark, faArrowUp, faArrowDown);

function App() {
  const [islog, setIsLog] = useState(true);
  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useState(false);
  const [range, setRange] = useState([10, 100]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
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
          range={range}
          setRange={setRange}
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                range={range}
                search={search}
                setSearch={setSearch}
                sort={sort}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/offer/publish" element={<Publish />} />
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
