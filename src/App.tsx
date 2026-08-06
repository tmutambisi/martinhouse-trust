import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Eagerly load critical pages for fast initial paint
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { ErrorFallback } from "./components/ErrorFallback";
import Preloader from "./components/Preloader";

// Lazy load non-critical pages for better performance
const PaymentsPage = lazy(() => import("./pages/PaymentsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ParentsPage = lazy(() => import("./pages/ParentsPage"));
const NewsArticlePage = lazy(() => import("./pages/NewsArticlePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const LeadershipPage = lazy(() => import("./pages/LeadershipPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PrimaryPage = lazy(() => import("./pages/PrimaryPage"));
const HighSchoolPage = lazy(() => import("./pages/HighSchoolPage"));

const queryClient = new QueryClient();

// Loading fallback component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

// Root layout component with providers
const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ErrorBoundary>
        <Preloader />
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

// Create router with v7 future flags to suppress warnings
const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      errorElement: <ErrorFallback />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/services", element: <ServicesPage /> },
        { path: "/payments", element: <PaymentsPage /> },
        { path: "/contact", element: <ContactPage /> },
        { path: "/feedback", element: <FeedbackPage /> },
        { path: "/faq", element: <FAQPage /> },
        { path: "/about/:section", element: <AboutPage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/about/testimonials", element: <TestimonialsPage /> },
        { path: "/parents/:section", element: <ParentsPage /> },
        { path: "/parents", element: <ParentsPage /> },
        { path: "/news/post/:slug", element: <NewsArticlePage /> },
        { path: "/news/:category", element: <NewsPage /> },
        { path: "/news", element: <NewsPage /> },
        { path: "/primary/:section", element: <PrimaryPage /> },
        { path: "/primary", element: <PrimaryPage /> },
        { path: "/highschool/:section", element: <HighSchoolPage /> },
        { path: "/highschool", element: <HighSchoolPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    } as any,
  }
);

const App = () => <RouterProvider router={router} />;

export default App;
