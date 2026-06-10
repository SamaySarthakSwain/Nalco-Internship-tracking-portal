import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { ArrowRight, CheckCircle2, User, Key, LayoutDashboard, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen text-foreground font-sans relative flex flex-col bg-background">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 fixed top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold text-primary-foreground">IN</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight">InternTrack</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-to-use" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" className="font-semibold">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="font-semibold shadow-md">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center px-6 mt-32 relative z-10 w-full overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10" />

        {/* Hero Section */}
        <motion.div 
          className="max-w-5xl mx-auto text-center pt-10 pb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8"
          >
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Internship Tracking
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Manage Internships with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Intelligent Automation</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            A centralized, intelligent platform designed for students, faculty, and placement officers to seamlessly track, manage, and analyze the entire internship lifecycle.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105 rounded-xl">
                Start Tracking Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-background/50 backdrop-blur-sm transition-all hover:scale-105 rounded-xl border-2">
                Access Dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div id="features" className="w-full max-w-6xl mx-auto py-24">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight px-2">Powerful Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to streamline the internship process.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Student Portal",
                desc: "Track applications, daily logs, and get AI-driven skill gap analysis instantly.",
                icon: <User className="w-8 h-8" />,
                color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
              },
              {
                title: "Faculty Mentorship",
                desc: "Monitor student progress, approve internship logs, and review daily attendance with ease.",
                icon: <ShieldCheck className="w-8 h-8" />,
                color: "bg-primary/10 text-primary border-primary/20"
              },
              {
                title: "Placement Analytics",
                desc: "Real-time statistics, company management, and dynamic reports for TPOs.",
                icon: <BarChart3 className="w-8 h-8" />,
                color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className={`bg-card border ${feature.color} p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className={`w-16 h-16 ${feature.color.split(' ')[0]} ${feature.color.split(' ')[1]} rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="w-full bg-muted/30 py-24 border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight px-2">How it Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get started in three simple steps.</p>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Select Your Role",
                  desc: "When you visit the login page, simply click on the tab that corresponds to your role: Student, Faculty, TPO, or Admin. This ensures you access the correct personalized dashboard.",
                  icon: <User className="w-10 h-10" />
                },
                {
                  step: "2",
                  title: "Enter Your Credentials",
                  desc: "Securely log in using your institutional email and password. Your data is protected, and our system authenticates your role instantly.",
                  icon: <Key className="w-10 h-10" />
                },
                {
                  step: "3",
                  title: "Access Your Dashboard",
                  desc: "Once logged in, you can start tracking internships, approving logs, or viewing analytics depending on your selected role. Everything is available at a glance.",
                  icon: <LayoutDashboard className="w-10 h-10" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                >
                  <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-2xl mb-6 border border-primary/20">
                      {item.step}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-card border shadow-xl flex items-center justify-center text-primary/50 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div 
          className="w-full max-w-4xl mx-auto text-center py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 px-4">Ready to simplify your workflow?</h2>
          <Link to="/register">
            <Button size="lg" className="h-14 px-10 text-lg shadow-lg hover:scale-105 transition-transform rounded-xl">
              Create an Account
            </Button>
          </Link>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-border/50 py-8 text-center bg-muted/20">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>© 2026 InternTrack | NALCO Internship tracking portal</span>
        </div>
      </footer>
    </div>
  );
}
