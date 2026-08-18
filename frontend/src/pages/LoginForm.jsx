import { useState } from "react";
import { Mail, Lock, ArrowRight, Film } from "lucide-react";
import {Link, useNavigate} from "react-router";
import Notification from "./Notification.jsx";
import {useAuth} from "../context/AuthContext.jsx";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notif, setNotif] = useState({ show: false, type: "success", message: "" });
    const { login } = useAuth();
    const from = location.state?.from || '/';

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate(from, {replace: true});
            setNotif({ show: true, type: "success", message: "Berhasil Login" });
        }catch (error) {
            setNotif({ show: true, type: "error", message: error.response.data.message });
        }
        console.log({ email, password });
    };

    return (
        <div className="min-h-screen w-full bg-[#0d0f10] flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                <Notification show={notif.show} type={notif.type} message={notif.message} onClose={() => setNotif((n) => ({ ...n, show: false }))}/>

                {/* Header / Branding */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Film className="text-[#01BBEB]" size={30} strokeWidth={2.5} />
                        <h1 className="text-4xl font-extrabold text-white tracking-tight font-heading">
                            CineHub
                        </h1>
                    </div>
                    <p className="text-gray-400 text-sm font-body">
                        Your cinema-centric social platform.
                    </p>
                </div>

                {/* Card Form */}
                <div className="bg-[#161819] border border-[#232627] rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-200 mb-2 font-heading"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={18}
                                />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="director@cinelist.app"
                                    className="w-full bg-[#0d0f10] border border-[#2a2d2e] rounded-lg py-3 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#33C8EF] transition-colors font-body"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-200 font-heading"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-[#01BBEB] hover:text-[#33C8EF] transition-colors font-heading"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={18}
                                />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0d0f10] border border-[#2a2d2e] rounded-lg py-3 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#33C8EF] transition-colors font-body"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-[#01BBEB] hover:bg-[#33C8EF] text-white font-semibold py-3 rounded-lg transition-colors font-heading"
                        >
                            Login
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6 font-body">
                    Don&apos;t have an account?{" "}
                    <Link
                        to={"/register"}
                        className="text-[#33C8EF] hover:text-[#01BBEB] font-medium transition-colors"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}