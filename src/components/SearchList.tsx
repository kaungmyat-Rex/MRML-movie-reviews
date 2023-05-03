interface props {
  searchDataList: any;
}
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

import { SeemoreBtn } from "./Button";
const SearchList = ({ searchDataList }: props) => {
  const [seemore, setSeemore] = useState(5);

  const seeMoreFun = (e: any) => {
    e.preventDefault();
    setSeemore(seemore + 5);
  };

  return (
    <>
      <div className="w-full relative ">
        <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block bg-clip-text text-transparent text-lg font-extrabold pt-5 pb-5">
          ရှာတွေသော ရုပ်ရှင်များ
        </h1>
        <IoIosArrowForward className="text-pink-500 text-2xl font-bold absolute top-6 left-44" />
      </div>
      <div className="flex flex-col justify-center items-center">
        {searchDataList
          .filter((e: any) => e.image !== "")
          .slice(0, seemore)
          .map((e: any) => (
            <div
              key={e.id}
              className="max-w-sm w-full bg-gradient-to-r from-gradientColor1 to-gradientColor2 rounded-lg mt-5 relative"
            >
              <div className="flex justify-start items-center">
                <img
                  src={e.image}
                  alt="searchImg"
                  className="w-32 h-44 rounded-lg object-cover m-2"
                />

                <div className="ml-2 mr-2">
                  <h4 className="text-white text-lg font-semibold">
                    {e.title}
                  </h4>
                  <p className="text-slate-300 font-light">{e.description}</p>
                </div>
              </div>
              <span className="absolute text-slate-300 font-normal bg-zinc-800 pr-4 pl-4 pt-1 pb-2 rounded-2xl right-2 bottom-2 shadow-xl">
                ကြည့်မည်
              </span>
            </div>
          ))}

        <div className="mt-10 mb-8" onClick={(e) => seeMoreFun(e)}>
          <SeemoreBtn text={"နောက်ထပ်ရှာရန်"} />
        </div>
      </div>
    </>
  );
};

export default SearchList;
