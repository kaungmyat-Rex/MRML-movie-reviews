import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { TbLoader3 } from "react-icons/tb";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TrandingModel } from "./Model";
import { BsArrowLeftSquare } from "react-icons/bs";
import { BsArrowRightSquare } from "react-icons/bs";

interface props {
  openTrandModel: boolean;
  setOpenTrandModel: any;
  modeldata: any;
  setModelData: any;
  translateOverview: any;
  setTranslateOverview: any;
  fullcast: any;
  setFullcast: any;
  trailar: any;
  setTrailar: any;
  setopenSearchList: any;
}

const WatchBefore = ({
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
}: props) => {
  const [count, setCount] = useState(1);
  const Scrollref = useRef<any>(null);
  /*Single movie data and transliation api fetching for model.tsx*/
  const openTrandModelFun = async (id: string) => {
    setopenSearchList(false);
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
            setTrailar(res.data.videoUrl);
            // const url = res.data.videoUrl;
            // const regex =
            //   /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})(?:[\&\?].*?)?(?:#t=(\d+))?$/;
            // const match = url.match(regex);
            // setTrailar(match[1]);
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

  const { data, isLoading, refetch } = useQuery(["watchbefore"], () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US&page=${count}`
      )
      .then((res) => res.data.results);
  });

  const countFun = (dataset: any) => {
    setCount(Number(dataset.testId));
  };

  useEffect(() => {
    refetch();
  }, [count, refetch]);

  // console.log(
  //   data?.filter(
  //     (e: any) => e.original_language === "en" || e.original_language === "es"
  //   )
  // );

  const ScrollLeft = () => {
    Scrollref.current.scrollLeft += 500;
  };

  const ScrollRight = () => {
    Scrollref.current.scrollLeft -= 500;
  };

  if (isLoading) {
    return (
      <TbLoader3 className="text-pink-500 animate-spin text-5xl absolute left-1/2" />
    );
  }

  return (
    <div className="pt-7 pb-7 relative">
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5 mt-5">
        မသေခင် ကြည့်သင့်သော ရုပ်ရှင်များ
      </h1>
      <BsArrowLeftSquare
        onClick={() => ScrollRight()}
        className=" text-white text-4xl z-20 absolute left-10 top-99 cursor-pointer md:-left-10 md:top-2/4 "
      />
      <BsArrowRightSquare
        onClick={() => ScrollLeft()}
        className=" text-white text-4xl z-20 absolute right-10 top-99 cursor-pointer md:-right-10 md:top-2/4"
      />
      <div
        ref={Scrollref}
        className="flex justify-start items-center scrollbar-hide overflow-x-scroll overflow-y-hidden mt-4 scroll-smooth"
      >
        {data
          ?.filter((e: any) => e.original_language === "en")
          .map((e: any) => (
            <div
              key={e.id}
              className="flex flex-col  mr-1 ml-1 cursor-pointer"
              onClick={() => openTrandModelFun(e.id)}
            >
              <img
                className="w-44 h-60 object-cover"
                src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                alt=""
              />
              <div className="w-44 h-32 bg-zinc-800 relative z-0">
                <p className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-base rounded-sm pr-1 pl-1 text-white mt-3 ml-2">
                  {e.vote_average}
                </p>
                <h4 className="text-white text-base mt-3 ml-2 font-semibold tracking-wide">
                  {e.original_title}
                </h4>
                <p className="text-white font-Nunito text-xs absolute right-3 top-3">
                  {e.release_date}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-row justify-center items-center mt-6">
        <p
          data-test-id="1"
          onClick={(e: any) => countFun(e.target.dataset)}
          className={`${
            count === 1 ? "bg-purple-500" : "bg-none"
          } text-white border-2 pr-2 pl-2 mr-1 ml-1 cursor-pointer`}
        >
          1
        </p>
        <p
          data-test-id="2"
          onClick={(e: any) => countFun(e.target.dataset)}
          className={`${
            count === 2 ? "bg-purple-500" : "bg-none"
          } text-white border-2 pr-2 pl-2 mr-1 ml-1 cursor-pointer`}
        >
          2
        </p>
        <p
          data-test-id="3"
          onClick={(e: any) => countFun(e.target.dataset)}
          className={`${
            count === 3 ? "bg-purple-500" : "bg-none"
          } text-white border-2 pr-2 pl-2 mr-1 ml-1 cursor-pointer`}
        >
          3
        </p>
      </div>
      <div className={`${openTrandModel ? "block" : "hidden"}`}>
        <TrandingModel
          modeldata={modeldata}
          setOpenTrandModel={setOpenTrandModel}
          translateOverview={translateOverview}
          fullcast={fullcast}
          trailar={trailar}
        />
      </div>
    </div>
  );
};

export default WatchBefore;
