import { searchMovie } from "../../api";
import SearchList from "./SearchList";
import { imageURL } from "../../api";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react"
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
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [movie, setMovie] = useState("");

  const search = async (q) => {
    const query = await searchMovie(q);
    setMovie(query);
  };

  const openSearch = () => {
        setIsOpen(true);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 150);
    };

  const closeSearch = () => {
        setIsOpen(false);
        setSearchList("");
    };

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (
              searchRef.current &&
              !searchRef.current.contains(event.target)
          ) {
              closeSearch();
          }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
          document.removeEventListener(
              "mousedown",
              handleClickOutside
          );
      };
  }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                closeSearch();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

  return (
    <div className="w-[1200px] relative m-auto flex justify-end">
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}

        <div className={"text-white font-bold"}>
            <nav className={"flex"}>
                <ul className={"flex gap-8 mt-2 mr-8"}>
                    <li><a>List</a></li>
                    <li><a>Login</a></li>
                    <li><a>Register</a></li>
                </ul>
            </nav>
        </div>

        {!isOpen && (
            <button
                onClick={openSearch}
                className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-white
            transition
            duration-200
            hover:bg-white/10
          "
                aria-label="Search"
            ><Search color={"white"} size={30}/></button>
            // eslint-disable-next-line react/jsx-no-comment-textnodes
        )}


        {isOpen && (
            <div
                className="
            flex
            h-10
            w-60
            items-center
            rounded-md
            bg-white
            px-3
            shadow-lg
            animate-[searchExpand_300ms_ease-out]
          "
            ><Search color={"white"} size={25}
            />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search Movie"
                    className="w-[700px] text-black p-1 rounded-sm focus:outline-none focus:ring-4 focus:border-[#01BBEB] "
                    value={searchList}
                    onChange={({ target }) => {
                        setSearchList(target.value);
                        search(target.value);
                    }}
                />
                <button
                    onClick={closeSearch}
                    className="
                        ml-2
                        flex
                        shrink-0
                        items-center
                        justify-center
                        text-gray-500
                        transition
                        hover:text-gray-900
                        "
                        aria-label="Close search"
                >
                    <X size={20} />
                </button>
            </div>
        )}

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
