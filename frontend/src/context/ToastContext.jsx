import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback(
        (message, type = "success", duration = 3500) => {
            const id = crypto.randomUUID();
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => removeToast(id), duration);
        },
        [removeToast]
    );

    const toast = {
        success: (message) => addToast(message, "success"),
        error: (message) => addToast(message, "error"),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast harus dipakai di dalam <ToastProvider>");
    return ctx;
}

function ToastContainer({ toasts, onDismiss }) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed right-4 top-4 z-[100] flex w-80 flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`flex items-start gap-3 rounded-xl border-l-4 bg-[#131316] p-3.5 shadow-2xl ring-1 ring-white/10 animate-[toast-in_0.2s_ease-out] ${
                        t.type === "success" ? "border-l-[#22C55E]" : "border-l-[#D6293D]"
                    }`}
                >
                    {t.type === "success" ? (
                        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-[#22C55E]" />
                    ) : (
                        <XCircle size={18} className="mt-0.5 flex-shrink-0 text-[#D6293D]" />
                    )}
                    <p className="flex-1 text-sm text-white/90">{t.message}</p>
                    <button
                        onClick={() => onDismiss(t.id)}
                        className="flex-shrink-0 text-white/30 hover:text-white"
                        aria-label="Tutup notifikasi"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
            <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
        </div>
    );
}