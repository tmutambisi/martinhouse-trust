import { useRouteError } from "react-router-dom";
import { Button } from "./ui/button";
import { AlertTriangle, RefreshCcw, Home, AlertCircle } from "lucide-react";

export function ErrorFallback() {
    const error = useRouteError() as any;

    const handleReload = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        window.location.href = "/";
    };

    // Check if it's a chunk load error
    const isChunkError =
        error?.message?.includes("Failed to fetch dynamically imported module") ||
        error?.message?.includes("Importing a module script failed");

    if (isChunkError) {
        // If it's a chunk error, try to auto-reload once
        console.warn("Dynamic module load failed. Attempting system sync...");
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-[#0d1f3c] flex items-center justify-center p-6 font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

            <div className="relative max-w-lg w-full bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">
                <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

                <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        {isChunkError ? (
                            <RefreshCcw className="w-10 h-10 text-primary animate-spin-slow" />
                        ) : (
                            <AlertTriangle className="w-10 h-10 text-primary" />
                        )}
                    </div>

                    <h1 className="text-3xl font-black text-[#0d1f3c] uppercase tracking-tighter leading-none mb-4">
                        School Portal <br />
                        <span className="text-primary italic">Sync Status</span>
                    </h1>

                    <p className="text-slate-600 font-medium text-sm leading-relaxed mb-10">
                        {isChunkError
                            ? "We're synchronizing your portal modules with the school server. Please stand by while we verify the connection."
                            : "Our portal encountered a temporary synchronization issue. This is likely due to a session update. A quick refresh will restore operational status."}
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={handleReload}
                            className="w-full py-7 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                        >
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Reset Portal Page
                        </Button>

                        <Button
                            variant="ghost"
                            onClick={handleGoHome}
                            className="w-full py-7 rounded-2xl text-slate-500 hover:text-slate-900 font-bold uppercase tracking-widest transition-all"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Return to School Home
                        </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2">
                        <AlertCircle className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">
                            Error Code: 0x{isChunkError ? 'CHUNK_LOAD_FAILED' : 'GATEWAY_ANOMALY'}
                        </span>
                    </div>
                </div>

                <div className="bg-slate-50 py-4 px-12 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <span>Martin House Portal</span>
                    <span>© 2026 Admin Services</span>
                </div>
            </div>
        </div>
    );
}
