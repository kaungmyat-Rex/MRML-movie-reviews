import { BiSearch } from "react-icons/bi";
import { TbLoader3 } from "react-icons/tb";
import { useState, useEffect } from "react";

import axios from "axios";
import SearchList from "./SearchList";

interface props {
  openTrandModel: boolean;
  setOpenTrandModel: (openTrandModel: boolean) => void;
  openSearchList: boolean;
  setopenSearchList: (openSearchList: boolean) => void;
  searchType: string;
  setSearchType: (searchType: string) => void;
}

const Search = ({
  openTrandModel,
  setOpenTrandModel,
  openSearchList,
  setopenSearchList,
  searchType,
  setSearchType,
}: props) => {
  const [searchInput, setSearchinput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataList, setSearchDataList] = useState<any[]>([]);

  useEffect(() => {
    if (searchInput === "") {
      setopenSearchList(false);
    }
  }, [searchInput]);

  const FetchSearchMovieFun = async (e: React.FormEvent) => {
    e.preventDefault();
    setopenSearchList(true);

    await axios
      .get(
        `https://api.themoviedb.org/3/search/${searchType}?api_key=97daa3077452cbe6f793644c1afc0868&query=${searchInput}&include_adult=true&language=en-US&page=1`
      )
      .then((res) => {
        setLoading(false);
        setSearchDataList(res.data.results);
        console.log(res.data.results);
      });
  };

  // const FetchSearchMovieFun = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setopenSearchList(true);

  //   await axios
  //     .get(
  //       `https://api.themoviedb.org/3/search/${searchType}?api_key=97daa3077452cbe6f793644c1afc0868&query=${searchInput}&include_adult=true&language=en-US&page=1`
  //     )
  //     .then((res) => {
  //       setLoading(false);
  //       setSearchDataList(res.data.results);
  //     });
  // };

  return (
    <div className="flex flex-col justify-center items-center pt-5">
      <form
        onSubmit={(e) => FetchSearchMovieFun(e)}
        className="max-w-2xl w-full relative lg:max-w-4xl"
      >
        <input
          type="text"
          placeholder="ရှာရန် ex - John Wick"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchinput(e.target.value)
          }
          value={searchInput}
          className="w-full h-14 rounded-xl bg-zinc-800 indent-16 text-lg text-slate-400 focus:outline-none focus:border-b-2 focus:border-fuchsia-500 focus:duration-150 placeholder:indent-16 placeholder:text-base placeholder:text-zinc-500 lg:bg-white"
        />
        <BiSearch className="absolute left-4 top-3 text-zinc-500 text-3xl" />
        <select
          className={`${
            openSearchList ? "hidden" : "block"
          } bg-gradient-to-r from-purple-500 to-pink-500 h-full font-bold text-lg text-white pl-3 pr-3 rounded-r-xl absolute right-0 top-0`}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="movie">ရုပ်ရှင်</option>
          <option value="tv">စီးရီး</option>
        </select>
      </form>
      <div>
        {openSearchList ? (
          <div>
            {loading ? (
              // <h1 className="text-white">Loading</h1>
              <TbLoader3 className="text-pink-500 animate-spin text-5xl mt-24 mb-24" />
            ) : (
              <SearchList
                searchDataList={searchDataList}
                openTrandModel={openTrandModel}
                setOpenTrandModel={setOpenTrandModel}
                searchType={searchType}
              />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
