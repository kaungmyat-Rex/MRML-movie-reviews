import { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";

import ReactPlayer from "react-player";
interface props {
  modeldata: any;
  setOpenTrandModel: any;
  translateOverview: any;
  fullcast: any;
  trailar: any;
}

interface searchprops {
  modeldata1: any;
  setOpenTrandModel: any;
  translateOverview: any;
  fullcast: any;
  trailar: any;
}

export const TrandingModel = ({
  setOpenTrandModel,
  modeldata,
  translateOverview,
  fullcast,
  trailar,
}: props) => {
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${movieId}?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US`
  //     )
  //     .then((res) => setModelData(res.data));
  // }, [movieId]);

  const [selectLanguage, setSelectLanguage] = useState("Burmese");
  const [language, setLanguage] = useState(false);
  const [actorcount, setactorcount] = useState(10);

  const options = [
    { value: "Burmese", text: "Burmese" },
    { value: "English", text: "English" },
  ];

  useEffect(() => {
    if (selectLanguage === "English") {
      setLanguage(false);
    } else {
      setLanguage(true);
    }
  }, [selectLanguage]);

  return (
    <div className="fixed bg-black w-full h-screen left-0 top-0 overflow-y-scroll overflow-x-hidden z-10 lg:pl-10 lg:pr-10">
      <img
        className="w-full max-h-full object-cover absolute left-0 top-0 lg:hidden"
        src={`https://image.tmdb.org/t/p/w500${modeldata?.poster_path}`}
        alt="poster"
      />
      <img
        className="w-3/4 h-3/4 object-cover absolute right-0 top-0 hidden lg:block"
        src={`https://image.tmdb.org/t/p/w500${modeldata?.backdrop_path}`}
        alt="poster"
      />
      <div className="absolute left-0 bottom-0 bg-gradient-to-t from-black from-20 w-full h-full opacity-95 lg:bg-gradient-to-t lg:from-black lg:from-15 lg:opacity-30"></div>
      <div className="absolute left-0 bottom-0 bg-gradient-to-r from-black from-30 w-full h-full opacity-100 hidden lg:block"></div>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-xl rounded-sm pl-2 pr-2 font-bold absolute right-2 top-5">
        MRMl
      </h1>
      <IoIosArrowDropleftCircle
        onClick={() => setOpenTrandModel(false)}
        className={
          "absolute text-black bg-gradient-to-r from-purple-500 to-pink-500 text-3xl top-5 left-2 rounded-full"
        }
      />
      <div className="flex flex-col z-20 mt-98 pb-24 lg:mt-36">
        {/* <div className=" w-full h-98"></div> */}
        <div className="z-20 flex flex-col justify-center items-start mr-5 ml-5">
          <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-3xl font-extrabold">
            {modeldata.original_title}
          </h4>
          <div className="flex flex-row text-gray-400 text-sm mt-5">
            <p className="mr-2">{modeldata.release_date}</p> |{" "}
            <p className="ml-2 mr-2">{modeldata.original_language}</p>|
            <p className="ml-2 mr-2">
              {modeldata.genres?.slice(0, 1).map((e: any) => e.name)}
            </p>
            |
            <p className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block rounded-sm pl-2 pr-2 font-extrabold text-black ml-2">
              {modeldata.vote_average?.toFixed(1).substring(0, 3)}
            </p>
          </div>
          <select
            className="bg-black border-2 border-white text-white rounded-md mt-4"
            placeholder="Language"
            onChange={(e) => setSelectLanguage(e.target.value)}
            value={selectLanguage}
          >
            {options.map((e) => (
              <option key={e.value}>{e.text}</option>
            ))}
          </select>

          {language ? (
            <p className="text-white mt-5 font-Nunito font-medium tracking-wider text-left leading-7 lg:max-w-md">
              {translateOverview}
            </p>
          ) : (
            <p className="text-white mt-5 font-Nunito font-medium tracking- text-left leading-7 lg:max-w-md">
              {modeldata.overview}
            </p>
          )}

          <p className="text-white font-Nunito font-medium mt-7">
            <span className="text-gray-400 text-sm">ရုပ်ရှင်ကြာချိန် : </span>
            {modeldata.runtime} min
          </p>
          <p className="text-white font-Nunito font-medium mt-2">
            <span className="text-gray-400 text-sm">ရုပ်ရှင်Budget : </span>
            {modeldata.budget} dollar
          </p>
        </div>
        <h4 className="text-white ml-5 mb-4 font-semibold text-lg mt-12 border-l-4 border-purple-500 pl-2 lg:z-10 lg:mt-28">
          သရုပ်ဆောင်များ ---
        </h4>
        <div className="flex flex-col mr-1 ml-1 z-20 justify-center items-center ">
          <div className="flex flex-row flex-wrap justify-center items-center lg:justify-start">
            {fullcast?.slice(0, actorcount).map((e: any) => (
              <div
                key={e.id}
                className="flex flex-row max-w-170 w-full bg-gradient-to-r from-gradientColor1 to-gradientColor2 rounded-lg mb-4 mr-1 lg:max-w-none lg:w-52 lg:mr-2 lg:ml-2"
              >
                <img
                  className="w-14 h-14 rounded-full object-cover mr-2 mt-1 mb-1 lg:w-24 lg:h-24 lg:mt-2 lg:ml-2 lg:mb-2"
                  src={e.image}
                  alt="actorImage"
                />
                <div className="flex flex-col w-28 justify-center items-start">
                  <p className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-sm font-semibold">
                    {e.name}
                  </p>
                  <p className="text-gray-400 text-sm">{e.asCharacter}</p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-gray-400 bg-gray-800 font-bold pr-5 pl-5 pt-2 pb-2 rounded-lg"
            onClick={() => setactorcount(actorcount + 10)}
          >
            နောက်ထပ်
          </p>
        </div>
        <>
          <h4 className="text-white ml-5 pl-2 mb-4 font-semibold text-lg mt-12 border-l-4 border-pink-500">
            ရုပ်ရှင်Trailer ---
          </h4>
          <div className="relative flex justify-center items-center">
            <div className="relative pt-56 max-w-700 w-full lg:h-98 lg:pt-98">
              <ReactPlayer
                url={trailar}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
              />
            </div>
          </div>
        </>
        <>
          <h4 className="text-white ml-5 mb-4 font-semibold text-lg mt-12 border-l-4 border-purple-500 pl-2">
            ရုပ်ရှင်ထုပ်လုတ်ထားသော ကုမ္ပဏီများ ---
          </h4>

          <div className="flex flex-row flex-wrap justify-start items-center ml-3">
            {modeldata.production_companies
              ?.filter((e: any) => e.logo_path !== null)
              .map((e: any) => (
                <img
                  key={e.id}
                  className="w-36 h-20 object-contain mr-1 ml-1 mt-3 pr-2 pl-2 pt-1 pb-1 bg-white rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${e.logo_path}`}
                  alt="companylogo"
                />
              ))}
          </div>
        </>
      </div>
    </div>
  );
};

export const SearchModel = ({
  setOpenTrandModel,
  modeldata1,
  translateOverview,
  fullcast,
  trailar,
}: searchprops) => {
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${movieId}?api_key=97daa3077452cbe6f793644c1afc0868&language=en-US`
  //     )
  //     .then((res) => setModelData(res.data));
  // }, [movieId]);

  const [selectLanguage, setSelectLanguage] = useState("Burmese");
  const [language, setLanguage] = useState(false);
  const [actorcount, setactorcount] = useState(10);

  const options = [
    { value: "Burmese", text: "Burmese" },
    { value: "English", text: "English" },
  ];

  useEffect(() => {
    if (selectLanguage === "English") {
      setLanguage(false);
    } else {
      setLanguage(true);
    }
  }, [selectLanguage]);

  return (
    <div className="fixed bg-black w-full h-screen left-0 top-0 overflow-y-scroll overflow-x-hidden z-20 lg:pl-10 lg:pr-10">
      <img
        className="w-full max-h-full object-cover absolute left-0 top-0 lg:hidden"
        src={`https://image.tmdb.org/t/p/w500${modeldata1.poster_path}`}
        alt="poster"
      />
      <img
        className="w-3/4 h-3/4 object-cover absolute right-0 top-0 hidden lg:block"
        src={`https://image.tmdb.org/t/p/w500${modeldata1.backdrop_path}`}
        alt="poster"
      />
      <div className="absolute left-0 bottom-0 bg-gradient-to-t from-black from-20 w-full h-full opacity-95 lg:bg-gradient-to-t lg:from-black lg:from-15 lg:opacity-30"></div>
      <div className="absolute left-0 bottom-0 bg-gradient-to-r from-black from-30 w-full h-full opacity-100 hidden lg:block"></div>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-xl rounded-sm pl-2 pr-2 font-bold absolute right-2 top-5">
        MRMl
      </h1>
      <IoIosArrowDropleftCircle
        onClick={() => setOpenTrandModel(false)}
        className={
          "absolute text-black bg-gradient-to-r from-purple-500 to-pink-500 text-3xl top-5 left-2 rounded-full"
        }
      />
      <div className="flex flex-col z-20 mt-98 pb-24 lg:mt-36">
        {/* <div className=" w-full h-98"></div> */}
        <div className="z-20 flex flex-col justify-center items-start mr-5 ml-5">
          <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-3xl font-extrabold">
            {modeldata1.original_title}
          </h4>
          <div className="flex flex-row text-gray-400 text-sm mt-5">
            <p className="mr-2">{modeldata1.release_date}</p> |{" "}
            <p className="ml-2 mr-2">{modeldata1.original_language}</p>|
            <p className="ml-2 mr-2">
              {modeldata1.genres?.slice(0, 1).map((e: any) => e.name)}
            </p>
            |
            <p className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block rounded-sm pl-2 pr-2 font-extrabold text-black ml-2">
              {modeldata1.vote_average?.toFixed(1).substring(0, 3)}
            </p>
          </div>
          <select
            className="bg-black border-2 border-white text-white rounded-md mt-4"
            placeholder="Language"
            onChange={(e) => setSelectLanguage(e.target.value)}
            value={selectLanguage}
          >
            {options.map((e) => (
              <option key={e.value}>{e.text}</option>
            ))}
          </select>

          {language ? (
            <p className="text-white mt-5 font-Nunito font-medium tracking-wider text-left leading-7 lg:max-w-md">
              {translateOverview}
            </p>
          ) : (
            <p className="text-white mt-5 font-Nunito font-medium tracking- text-left leading-7 lg:max-w-md">
              {modeldata1.overview}
            </p>
          )}

          <p className="text-white font-Nunito font-medium mt-7">
            <span className="text-gray-400 text-sm">ရုပ်ရှင်ကြာချိန် : </span>
            {modeldata1.runtime} min
          </p>
          <p className="text-white font-Nunito font-medium mt-2">
            <span className="text-gray-400 text-sm">ရုပ်ရှင်Budget : </span>
            {modeldata1.budget} dollar
          </p>
        </div>
        <h4 className="text-white ml-5 mb-4 font-semibold text-lg mt-12 border-l-4 border-purple-500 pl-2 lg:z-10 lg:mt-28">
          သရုပ်ဆောင်များ ---
        </h4>
        <div className="flex flex-col mr-1 ml-1 z-20 justify-center items-center">
          <div className="flex flex-row flex-wrap justify-center items-center lg:justify-start">
            {fullcast?.slice(0, actorcount).map((e: any) => (
              <div
                key={e.id}
                className="flex flex-row max-w-170 w-full bg-gradient-to-r from-gradientColor1 to-gradientColor2 rounded-lg mb-4 mr-1  lg:max-w-none lg:w-52 lg:mr-2 lg:ml-2"
              >
                <img
                  className="w-14 h-14 rounded-full object-cover mr-2 mt-1 mb-1  lg:w-24 lg:h-24 lg:mt-2 lg:ml-2 lg:mb-2"
                  src={e.image}
                  alt="actorImage"
                />
                <div className="flex flex-col w-28 justify-center items-start">
                  <p className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-sm font-semibold">
                    {e.name}
                  </p>
                  <p className="text-gray-400 text-sm">{e.asCharacter}</p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-gray-400 bg-gray-800 font-bold pr-5 pl-5 pt-2 pb-2 rounded-lg"
            onClick={() => setactorcount(actorcount + 10)}
          >
            နောက်ထပ်
          </p>
        </div>
        <>
          <h4 className="text-white ml-5 pl-2 mb-4 font-semibold text-lg mt-12 border-l-4 border-pink-500">
            ရုပ်ရှင်Trailer ---
          </h4>
          <div className="relative flex justify-center items-center">
            <div className="relative pt-56 max-w-700 w-full lg:h-98 lg:pt-98">
              <ReactPlayer
                url={trailar}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
              />
            </div>
          </div>
        </>
        <>
          <h4 className="text-white ml-5 mb-4 font-semibold text-lg mt-12 border-l-4 border-purple-500 pl-2">
            ရုပ်ရှင်ထုပ်လုတ်ထားသော ကုမ္ပဏီများ ---
          </h4>

          <div className="flex flex-row flex-wrap justify-start items-center ml-3">
            {modeldata1.production_companies
              ?.filter((e: any) => e.logo_path !== null)
              .map((e: any) => (
                <img
                  key={e.id}
                  className="w-36 h-20 object-contain mr-1 ml-1 mt-3 pr-2 pl-2 pt-1 pb-1 bg-white rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${e.logo_path}`}
                  alt="companylogo"
                />
              ))}
          </div>
        </>
      </div>
    </div>
  );
};
