import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <AuroraBackground className="min-h-screen text-foreground font-sans relative overflow-hidden flex flex-col">
      <nav className="w-full px-6 py-4 fixed top-0 z-50 bg-background/50 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">IN</span>
            </div>
            <span className="text-xl font-bold tracking-tight">InternTrack</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">About</a>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 mt-20 relative z-10 text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            ✨ AI-Powered Internship Tracking
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Manage Internships with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Intelligent Automation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            A centralized, AI-driven platform for students, faculty, and placement officers to seamlessly track, manage, and analyze internship lifecycles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                Start Tracking Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base bg-background/50 backdrop-blur-sm transition-transform hover:scale-105">
                Access Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full text-left">
          {[
            {
              title: "Student Portal",
              desc: "Track applications, daily logs, and AI-driven skill gap analysis.",
              icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
              color: "bg-primary/10 text-primary"
            },
            {
              title: "Faculty Mentorship",
              desc: "Monitor progress, approve internships, and review daily attendance.",
              icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
              color: "bg-blue-500/10 text-blue-500"
            },
            {
              title: "Placement Analytics",
              desc: "Real-time statistics, company management, and dynamic reports.",
              icon: <><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>,
              color: "bg-purple-500/10 text-purple-500"
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="bg-background/60 backdrop-blur-lg border p-6 rounded-2xl hover:shadow-xl hover:border-primary/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.2), ease: "easeOut" }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{feature.icon}</svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </AuroraBackground>
  );
}
