import React, { useEffect, useState } from "react";
import image1 from "../../assets/banner/header1.png";
import image2 from "../../assets/banner/header2.png";
import left from "../../assets/banner/left-arrow.png";
import right from "../../assets/banner/right-arrow.png";

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const listImages = [image1, image2];

  const nextImage = () => {
    if (listImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (listImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container rounded">
      <div className="h-96 w-full bg-slate-200 relative">
        <div className="absolute h-full w-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-1 bg-yellow-100"
            >
              <img src={left} alt="" className=""/>
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1 bg-yellow-100"
            >
              <img src={right} alt="" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex h-full w-full overflow-hidden">
          {listImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Header;
