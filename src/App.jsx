import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Home from "./views/Home";
import { WalletProvider } from "./contexts/WalletContext";

const App = () => {
  return (
    <WalletProvider>
      <div className="App-header min-h-screen ">
        <Header />

        <div className="route-container flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/:id" element={<About />} />
          </Routes>
        </div>
      </div>
    </WalletProvider>
  );
};

export default App;
