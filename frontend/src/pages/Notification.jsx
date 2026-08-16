import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Notification({type = "success", message, show, onClose, autoClose = 4000,
                                          }) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        setVisible(show);
        if (show && autoClose > 0) {
            const timer = setTimeout(() => {
                setVisible(false);
                onClose?.();
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [show, autoClose, onClose]);

    if (!visible) return null;

    const isSuccess = type === "success";
    const defaultMessage = isSuccess
        ? "Login berhasil. Selamat datang kembali!"
        : "Email atau password salah. Coba lagi.";

    return (
        <div
            role="alert"
            className={`fixed top-5 right-5 z-50 flex items-start gap-3 w-full max-w-sm rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2
        ${
                isSuccess
                    ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-100"
                    : "bg-red-950/90 border-red-500/40 text-red-100"
            }`}
        >
            <div className="shrink-0 mt-0.5">
                {isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                )}
            </div>

            <div className="flex-1 text-sm leading-snug">
                <p className="font-medium">
                    {isSuccess ? "Login berhasil" : "Login gagal"}
                </p>
                <p className="opacity-80 mt-0.5">{message || defaultMessage}</p>
            </div>

            <button
                onClick={() => {
                    setVisible(false);
                    onClose?.();
                }}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Tutup notifikasi"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}