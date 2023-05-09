import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faArrowUp,
  faArrowDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";
import Payment from "./components/Payment";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Header from "./components/Header";
import { useState } from "react";
library.add(faCircleXmark, faArrowUp, faArrowDown, faPlus);

function App() {
  const [islog, setIsLog] = useState(true);
  const [visible, setVisible] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [range, setRange] = useState([10, 100]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  return (
    <div className={visible || paymentModal ? "App" : ""}>
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
          <Route
            path="/offer/:id"
            element={
              <Offer
                setPaymentModal={setPaymentModal}
                paymentModal={paymentModal}
                isLog={islog}
                setVisible={setVisible}
                visible={visible}
              />
            }
          />
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
        {paymentModal && (
          <Elements stripe={stripePromise}>
            <Payment
              setPaymentModal={setPaymentModal}
              paymentModal={paymentModal}
            />
          </Elements>
        )}
      </Router>
    </div>
  );
}

export default App;
