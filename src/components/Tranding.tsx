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
    <Slider {...settings} className="bg-red-600 mt-7">
      {data?.slice(0, 5).map((e: any) => (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
            alt="casual"
            className="rounded-2xl w-72"
          />
        </div>
      ))}
    </Slider>
  );
};

export default TrandingSlider;
