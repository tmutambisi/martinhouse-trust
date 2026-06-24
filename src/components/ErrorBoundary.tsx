import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { Shield, RefreshCcw, Home } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        // Check if the error is a chunk load error (common in dynamic imports)
        const isChunkError =
            error.message.includes("Failed to fetch dynamically imported module") ||
            error.message.includes("Importing a module script failed");

        if (isChunkError) {
            console.warn("Chunk load error detected. Attempting automatic reload...");
            // Add a small delay to avoid infinite reload loop if server is actually down
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleGoHome = () => {
        window.location.href = "/";
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0d1f3c] flex items-center justify-center p-6 font-sans">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

                    <div className="relative max-w-lg w-full bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">
                        {/* Top Branding Strip */}
                        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

                        <div className="p-12 text-center">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                                <Shield className="w-10 h-10 text-primary" />
                            </div>

                            <h1 className="text-3xl font-black text-[#0d1f3c] uppercase tracking-tighter leading-none mb-4">
                                School Portal <br />
                                <span className="text-primary italic">Sync Error</span>
                            </h1>

                            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-10">
                                Our school portal encountered a temporary synchronization issue. This can usually be resolved by refreshing the page.
                            </p>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={this.handleReload}
                                    className="w-full py-7 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                                >
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Refresh Portal Page
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={this.handleGoHome}
                                    className="w-full py-7 rounded-2xl text-slate-500 hover:text-slate-900 font-bold uppercase tracking-widest transition-all"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Return to Home
                                </Button>
                            </div>

                            {/* Developer Hint - Subtle */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest break-all">
                                        {this.state.error?.message}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-50 py-4 px-12 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <span>Martin House Portal</span>
                            <span>Admin Services</span>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
