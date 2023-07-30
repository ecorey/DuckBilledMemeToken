import { Link } from "react-router-dom";
import logo from "../images/97.png";
import { FaTwitter } from "react-icons/fa";
import { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import "../App.css";

const Header = () => {
  const { isConnected, connectWallet } = useContext(WalletContext);

  const connectToWallet = () => {
    connectWallet();
  };

  return (
    <div className="w-full sticky top-0 z-50 dark:text-blue-500">
      <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-white dark:bg-gray-900">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="grow flex justify-between items-center p-2">
            <Link
              to="/"
              className="flex justify-start items-center space-x-3"
              href="#"
            >
              <img src={logo} alt="logo" />
              <span className="invisible md:visible dark:text-gray-300 header-text">
                DuckBilled Meme Token
              </span>
            </Link>

            <div className="flex justify-center items-center space-x-5">
              {/* Twitter button */}
              <a
                href="https://twitter.com/duckBilledMeme"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-blue-600 font-medium
                            text-sm leading-tight uppercase rounded-full
                            shadow-md shadow-gray-400 hover:bg-blue-700
                            hover:shadow-lg focus:outline-none
                            active:bg-blue-800 dark:shadow-transparent
                            transition duration-150 ease-in-out dark:text-blue-500
                            dark:border dark:border-blue-500 dark:bg-transparent
                            text-white"
              >
                <FaTwitter /> {/* This is the Twitter icon */}
              </a>

              {/*  Change to link to a About page */}
              <Link
                to={`/about/` + 2}
                className="px-4 py-2.5 bg-blue-600 font-medium
                                text-sm leading-tight uppercase rounded-full
                                shadow-md shadow-gray-400 hover:bg-blue-700
                                hover:shadow-lg focus:outline-none
                                active:bg-blue-800 dark:shadow-transparent
                                transition duration-150 ease-in-out dark:text-blue-500
                                dark:border dark:border-blue-500 dark:bg-transparent
                                text-white"
              >
                About
              </Link>

              {/* <button
                onClick={connectToWallet}
                className="px-4 py-2.5 bg-blue-600 font-medium
              text-sm leading-tight uppercase rounded-full
              shadow-md shadow-gray-400 hover:bg-blue-700
              hover:shadow-lg focus:outline-none
              active:bg-blue-800 dark:shadow-transparent
              transition duration-150 ease-in-out dark:text-blue-500
              dark:border dark:border-blue-500 dark:bg-transparent
              text-white"
              >
                {isConnected ? "Connected" : "Connect Wallet"}
              </button> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
