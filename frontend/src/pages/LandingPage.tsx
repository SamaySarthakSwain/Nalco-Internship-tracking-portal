import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { ArrowRight, CheckCircle2, User, ShieldCheck, BarChart3, ChevronRight, Play } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GlowCard } from '@/components/ui/glow-card';
import { LiveAgentMotion } from '@/components/ui/live-agent-motion';
import { ImageGeneration } from '@/components/ui/image-generation';
import { ScrollGlobe } from '@/components/ui/scroll-globe';

export default function LandingPage() {
  const navigate = useNavigate();
  const fadeInUp: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <div className="min-h-screen text-foreground font-sans relative flex flex-col bg-background selection:bg-primary/30 selection:text-primary-foreground">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-20 mix-blend-screen">
        <AuroraBackground />
      </div>

      {/* Floating Noise Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 noise-bg mix-blend-overlay"></div>

      {/* Navbar */}
      <nav className="w-full px-6 py-4 fixed top-0 z-50 bg-background/50 backdrop-blur-2xl border-b border-border/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all group-hover:scale-105">
              <span className="text-lg font-black text-white">IN</span>
            </div>
            <span className="text-2xl font-black tracking-tighter">InternTrack</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest font-semibold">Features</a>
            <a href="#ai-agent" className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest font-semibold">AI Agent</a>
            <a href="#globe-section" className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest font-semibold">Global</a>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" className="font-semibold tracking-wide">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="font-semibold shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-full px-6 transition-all hover:scale-105">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center relative z-10 w-full overflow-hidden pt-32">
        
        {/* Hero Section */}
        <motion.div 
          className="max-w-7xl mx-auto w-full pt-16 pb-32 px-6 flex flex-col lg:flex-row items-center gap-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Text */}
          <div className="flex-1 text-left flex flex-col items-start">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-primary mb-6 uppercase tracking-widest shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)]"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-3"></span>
              Platform 2.0 is Live
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter mb-6 leading-[1.05]">
              Accelerate with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-500 animate-gradient-x">Intelligent</span> Agents
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted-foreground/80 mb-10 max-w-xl font-medium leading-relaxed">
              InternTrack is a next-generation platform for students, faculty, and placement officers to seamlessly manage the internship lifecycle using advanced AI automation.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button onClick={() => navigate('/register')} size="lg" className="h-14 px-8 text-base font-bold shadow-[0_0_40px_-10px_rgba(var(--primary),0.6)] hover:shadow-[0_0_60px_-10px_rgba(var(--primary),0.8)] transition-all rounded-xl w-full sm:w-auto group">
                Start Tracking Now <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('ai-agent')?.scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-base font-bold bg-background/50 backdrop-blur-sm transition-all hover:bg-accent rounded-xl border-border/50 w-full sm:w-auto">
                <Play className="w-4 h-4 mr-2" /> Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Right Live Motion */}
          <motion.div 
            variants={fadeInUp}
            className="flex-1 w-full flex justify-center lg:justify-end relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <LiveAgentMotion />
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div id="features" className="w-full max-w-7xl mx-auto py-32 px-6 relative z-10 border-t border-border/40">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">All-in-one <span className="text-primary">Ecosystem</span></h2>
              <p className="text-muted-foreground text-xl max-w-xl font-medium">Simplify, accelerate, and transform the placement process with one connected AI platform.</p>
            </div>
            <Button variant="ghost" className="font-bold uppercase tracking-widest text-xs h-12">View All Features <ArrowRight className="ml-2 w-4 h-4"/></Button>
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
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                borderColor: "border-blue-500/20"
              },
              {
                title: "Faculty Mentorship",
                desc: "Monitor student progress, approve internship logs, and review daily attendance with ease.",
                icon: <ShieldCheck className="w-8 h-8" />,
                color: "text-primary",
                bg: "bg-primary/10",
                borderColor: "border-primary/20"
              },
              {
                title: "Placement Analytics",
                desc: "Real-time statistics, company management, and dynamic reports for TPOs.",
                icon: <BarChart3 className="w-8 h-8" />,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
                borderColor: "border-purple-500/20"
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="w-full">
                <GlowCard customSize className={`w-full min-h-[350px] border ${feature.borderColor} bg-[#0a0a0e]/60 backdrop-blur-md`}>
                  <div className="flex flex-col h-full items-start p-4">
                    <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed flex-1">{feature.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* AI Agent Demo Section */}
        <div id="ai-agent" className="w-full bg-[#050508] py-32 border-y border-border/40 relative z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-transparent blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="inline-flex items-center rounded-full border border-border/50 bg-card/50 px-3 py-1 text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest">
                Steps to use
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">3 Steps to Kickstart</h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">From setup to measurable success made effortless with AI automation.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-12">
                {[
                  {
                    step: "01",
                    title: "Select Your Role",
                    desc: "Choose between Student, Faculty, TPO, or Admin and get a customized dashboard tailored to your workflow.",
                  },
                  {
                    step: "02",
                    title: "Activate AI Assistant",
                    desc: "Let the AI agent scan your profile, logs, or metrics to provide actionable insights immediately.",
                  },
                  {
                    step: "03",
                    title: "Automate Progress",
                    desc: "Sit back as the system handles routine approvals, notifications, and analytics generation automatically.",
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-6 group"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                  >
                    <div className="font-mono text-3xl font-black text-primary/40 group-hover:text-primary transition-colors mt-1">
                      {item.step}.
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground font-medium leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex-1 w-full flex justify-center lg:justify-end">
                <ImageGeneration>
                  <div className="p-8 bg-[#0a0a0e] border border-border/50 flex flex-col gap-6 w-full h-[400px] justify-center items-center text-center rounded-2xl relative overflow-hidden shadow-2xl">
                     <div className="absolute inset-0 bg-grid-pattern opacity-5 mix-blend-overlay"></div>
                     <BarChart3 className="w-20 h-20 text-primary mb-2 drop-shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                     <h4 className="text-2xl font-black tracking-tight">AI Skill Analysis</h4>
                     <p className="text-base text-muted-foreground font-medium px-4">Your recent log entries show a 20% improvement in React Native development skills over the last week.</p>
                     <Button variant="default" className="mt-4 font-bold shadow-[0_0_20px_rgba(var(--primary),0.4)]">View Full Report</Button>
                  </div>
                </ImageGeneration>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Globe Section */}
        <div id="globe-section" className="w-full relative z-10 bg-background pt-20">
          <div className="text-center max-w-4xl mx-auto px-6 mb-10">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Connections</span></h2>
          </div>
          <ScrollGlobe sections={demoSections} />
        </div>

        {/* Footer CTA */}
        <motion.div 
          className="w-full max-w-5xl mx-auto text-center py-40 px-6 relative z-10 bg-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none rounded-t-[100px] blur-3xl"></div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight relative z-10">
            Step Into The Future <br /> of Internship Tracking
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-medium max-w-2xl mx-auto relative z-10">Everything your institution needs, in one powerful workspace. Stay focused, stay in sync.</p>
          <Button onClick={() => navigate('/register')} size="lg" className="h-16 px-12 text-lg font-black shadow-[0_0_50px_rgba(var(--primary),0.6)] hover:shadow-[0_0_80px_rgba(var(--primary),0.8)] transition-all rounded-full relative z-10 hover:scale-105">
             Get Started Now
          </Button>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-border/40 py-12 text-center bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-black text-white">IN</span>
            </div>
            <span className="font-bold tracking-tight">InternTrack</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>© 2026 InternTrack | All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
