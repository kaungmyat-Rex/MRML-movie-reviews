
import { useEffect, useState} from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Youtube from "react-youtube";
interface props {
  modeldata: any;
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

  console.log(trailar);

  useEffect(() => {
    if (selectLanguage === "English") {
      setLanguage(false);
    } else {
      setLanguage(true);
    }
  }, [selectLanguage]);

  return (
    <div className="fixed bg-black w-full h-screen left-0 top-0 overflow-y-scroll overflow-x-hidden">
      <img
        className="w-full max-h-full object-cover absolute left-0 top-0"
        src={`https://image.tmdb.org/t/p/w500${modeldata.poster_path}`}
        alt="poster"
      />
      <div className="absolute left-0 bottom-0 bg-gradient-to-t from-black from-20 w-full h-full opacity-95"></div>
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block text-xl rounded-sm pl-2 pr-2 font-bold absolute right-2 top-5">
        MRMl
      </h1>
      <IoIosArrowDropleftCircle
        onClick={() => setOpenTrandModel(false)}
        className={
          "absolute text-black bg-gradient-to-r from-purple-500 to-pink-500 text-3xl top-5 left-2 rounded-full"
        }
      />
      <div className="flex flex-col z-20 mt-98 pb-24">
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
            <p className="text-white mt-5 font-Nunito font-medium tracking-wider text-left leading-7">
              {translateOverview}
            </p>
          ) : (
            <p className="text-white mt-5 font-Nunito font-medium tracking- text-left leading-7">
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
        <h4 className="text-white ml-5 mb-4 font-semibold text-lg pt-12">
          သရုပ်ဆောင်များ ---
        </h4>
        <div className="flex flex-col mr-1 ml-1 z-20 justify-center items-center">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {fullcast.slice(0, actorcount).map((e: any) => (
              <div
                key={e.id}
                className="flex flex-row max-w-170 w-full bg-gradient-to-r from-gradientColor1 to-gradientColor2 rounded-lg mb-4 mr-1"
              >
                <img
                  className="w-14 h-14 rounded-full object-cover mr-2 mt-1 mb-1"
                  src={e.image}
                  alt="actorImage"
                />
                <div className="flex flex-col justify-center items-start">
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
        <div className="flex justify-center items-center">
          <Youtube
            className=""
            videoId={trailar}
            // opts={{
            //   height: "250",
            //   width: "320",
            // }}
          />
        </div>
      </div>
    </div>
  );
};
