import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Key, LayoutDashboard, Apple, Smartphone } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

type Role = 'student' | 'faculty' | 'admin';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'faculty') {
      navigate('/faculty/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const roleDetails = {
    student: { title: "Student Login", placeholder: "student@college.edu" },
    faculty: { title: "Faculty Login", placeholder: "faculty@college.edu" },
    admin: { title: "Admin Login", placeholder: "admin@nalco.com" }
  };

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground relative">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>
      
      {/* Left Panel: Instructions */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center p-16 border-r bg-muted/30 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        
        <div className="max-w-lg mx-auto z-10 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-primary-foreground">IN</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">InternTrack</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-semibold tracking-tight">How to use the platform</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border shadow-sm text-primary flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-xl mb-1">1. Select Your Role</h3>
                    <p className="text-muted-foreground leading-relaxed">Choose whether you are a Student, Faculty, TPO, or Admin to access your specific portal.</p>
                 </div>
              </div>
              
              <div className="flex gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border shadow-sm text-primary flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <Key className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-xl mb-1">2. Enter Credentials</h3>
                    <p className="text-muted-foreground leading-relaxed">Use your institutional email and password to securely log in to your account. Your data is protected.</p>
                 </div>
              </div>
              
              <div className="flex gap-4 group">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border shadow-sm text-primary flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    <LayoutDashboard className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-xl mb-1">3. Track & Manage</h3>
                    <p className="text-muted-foreground leading-relaxed">Access your personalized dashboard to easily track internships, manage approvals, and view detailed reports.</p>
                 </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Official portal for NALCO internship tracking & management</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 lg:p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full border-border shadow-2xl bg-card">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="lg:hidden flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                  <span className="text-xl font-bold text-primary-foreground">IN</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Welcome back</CardTitle>
              <CardDescription className="text-base">
                Select your role to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Role Selector Pills */}
              <div className="flex flex-wrap p-1 bg-muted/50 rounded-xl mb-8 gap-1">
                {(['student', 'faculty', 'admin'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "flex-auto min-w-[70px] py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 capitalize",
                      role === r 
                        ? "bg-background shadow-sm text-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Unified Form */}
              <motion.form 
                key={role} // Re-animate when role changes
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleLogin} 
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder={roleDetails[role].placeholder} 
                    required 
                    className="bg-background h-11 transition-all focus:ring-2" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:underline transition-colors">Forgot password?</a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="bg-background h-11 transition-all focus:ring-2" 
                  />
                </div>
                <Button type="submit" className="w-full mt-6 h-12 text-base font-semibold shadow-md transition-transform hover:scale-[1.02]">
                  {roleDetails[role].title}
                </Button>
              </motion.form>
              
              <div className="relative mt-8 mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-medium">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button variant="outline" type="button" className="w-full h-12 bg-background hover:bg-muted transition-all duration-200" onClick={handleLogin}>
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </Button>
                <Button variant="outline" type="button" className="w-full h-12 bg-background hover:bg-muted transition-all duration-200" onClick={handleLogin}>
                  <Apple className="mr-2 h-5 w-5" />
                  Sign in with Apple
                </Button>
                <Button variant="outline" type="button" className="w-full h-12 bg-background hover:bg-muted transition-all duration-200" onClick={handleLogin}>
                  <Smartphone className="mr-2 h-5 w-5" />
                  Sign in with Phone
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-border p-6 bg-muted/20 rounded-b-xl">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Register here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
