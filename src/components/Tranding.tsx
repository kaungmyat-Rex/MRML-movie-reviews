import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const TrandingSlider = () => {
  const { data } = useQuery(["upcoming"], () => {
    return axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US&page=1"
      )
      .then((res) => res.data.results);
  });
  console.log(data);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5 mt-5">
        မကြာခင် လာမည့် ရုပ်ရှင်များ
      </h1>
      <Slider {...settings} className=" mt-1">
        {data?.map((e: any) => (
          <div key={e.id} className="relative w-72 flex">
            <img
              src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
              alt="casual"
              className="rounded-2xl w-full relative"
            />
            <div className="absolute z-10 left-0 bottom-0 bg-gradient-to-t from-purple-950 from-10 w-full h-full"></div>
            <h4 className="absolute left-2 bottom-2 text-white text-xl z-20">
              {e.title}
            </h4>
            <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-base rounded-lg pl-2 pr-2 font-bold z-40 top-0 right-0">
              {e.vote_average}
            </span>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TrandingSlider;
