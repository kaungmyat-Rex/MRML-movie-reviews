import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TbLoader3 } from "react-icons/tb";
import { TrandingModel } from "./Model";
import { useEffect } from "react";

interface props {
  openTrandModel: boolean;
  setOpenTrandModel: (openTrandModel: boolean) => void;
  modeldata: [];
  setModelData: (modeldata: []) => void;
  translateOverview: string;
  setTranslateOverview: (translateOverview: string) => void;
  fullcast: [];
  setFullcast: (fullcast: []) => void;
  trailar: string;
  setTrailar: (trailar: string) => void;
  setopenSearchList: (openSearchList: boolean) => void;
  loading: boolean;
  apitype: string;
  setApitype: (apitype: string) => void;
}

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

function DisplayNextArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

export const TrandingSlider = ({
  openTrandModel,
  setOpenTrandModel,
  modeldata,
  setModelData,
  translateOverview,
  setTranslateOverview,
  fullcast,
  setFullcast,
  trailar,
  setTrailar,
  setopenSearchList,
  loading,
  apitype,
  setApitype,
}: props) => {
  /*Single movie data and transliation api fetching for model.tsx*/
  const openTrandModelFun = async (
    id: string,
    apitype: string
  ): Promise<void> => {
    setopenSearchList(false);
    setOpenTrandModel(true);

    await axios
      .get(
        `https://api.themoviedb.org/3/${apitype}/${id}?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US`
      )
      .then((res) => {
        setModelData(res.data);

        // axios
        //   .get(
        //     `https://imdb-api.com/en/API/YouTubeTrailer/k_z20zir6t/${res.data.imdb_id}`
        //   )
        //   .then((res) => {
        //     setTrailar(res.data.videoUrl);

        //   });
        // const url = res.data.videoUrl;
        // const regex =
        //   /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:[\&\?].*?)?(?:#t=(\d+))?$/;
        // const match = url.match(regex);
        // setTrailar(match[1]);

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

    await axios
      .get(
        `https://api.themoviedb.org/3/${apitype}/${id}/credits?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US`
      )
      .then((res) => {
        setFullcast(res.data.cast);
      });
    await axios
      .get(
        `https://api.themoviedb.org/3/${apitype}/${id}/videos?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US`
      )
      .then((res) => {
        // setTrailar(res.data.videoUrl);
        const filtervideo = res.data.results.filter((e: any) =>
          e.name.toLowerCase().includes("official trailer")
        );
        setTrailar(filtervideo.slice(0, 1).map((e: any) => e.key));
      });
  };

  /* upcomming movie data fetching function with react query*/
  const { data, refetch } = useQuery(["upcoming"], () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/trending/${apitype}/day?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US&page=1`
      )
      .then((res) => res.data.results);
  });

  useEffect(() => {
    refetch();
  }, [apitype]);

  /* upcomming movie data fetching function with react query*/

  /* react-slick library setting*/
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          className: "",
          slidesToShow: 5,
          slidesToScroll: 5,
          centerMode: false,
          nextArrow: <DisplayNextArrow />,
          prevArrow: <DisplayNextArrow />,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          className: "",
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <TbLoader3 className="text-pink-500 animate-spin text-5xl absolute left-1/2 top-44" />
      ) : (
        <>
          <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5 mt-5 lg:mt-16">
            လူကြိုက်များနေသော ရုပ်ရှင်များ
          </h1>
          <div className="flex text-white text-lg font-semibold mt-2 pb-9">
            <p
              onClick={() => setApitype("movie")}
              className={`${
                apitype === "movie"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 inline-block"
                  : ""
              } border border-slate-400 rounded-sm pl-2 pr-2 pt-1 pb-1`}
            >
              Movies
            </p>
            <p
              onClick={() => setApitype("tv")}
              className={`${
                apitype === "tv"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 inline-block"
                  : ""
              } border border-slate-400 rounded-sm pl-3 pr-3 pt-1 pb-1`}
            >
              Series
            </p>
          </div>
          <Slider {...settings} className=" mt-1">
            {data?.map((e: any) => (
              <div
                key={e.id}
                className="relative w-72 flex cursor-pointer"
                onClick={() => openTrandModelFun(e.id, apitype)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                  alt="casual"
                  className="rounded-2xl w-full relative"
                />
                <div className="absolute left-0 bottom-0 bg-gradient-to-t from-purple-950 from-10 w-full h-full"></div>
                <h4 className="absolute left-2 bottom-2 text-white text-xl">
                  {apitype === "movie" ? e.title : e.name}
                  <br />
                  <span className="text-slate-300 text-sm ">
                    {apitype === "movie" ? e.release_date : e.first_air_date}
                  </span>
                </h4>
                <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-lg rounded-full pl-2 pr-2 pt-2 pb-2 font-bold -top-2 right-3 text-black">
                  {e.vote_average.toFixed(1)}
                  {/* {e.vote_average === Math.floor(e.vote_average) ? ".0" : ""} */}
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
              apitype={apitype}
            />
          </div>
        </>
      )}
    </>
  );
};

export default TrandingSlider;
