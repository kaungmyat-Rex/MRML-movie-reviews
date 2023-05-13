interface props {
  searchDataList: any;
}
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

import { SeemoreBtn } from "./Button";
import { SearchModel } from "./Model";
import axios from "axios";

const SearchList = ({ searchDataList }: props) => {
  const [openTrandModel, setOpenTrandModel] = useState<boolean>(false);
  const [modeldata, setModelData] = useState([]) as any[];
  const [translateOverview, setTranslateOverview] = useState("");
  const [fullcast, setFullcast] = useState([]);
  const [trailar, setTrailar] = useState("");

  const [seemore, setSeemore] = useState(4);

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

  const seeMoreFun = (e: any) => {
    e.preventDefault();
    setSeemore(seemore + 4);
  };

  return (
    <>
      <div className="w-full relative ">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5">
          ရှာတွေသော ရုပ်ရှင်များ
        </h1>
        <IoIosArrowForward className="text-pink-500 text-2xl font-bold absolute top-6 left-44" />
      </div>
      <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap lg:relative lg:pb-28 lg:justify-start lg:pl-24">
        {searchDataList
          .filter(
            (e: any) => e.backdrop_path !== null && e.poster_path !== null
          )
          .slice(0, seemore)
          .map((e: any) => (
            <div
              key={e.id}
              className="max-w-sm w-full bg-gradient-to-r from-gradientColor1 to-gradientColor2 rounded-lg mt-5 relative lg:mr-2 lg:ml-2"
            >
              <div className="flex justify-start items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                  alt="searchImg"
                  className="w-32 h-44 rounded-lg object-cover m-2"
                />

                <div className="ml-2 mr-2">
                  <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-xl font-extrabold">
                    {e.original_title}
                  </h4>
                  <p className="text-slate-300 font-light mb-3">
                    {e.release_date}
                  </p>
                  <span
                    onClick={() => openTrandModelFun(e.id)}
                    className="text-slate-300 font-normal bg-purple-800 pr-3 pl-3 pt-1 pb-2 rounded-lg shadow-xl mt-5 cursor-pointer"
                  >
                    ကြည့်မည်
                  </span>
                </div>
                <span className="absolute bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-base rounded-md pl-1 pr-1 border-2 border-slate-300 text-slate-300 font-bold top-2 left-2 ">
                  {e.vote_average?.toFixed(1).substring(0, 3)}
                </span>
              </div>
            </div>
          ))}

        <div
          className="mt-10 mb-8 lg:absolute lg:-bottom-8 lg:left-1/2 lg:-translate-x-2/4"
          onClick={(e) => seeMoreFun(e)}
        >
          <SeemoreBtn text={"နောက်ထပ်ရှာရန်"} />
        </div>
      </div>
      <div className={`${openTrandModel ? "block" : "hidden"}`}>
        <SearchModel
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

export default SearchList;
