import thisisFIne from "../images/withcaptions.mp4";
import banner1 from "../images/banner1.jpg";

const Banner = () => {
  return (
    <div className="lgcontainer">
      <div>
        <strong className="titleBanner flex justify-center items-center">
          Utilizing Efficient Market Hypothesis as a Feature Not a Bug 🐛.
        </strong>
      </div>

      <div className="video-wrapper">
        <div className="video-container">
          <video
            className="responsive-video"
            autoPlay
            loop
            muted
            playsinline
            controls
          >
            <source src={thisisFIne} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <hr className="divider" />

      <div className="banner1">
        <img src={banner1} alt="banner" />
      </div>

      <hr className="divider" />
    </div>
  );
};

export default Banner;
