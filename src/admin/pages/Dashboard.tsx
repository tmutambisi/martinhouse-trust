import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardService, alertsService, incidentsService } from '@/lib/supabase-service';
import { StatCard } from '@/components/ui/StatCard';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import PeopleIcon from '@mui/icons-material/People';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ChatIcon from '@mui/icons-material/Chat';
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns';
import { DashboardStats, Alert, Incident } from '@/lib/supabase';

// Helper to ensure we have valid dates
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'Unknown date';
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch (e) {
    return 'Invalid date';
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    published_news: 0,
    active_alerts: 0,
    active_offers: 0,
    open_incidents: 0,
    unread_messages: 0,
    pending_comments: 0
  });

  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        try {
          const statsData = await dashboardService.getStats();
          setStats(statsData);
        } catch (error) {
          console.error('Failed to fetch stats:', error);
        }

        // Fetch recent alerts
        try {
          const alertsRes = await alertsService.getAll();
          if (alertsRes.data) {
            setRecentAlerts((alertsRes.data as Alert[]).slice(0, 5));
          }
        } catch (error) {
          console.error('Failed to fetch alerts:', error);
        }

        // Fetch recent incidents
        try {
          const incidentsRes = await incidentsService.getAll();
          if (incidentsRes.data) {
            setRecentIncidents((incidentsRes.data as Incident[]).slice(0, 5));
          }
        } catch (error) {
          console.error('Failed to fetch incidents:', error);
        }

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <CircularProgress size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1a3a6b] shadow-xl text-white p-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center border border-white/20 shadow-2xl shrink-0">
            <TrendingUpIcon className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold font-heading mb-3 tracking-tight text-white">Welcome to Martin House Portal</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">Your central hub for managing academic announcements, portal users, admissions enquiries, and news posts.</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.total_users} icon={PeopleIcon} color="primary" />
        <StatCard title="Published News" value={stats.published_news} icon={NewspaperIcon} color="secondary" />
        <StatCard title="Active Announcements" value={stats.active_alerts} icon={WarningAmberIcon} color="primary" />
        <StatCard title="Active Programmes" value={stats.active_offers} icon={LocalOfferIcon} color="secondary" />
        <StatCard title="Open Campus Reports" value={stats.open_incidents} icon={AssignmentLateIcon} color="primary" />
        <StatCard title="Unread Messages" value={stats.unread_messages} icon={QuestionAnswerIcon} color="secondary" />
        <StatCard title="Pending Comments" value={stats.pending_comments} icon={ChatIcon} color="primary" />
      </div>


    </div>
  );
}
