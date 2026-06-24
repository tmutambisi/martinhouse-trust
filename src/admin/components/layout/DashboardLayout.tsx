import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import martinHouseLogo from '@/assets/martin-house-logo.png';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/martin-admin-secure', icon: DashboardIcon, label: 'Overview' },
  { to: '/martin-admin-secure/news', icon: NewspaperIcon, label: 'News' },
  { to: '/martin-admin-secure/users', icon: PeopleIcon, label: 'Users' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/martin-admin-secure/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Header - Eden */}
      <header className="bg-primary text-white h-16 flex items-center justify-between px-6 shadow-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center p-1">
            <img src={martinHouseLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-lg tracking-wide">Martin House Admin</span>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-white/80 hover:text-white flex items-center gap-2 transition-colors"
        >
          <span>Logout</span>
          <LogoutIcon className="w-4 h-4" />
        </button>
      </header>

      {/* Navigation Bar - Horizontal Pills */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-2 py-3 overflow-x-auto no-scrollbar">
            {navItems
              .filter((item) => {
                if (item.to === '/martin-admin-secure/users' && user?.role !== 'admin') return false;
                return true;
              })
              .map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-500")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[calc(100vh-12rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
