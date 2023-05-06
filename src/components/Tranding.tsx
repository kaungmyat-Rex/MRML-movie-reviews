import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { TrandingModel } from "./Model";

/* react-slick arrow hide function*/
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

export const TrandingSlider = () => {
  const [openTrandModel, setOpenTrandModel] = useState<boolean>(false);
  const [modeldata, setModelData] = useState([]) as any[];
  const [translateOverview, setTranslateOverview] = useState("");
  const [fullcast, setFullcast] = useState([]);
  const [trailar, setTrailar] = useState("");
  /*Single movie data and transliation api fetching for model.tsx*/
  const openTrandModelFun = async (id: string) => {
    setOpenTrandModel(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US`
      )
      .then((res) => {
        setModelData(res.data);

        axios
          .get(
            `https://imdb-api.com/en/API/FullCast/k_z20zir6t/${res.data.imdb_id}`
          )
          .then((res) => setFullcast(res.data.actors));
        axios
          .get(
            `https://imdb-api.com/en/API/YouTubeTrailer/k_z20zir6t/${res.data.imdb_id}`
          )
          .then((res) => {
            const url = res.data.videoUrl;
            const regex =
              /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:[\&\?].*?)?(?:#t=(\d+))?$/;
            const match = url.match(regex);
            setTrailar(match[1]);
          });

        const options = {
          method: "POST",
          url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "51fa1f2a40mshe0b6b6e99611d99p1c6332jsn9b7eda1a2bc7",
            "X-RapidAPI-Host":
              "rapid-translate-multi-traduction.p.rapidapi.com",
          },
          data: {
            from: "en",
            to: "my",
            q: `${res.data.overview}`,
          },
        };

        axios.request(options).then((res) => setTranslateOverview(res.data));
      });
  };

  /* upcomming movie data fetching function with react query*/
  const { data } = useQuery(["upcoming"], () => {
    return axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US&page=1"
      )
      .then((res) => res.data.results);
  });

  /* react-slick library setting*/
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
  };
  return (
    <>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5 mt-5">
        လူကြိုက်များနေသော ရုပ်ရှင်များ
      </h1>
      <Slider {...settings} className=" mt-1">
        {data?.map((e: any) => (
          <div
            key={e.id}
            className="relative w-72 flex"
            onClick={() => openTrandModelFun(e.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
              alt="casual"
              className="rounded-2xl w-full relative"
            />
            <div className="absolute z-10 left-0 bottom-0 bg-gradient-to-t from-purple-950 from-10 w-full h-full"></div>
            <h4 className="absolute left-2 bottom-2 text-white text-xl z-20">
              {e.title}
              <br />
              <span className="text-slate-300 z-20 text-sm ">
                {e.release_date}
              </span>
            </h4>
            <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-base rounded-lg pl-2 pr-2 font-bold z-40 top-0 right-0">
              {e.vote_average}
            </span>
          </div>
        ))}
      </Slider>
      <div className={`${openTrandModel ? "block" : "hidden"}`}>
        <TrandingModel
          modeldata={modeldata}
          setOpenTrandModel={setOpenTrandModel}
          translateOverview={translateOverview}
          fullcast={fullcast}
          trailar={trailar}
        />
      </div>
    </>
  );
};

export default TrandingSlider;
