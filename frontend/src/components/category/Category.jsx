import React, { useEffect, useState } from "react";
import { category } from "../../assets/data/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
import './category.css';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10 cursor-pointer">
      <button
        className="w-8 h-8 bg-white rounded-full shadow-md flex justify-center items-center transition hover:bg-gray-200"
        onClick={onClick}
      >
        <MdNavigateNext className="text-xl" />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10 cursor-pointer">
      <button
        className="w-8 h-8 bg-white rounded-full shadow-md flex justify-center items-center transition hover:bg-gray-200"
        onClick={onClick}
      >
        <GrFormPrevious className="text-xl" />
      </button>
    </div>
  );
};

export const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [cats, setCat] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("https://mern-blog-website-l5zm.onrender.com/category" + search);
      setCat(res.data);
    };
    getCat();
  }, [search]);

  return (
    <section className="mt-10 relative">
      <div className="container mx-auto">
        <Slider {...settings}>
          {category.map((item) => (
            <div key={item.id} className="box p-2">
              <div className="relative rounded-md overflow-hidden cursor-pointer">
                <img
                  src={item.cover}
                  alt="cover"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <div className="absolute top-20 left-0 w-full text-center text-white z-10 p-5">
                  <h4 className="text-lg font-medium text-yellow-300">
                    {item.category}
                  </h4>
                  <p className="text-sm font-light mt-2">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
