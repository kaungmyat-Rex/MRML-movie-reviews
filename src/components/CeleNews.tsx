import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SeemoreBtn } from "./Button";
import { useState } from "react";
const CeleNews = () => {
  const [celeCounter, setCeleCounter] = useState(4);
  const { data } = useQuery(["celenews"], () => {
    return axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=8b1444b75dce4b77a8945b36517ace18"
      )
      .then((res) => res.data.articles);
  });

  const CeleNewsMoreFun = (e: any) => {
    e.preventDefault();
    setCeleCounter(celeCounter + 4);
  };

  return (
    <>
      <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5 mt-5">
        ရုပ်ရှင်သရုပ်ဆောင် သတင်းများ
      </h4>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-auto">
          <div className="flex flex-wrap justify-start items-center lg:justify-center">
            {data
              ?.filter((e: any) => e.author !== null)
              .slice(0, celeCounter)
              .map((e: any, index: any) => (
                <a
                  target="_blank"
                  href={e.url}
                  key={index}
                  className="flex flex-row justify-center items-center mt-5 mb-5 lg:mr-2 lg:ml-2"
                >
                  <img
                    className="w-28 h-20 object-cover lg:w-36 lg:h-24 xl:w-52 xl:h-40"
                    src={e.urlToImage}
                    alt="celeimg"
                  />

                  <div className="max-w-sm ml-5 lg:w-60 xl:w-72">
                    <p className="text-white text-xs">{e.publishedAt}</p>
                    <h4 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent font-extrabold text-sm xl:text-base">
                      {e.title}
                    </h4>
                    <p className="text-white font-bold text-xs">
                      <span className="text-zinc-500">By </span>
                      {e.author}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
        <div className="mt-5 mb-5" onClick={(e) => CeleNewsMoreFun(e)}>
          <SeemoreBtn text={"နောက်ထပ်ရှာရန်"} />
        </div>
      </div>
    </>
  );
};

export default CeleNews;
