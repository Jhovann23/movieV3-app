import {useEffect, useRef, useState} from "react"
import { LogOut, Settings, ChevronDown } from "lucide-react"

// eslint-disable-next-line react/prop-types
export function UserMenu({ user, onSettings, onLogout }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // eslint-disable-next-line react/prop-types
    const initial = user.name?.charAt(0).toUpperCase() ?? "?";

    console.log(user)

    return (
        <div className="relative z-50" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-white/10"
            >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22D3EE] text-sm font-bold text-black">
          {initial}
        </span>
                <span className="text-sm font-semibold text-white">
                    {/* eslint-disable-next-line react/prop-types */}
          {user.username}
        </span>
                <ChevronDown
                    size={15}
                    className={`text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl bg-[#131316] py-1.5 shadow-2xl ring-1 ring-white/10">
                    <div className="px-4 py-2.5">
                        <p className="text-sm font-semibold text-white font-heading">
                            {/* eslint-disable-next-line react/prop-types */}
                            {user.username}
                        </p>
                        {/* eslint-disable-next-line react/prop-types */}
                        {user.email && <p className="mt-0.5 truncate text-xs text-white/40">{user.email}</p>}
                    </div>
                    <div className="mx-2 h-px bg-white/10" />
                    <button
                        onClick={() => {
                            setOpen(false);
                            onSettings?.();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <Settings size={16} />
                        Settings
                    </button>
                    <button
                        onClick={() => {
                            setOpen(false);
                            onLogout?.();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#F09595] transition-colors hover:bg-[#D6293D]/10"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}