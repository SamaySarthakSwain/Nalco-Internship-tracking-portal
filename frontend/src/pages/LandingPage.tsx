import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { ArrowRight, CheckCircle2, User, Key, LayoutDashboard, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GlowCard } from '@/components/ui/glow-card';
import { HoverButton } from '@/components/ui/hover-button';
import { ImageGeneration } from '@/components/ui/image-generation';
import { ScrollGlobe } from '@/components/ui/scroll-globe';

export default function LandingPage() {
  const navigate = useNavigate();
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

  const demoSections = [
    {
      id: "global-reach",
      badge: "Scale",
      title: "Global Reach",
      subtitle: "Connect Everywhere",
      description: "Our platform breaks geographical boundaries, allowing students and faculty to connect seamlessly across different campuses and organizations worldwide.",
      align: "left" as const,
      actions: [
        { label: "Join the Network", variant: "primary" as const, onClick: () => navigate("/register") },
      ]
    },
    {
      id: "innovation",
      badge: "Innovation",
      title: "AI-Powered",
      subtitle: "Analytics",
      description: "Harness the power of AI to analyze skill gaps, predict internship success rates, and recommend the best candidates for the right opportunities.",
      align: "center" as const,
    },
    {
      id: "future",
      badge: "Future",
      title: "Your Future",
      subtitle: "Starts Here",
      description: "Take control of your career trajectory with our comprehensive tracking tools and real-time feedback loops from industry mentors.",
      align: "right" as const,
    }
  ];

  return (
    <div className="min-h-screen text-foreground font-sans relative flex flex-col bg-background">
      {/* Aurora Background for Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
        <AuroraBackground />
      </div>

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
            <a href="#globe-section" className="text-muted-foreground hover:text-foreground transition-colors">Global Impact</a>
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

      <main className="flex-1 flex flex-col items-center relative z-10 w-full overflow-hidden pt-32">
        
        {/* Hero Section */}
        <motion.div 
          className="max-w-5xl mx-auto text-center pt-10 pb-20 px-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center rounded-full border border-primary/20 bg-background/50 backdrop-blur-md px-3 py-1 text-sm font-medium text-primary mb-8"
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
            <HoverButton onClick={() => navigate('/register')} className="w-full sm:w-auto h-14 !px-8 text-lg font-semibold shadow-xl shadow-primary/20 transition-all">
              <span className="flex items-center">
                Start Tracking Now <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </HoverButton>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-14 px-8 text-lg font-semibold bg-background/50 backdrop-blur-sm transition-all hover:scale-105 rounded-xl border-2">
                Access Dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div id="features" className="w-full max-w-6xl mx-auto py-24 px-6 relative z-10 bg-background/80 backdrop-blur-md rounded-t-[3rem]">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
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
                color: "text-blue-500",
                bg: "bg-blue-500/10"
              },
              {
                title: "Faculty Mentorship",
                desc: "Monitor student progress, approve internship logs, and review daily attendance with ease.",
                icon: <ShieldCheck className="w-8 h-8" />,
                color: "text-primary",
                bg: "bg-primary/10"
              },
              {
                title: "Placement Analytics",
                desc: "Real-time statistics, company management, and dynamic reports for TPOs.",
                icon: <BarChart3 className="w-8 h-8" />,
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="w-full flex justify-center">
                <GlowCard customSize className="w-full max-w-[350px] min-h-[300px] border border-border/50 bg-card/60">
                  <div className="flex flex-col h-full items-start p-2">
                    <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{feature.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* How to Use Section with Image Generation Demo */}
        <div id="how-to-use" className="w-full bg-muted/30 py-24 border-y border-border/50 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight px-2">How it Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get started in three simple steps, powered by intelligent analytics.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-12">
                {[
                  {
                    step: "1",
                    title: "Select Your Role",
                    desc: "Student, Faculty, TPO, or Admin.",
                    icon: <User className="w-8 h-8" />
                  },
                  {
                    step: "2",
                    title: "Enter Credentials",
                    desc: "Secure login with role-based access.",
                    icon: <Key className="w-8 h-8" />
                  },
                  {
                    step: "3",
                    title: "Access Dashboard",
                    desc: "Track progress and view analytics.",
                    icon: <LayoutDashboard className="w-8 h-8" />
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xl flex-shrink-0 border border-primary/20 shadow-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex-1 w-full max-w-md flex justify-center lg:justify-end">
                <ImageGeneration>
                  <div className="p-6 bg-card flex flex-col gap-4 w-full h-[300px] justify-center items-center text-center">
                     <BarChart3 className="w-16 h-16 text-primary mb-4" />
                     <h4 className="text-lg font-bold">Skill Gap Analysis Ready</h4>
                     <p className="text-sm text-muted-foreground">Your recent log entries show a 20% improvement in React Native development skills over the last week.</p>
                     <Button variant="outline" size="sm" className="mt-2">View Full Report</Button>
                  </div>
                </ImageGeneration>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Globe Section */}
        <div id="globe-section" className="w-full relative z-10 bg-background">
          <ScrollGlobe sections={demoSections} />
        </div>

        {/* Footer CTA */}
        <motion.div 
          className="w-full max-w-4xl mx-auto text-center py-24 relative z-10 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 px-4">Ready to simplify your workflow?</h2>
          <HoverButton onClick={() => navigate('/register')} className="h-14 !px-10 text-lg shadow-lg">
             Create an Account
          </HoverButton>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-border/50 py-8 text-center bg-muted/20 relative z-10">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>© 2026 InternTrack | NALCO Internship tracking portal</span>
        </div>
      </footer>
    </div>
  );
}
