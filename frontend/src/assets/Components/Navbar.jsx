import { searchMovie } from "../../api";
import SearchList from "./SearchList";
import { imageURL } from "../../api";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  // const [searchList, setSearchList] = useState("");
  // const [movie, setMovie] = useState("");

  // const search = async (q) => {
  //   const query = await searchMovie(q);
  //   setMovie(query);
  // };

  return (
    <div className="bg-black flex p-5">
      {/*<Link href="" to={"/"}>*/}
      {/*  <img src="/logo2.jpg" alt="Logo" className="h-[60px] object-cover" />*/}
      {/*</Link>*/}
      <ShowListSearch />
      {/* <div className="w-[700px] relative m-auto">
        <input
          type="text"
          placeholder="Search Movie"
          className="w-[700px] text-black p-1 rounded-sm focus:outline-none focus:ring-4 focus:border-[#01BBEB]"
          value={searchList}
          onChange={({ target }) => {
            setSearchList(target.value);
            search(target.value);
          }}
        />
        <ul className="bg-[#313131] mt-2 absolute z-20 w-full rounded-lg  ">
          {
            
          }
          {movie.length > 0
            ? movie.map((e) => {
                return (
                  <SearchList
                    key={e.id}
                    title={e.title}
                    release={e.release_date}
                    poster={`${imageURL}/${e.poster_path}`}
                  />
                );
              })
            : ""}
        </ul>
      </div> */}
    </div>
  );
}

function ShowListSearch() {
  const [searchList, setSearchList] = useState("");
  const [movie, setMovie] = useState("");

  const search = async (q) => {
    const query = await searchMovie(q);
    setMovie(query);
  };

  return (
    <div className="w-[700px] relative m-auto flex ">
      <input
        type="text"
        placeholder="Search Movie"
        className="w-[700px] text-black p-1 rounded-sm focus:outline-none focus:ring-4 focus:border-[#01BBEB] "
        value={searchList}
        onChange={({ target }) => {
          setSearchList(target.value);
          search(target.value);
        }}
      />
      <button className="bg-white ml-4 pl-3 pr-3 font-semibold rounded-xl hover:bg-[#121212] hover:text-white" onClick={() => {
        setSearchList("")
        setMovie([])
      }}>X</button>
      <ul className="bg-black mt-[50px] absolute z-20 w-full rounded-lg " onClick={() => { 
        setMovie([])
        setSearchList("")
      }}>
        {movie.length > 0
          ? movie.map((e) => {
            const overview = e.overview.slice(0, 200) + ' ...'
              return (
                <SearchList
                  key={e.id}
                  title={e.title}
                  release={e.release_date}
                  poster={`${imageURL}/${e.poster_path}`}
                  overview={overview}
                  id={e.id}
                />
              );
            })
          : ""}
      </ul>
    </div>
  );
}
