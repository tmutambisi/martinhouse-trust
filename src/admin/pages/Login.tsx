import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/supabase-service';
import martinHouseLogo from '@/assets/martin-house-logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/martin-admin-secure');
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'Invalid credentials';
      let errorTitle = 'Login Failed';

      if (error?.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes('email not confirmed')) {
          errorMessage = 'Your email address has not been confirmed yet. Please check your inbox for a confirmation link.';
          errorTitle = 'Verification Required';
          setUnconfirmedEmail(email);
        } else if (msg.includes('invalid login credentials')) {
          errorMessage = 'The email or password you entered is incorrect. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!unconfirmedEmail) return;

    setIsResending(true);
    try {
      const { error } = await authService.resendConfirmation(unconfirmedEmail);
      if (error) throw error;

      toast({
        title: 'Email Sent',
        description: 'A new confirmation link has been sent to your email address.',
      });
      setUnconfirmedEmail(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to resend confirmation email',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center glow-effect overflow-hidden border border-slate-100 p-2 shadow-md">
            <img
              src={martinHouseLogo}
              alt="Martin House Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-wide font-heading">MARTIN HOUSE</h1>
          <p className="text-muted-foreground mt-2">School Administration Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/50 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {unconfirmedEmail && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center animate-in fade-in slide-in-from-top-2">
                <p className="text-xs text-primary mb-2">Didn't receive the email?</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResendConfirmation}
                  disabled={isResending}
                  className="h-8 text-[10px] uppercase tracking-wider font-bold"
                >
                  {isResending ? 'Sending...' : 'Resend Confirmation'}
                </Button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Authorized Admin Portal
        </p>
      </div>
    </div>
  );
}
