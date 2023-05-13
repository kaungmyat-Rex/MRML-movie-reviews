import { BiSearch } from "react-icons/bi";
import { TbLoader3 } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchList from "./SearchList";

const Search = () => {
  const [searchInput, setSearchinput] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataList, setSearchDataList] = useState([]);
  const [openSearchList, setopenSearchList] = useState(false);

  useEffect(() => {
    if (searchInput === "") {
      setopenSearchList(false);
    }
  }, [searchInput]);

  const FetchSearchMovieFun = async (e: any) => {
    e.preventDefault();
    setopenSearchList(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=97daa3077452cbe6f793644c1afc0868&query=${searchInput}&include_adult=true&language=en-US&page=1`
      )
      .then((res) => {
        setLoading(false);
        setSearchDataList(res.data.results);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-5">
      <form
        onSubmit={FetchSearchMovieFun}
        className="max-w-2xl w-full relative"
      >
        <input
          type="text"
          placeholder="ရှာရန် ex - John Wick"
          onChange={(e) => setSearchinput(e.target.value)}
          value={searchInput}
          className="w-full h-14 rounded-xl bg-zinc-800 indent-16 text-lg text-slate-400 focus:outline-none focus:border-b-2 focus:border-fuchsia-500 focus:duration-150 placeholder:indent-16 placeholder:text-base placeholder:text-zinc-500"
        />
        <BiSearch className="absolute left-4 top-3 text-zinc-500 text-3xl" />
      </form>
      <div>
        {openSearchList ? (
          <div>
            {loading ? (
              // <h1 className="text-white">Loading</h1>
              <TbLoader3 className="text-pink-500 animate-spin text-5xl mt-24 mb-24" />
            ) : (
              <SearchList searchDataList={searchDataList} />
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
