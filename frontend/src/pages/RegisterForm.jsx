import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import {Link, useNavigate} from "react-router";
import Notification from "./Notification.jsx";
import axios from "axios";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [agreed, setAgreed] = useState(false);
    const [notif, setNotif] = useState({ show: false, type: "success", message: "" });
    const URL = "http://127.0.0.1:3030"
    const navigae = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${URL}/register`, {
                username: username,
                email: email,
                password: password,
            })
            navigae("/")
            setNotif({ show: true, type: "success", message: "Berhasil Login" });
        }catch (error) {
            setNotif({ show: true, type: "error", message: error.response.data.message });
        }

        console.log({ username, email, password });
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0b0c] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Spotlight background effect */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.08), transparent 70%)",
                }}
            />

            <div className="w-full max-w-md relative">
                {/* Card Form */}
                <div className="bg-[#141617] border border-[#252829] rounded-xl p-6">
                    <Notification show={notif.show} type={notif.type} message={notif.message} onClose={() => setNotif((n) => ({ ...n, show: false }))}/>
                    {/* Header / Branding */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-[#01BBEB] tracking-tight mb-1">
                            CineHub
                        </h1>
                        <h2 className="text-xl font-bold text-white mb-2">
                            Join the Club
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Create your account to start logging and reviewing films.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-semibold text-gray-200 mb-2"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={18}
                                />
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="cinephile99"
                                    className="w-full bg-[#0d0f10] border border-[#2a2d2e] rounded-lg py-3 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#33C8EF] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-200 mb-2"
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
                                    placeholder="you@example.com"
                                    className="w-full bg-[#0d0f10] border border-[#2a2d2e] rounded-lg py-3 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#33C8EF] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-200 mb-2"
                            >
                                Password
                            </label>
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
                                    className="w-full bg-[#0d0f10] border border-[#2a2d2e] rounded-lg py-3 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#33C8EF] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-2 pt-1">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded bg-[#0d0f10] border border-[#2a2d2e] accent-[#33C8EF] cursor-pointer"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-gray-300 leading-snug cursor-pointer"
                            >
                                I agree to the{" "}
                                <a href="#" className="text-[#01BBEB] hover:text-[#33C8EF]">
                                    Terms of Use
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-[#01BBEB] hover:text-[#33C8EF]">
                                    Privacy Policy
                                </a>
                                .
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!agreed}
                            className="w-full bg-[#01BBEB] hover:bg-[#33C8EF] disabled:bg-[#00718D] disabled:text-black disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg transition-colors"
                        >
                            Join CineList
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 mt-5">
                        Already have an account?{" "}
                        <Link
                            to={"/login"}
                            className="text-[#01BBEB] hover:text-[#33C8EF] font-medium transition-colors"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}