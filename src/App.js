import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routes from "./routes/Routers";
import "./App.css";

import Bag from "./pages/Bag";
import { useSelector } from "react-redux";

function App() {
  const showBag = useSelector((state) => state.bagUi.bagIsVisible);
  return (
    <div>
      <Header />
      {showBag && <Bag />}

      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
