import { searchMovie } from "../../api";
import SearchList from "./SearchList";
import { imageURL } from "../../api";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react"
import {Link, useNavigate} from "react-router";
import {useAuth} from "../../context/AuthContext.jsx";
import {UserMenu} from "./UserMenu.jsx";
import {useLocation} from "react-router-dom";
import {useToast} from "../../context/ToastContext.jsx";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const searchRef = useRef(null);
  const inputRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false);

  const [movie, setMovie] = useState("");

  const [searchList, setSearchList] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

    const handleProtectedNav = (path) => {
        if (!user) {
            navigate('/login', { state: { from: path } });
        } else {
            navigate(path);
        }
    };

    const isActive = (path) => location.pathname === path;

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

    // eslint-disable-next-line react-hooks/rules-of-hooks
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


    // eslint-disable-next-line react-hooks/rules-of-hooks
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

    if (loading) {
        return <nav>...</nav>; // atau skeleton loading, biar gak "flicker" Login->UserMenu
    }

  return (
    <div className=" bg-black font-heading">
        <div className={"w-[1200px] m-auto flex justify-between py-5 relative"}>

        <div className={""}>
            <ul className={"flex gap-8 items-center py-2"}>
                <Link to={"/"}>
                    <li className={"text-[#01BBEB] font-bold text-3xl mr-12"}>CineHub</li>
                </Link>
                <div className={"flex gap-8"}>
                    <li className={`text-white font-bold cursor-pointer ${isActive('/watchlist') ? 'border-b-2 border-[#22D3EE] text-white pb-2' : 'border-b-2 border-transparent text-white/70 hover:text-white'}`}><button onClick={() => handleProtectedNav('/watchlist')}>Watchlist</button></li>
                    <li className={`text-white font-bold cursor-pointer ${isActive('/rate') ? 'border-b-2 border-[#22D3EE] text-white pb-2' : 'border-b-2 border-transparent text-white/70 hover:text-white'}`}><button onClick={() => handleProtectedNav('/rate')}>My Rating</button></li>
                </div>
            </ul>
        </div>

        <div className={"flex"}>
            <div className={"text-white font-bold"}>
                <ul className={"flex gap-8 mr-8 items-center py-1"}>
                    {user ? (
                        <UserMenu user={user} onSettings={() => navigate("/settings")} onLogout={logout}/>
                    ) : (
                        <>
                            <Link to={"/login"} className={"border-2 border-[#445566] px-3 py-2 rounded-md cursor-pointer hover:bg-[#01BBEB]"}>Login</Link>
                            <Link to={"/register"} className={"bg-[#01BBEB] text-black px-3 py-2 rounded-md cursor-pointer hover:text-white"}>Sign up</Link>
                        </>
                    )}
                </ul>
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
            py-1
          "
                    aria-label="Search"
                ><Search color={"white"} size={30} className={"mt-2"}/></button>
            )}


            {isOpen && (
                <div
                    className="
            flex
            h-9
            w-60
            items-center
            rounded-md
            bg-white
            shadow-lg
            animate-[searchExpand_300ms_ease-out]
            mt-2
          "
                ><Search color={"white"} size={25} className={"mt-2"}
                />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search Movie"
                        className="w-[700px] text-black p-1 rounded-sm focus:outline-none focus:ring-4 focus:border-[#01BBEB]"
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
                        mr-2
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
        </div>

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
    </div>
  );
}
