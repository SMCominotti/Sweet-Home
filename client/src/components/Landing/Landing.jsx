import { useEffect } from "react";
import { Carousel, initTE } from "tw-elements";

const Landing = () => {
  useEffect(() => {
    initTE({ Carousel });
  }, [initTE]);

  return (
    <div>
      <div
        id="carouselExampleSlidesOnly"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide
      >
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          <div
            className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            data-te-carousel-active
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neutral-700 via-transparent"></div>
            <div className="absolute inset-x-0 top-0 py-5 text-center text-white md:block select-none">
              <h1 className="text-5xl drop-shadow-2xl capitalize" style={{ textShadow: '2px 2px 4px #000000' }}>Welcome to Sweet Home</h1>
            </div>
            <img
              src="https://www.fabmodula.com/images/Newbanner1.jpg"
              className="block w-full"
              alt="Wild Landscape"
            />
          </div>
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neutral-700 via-transparent"></div>
            <div className="absolute inset-x-0 top-0 py-5 text-center text-white md:block select-none">
              <h5 className="text-4xl drop-shadow-2xl capitalize" style={{ textShadow: '2px 2px 4px #000000' }}>Explore our shop</h5>
              <br />
              <p className="drop-shadow-2xl capitalize" style={{ textShadow: '2px 2px 4px #000000' }}>Take a look at what we have for you</p>
            </div>
            <img
              src="https://www.fabmodula.com/images/Newbanner4.jpg"
              className="block w-full"
              alt="Camera"
            />
          </div>
          <div
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-item
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neutral-700 via-transparent"></div>
            <div className="absolute inset-x-0 top-0 py-5 text-center text-white md:block select-none">
              <h5 className="text-5xl drop-shadow-2xl capitalize" style={{ textShadow: '2px 2px 4px #000000' }}>Acquire real quality</h5>
              <br />
              <p className="drop-shadow-2xl capitalize" style={{ textShadow: '2px 2px 4px #000000' }}>Discover the trending top-quality softy furniture</p>
            </div>
            <img
              src="https://www.fabmodula.com/images/Newbanner3.jpg"
              className="block w-full"
              alt="Exotic Fruits"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
