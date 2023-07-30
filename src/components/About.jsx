import "../App.css";
import meme from "../images/meme.png";

const About = () => {
  return (
    <div className="  ">
      <h1 className="text-m">
        -This contract is currently in BETA and is deployed to the SEPOLIA
        TESTNET ONLY-
      </h1>
      <hr className=" my-6 border-gray-300 dark:border-gray-500 " />

      <p className=" aboutInfoTitle flex justify-center ">
        <strong>Tokenomics</strong> <br />
      </p>

      <p className="aboutInfo flex-col justify-center items-center py-5 pb-25">
        <strong>Supply:</strong> 7.88 trillion <br />
        <strong>Deflationary:</strong> 1% fee on all transactions is sent to be
        burned <br />
        <strong>Burnable:</strong> burn as many as you want <br />
        <strong>Risk:</strong> 100% <br />
        <strong>Reward:</strong> kek <br />
        <strong> Contract Address (sepolia):</strong> <br />
        <strong>0xE98f38122263b07B3159120fBB360385005E758E</strong>
      </p>

      <div className="aboutBottom ">
        <strong>
          Utilizing Efficient Market Hypothesis as a Feature not a Bug 🐛.{" "}
        </strong>
      </div>

      <div className="banner2">
        <img className="img-responsive" src={meme} alt="banner" />
      </div>
    </div>
  );
};

export default About;
