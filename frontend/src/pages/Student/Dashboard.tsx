import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Briefcase, CheckCircle, Clock, LayoutDashboard, LogOut, 
  Search, Bell, MapPin, Sparkles, Building2, TrendingUp, CheckCircle2, Circle, User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for Marketplace
const availableInternships = [
  { id: 1, company: "Nalco", role: "Process Automation Intern", location: "Bhubaneswar", stipend: "₹15,000/mo", type: "On-site", recommended: true },
  { id: 2, company: "TCS", role: "Software Engineering Intern", location: "Remote", stipend: "₹20,000/mo", type: "Remote", recommended: true },
  { id: 3, company: "Amazon", role: "SDE Intern", location: "Bangalore", stipend: "₹60,000/mo", type: "Hybrid", recommended: false },
  { id: 4, company: "Google", role: "UX Research Intern", location: "Hyderabad", stipend: "₹65,000/mo", type: "On-site", recommended: false },
  { id: 5, company: "Infosys", role: "Data Analytics Intern", location: "Pune", stipend: "₹18,000/mo", type: "Hybrid", recommended: true },
  { id: 6, company: "Vedanta", role: "Metallurgy Intern", location: "Jharsuguda", stipend: "₹22,000/mo", type: "On-site", recommended: false },
  { id: 7, company: "Aditya Birla", role: "Supply Chain Intern", location: "Mumbai", stipend: "₹25,000/mo", type: "On-site", recommended: false },
  { id: 8, company: "Utkal Alumina", role: "Operations Intern", location: "Rayagada", stipend: "₹16,000/mo", type: "On-site", recommended: true },
];

// Mock Data for My Applications
const myApplications = [
  { id: 1, company: "Amazon", role: "SDE Intern", status: "Applied", date: "2026-06-01" },
  { id: 2, company: "Google", role: "Frontend Intern", status: "Rejected", date: "2026-05-15" },
  { id: 3, company: "TCS", role: "Software Engineering Intern", status: "Interviewing", date: "2026-06-05" },
  { id: 4, company: "Nalco", role: "Process Automation Intern", status: "Offered", date: "2026-05-20" },
];

// Mock Data for Active Internship
const activeInternship = {
  company: "Nalco",
  role: "Process Automation Intern",
  status: "In Progress",
  reportingTime: "09:00 AM",
  reportingLocation: "Nalco Bhavan, Bhubaneswar",
  mentor: "Dr. Naren",
  progress: 65,
  tasks: [
    { title: "Complete Safety Induction", done: true },
    { title: "Configure SCADA Network setup", done: true },
    { title: "Analyze telemetry logs", done: false },
    { title: "Present final project report", done: false }
  ]
};

const profile = {
  name: "Samay",
  roll: "CS2026098",
  branch: "Computer Science & Engineering",
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'discover' | 'applications' | 'active'>('dashboard');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col h-auto md:h-screen sticky top-0 z-40 shadow-sm">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
            <span className="text-lg font-bold text-primary-foreground">IN</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">InternTrack</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          <Button variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
          </Button>
          <Button variant={activeTab === 'discover' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('discover')}>
            <Search className="mr-3 h-5 w-5" /> Discover Internships
          </Button>
          <Button variant={activeTab === 'applications' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('applications')}>
            <Briefcase className="mr-3 h-5 w-5" /> My Applications
          </Button>
          <Button variant={activeTab === 'active' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('active')}>
            <Building2 className="mr-3 h-5 w-5" /> Active Internship
          </Button>
        </nav>
        <div className="p-4 border-t border-border mt-auto hidden md:block">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start font-medium h-11 text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut className="mr-3 h-5 w-5" /> Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 border-b border-border/50 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab === 'discover' ? 'Internship Marketplace' : activeTab.replace('-', ' ')}</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {profile.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full relative hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            </Button>
            <Avatar className="h-10 w-10 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Student" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card shadow-md border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Total Applications</p>
                      <h3 className="text-3xl font-bold">{myApplications.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                      <Briefcase className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-md border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Internships Cracked</p>
                      <h3 className="text-3xl font-bold text-green-500">{myApplications.filter(a => a.status === 'Offered').length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-md border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Active Mentorships</p>
                      <h3 className="text-3xl font-bold text-primary">1</h3>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Building2 className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center"><Sparkles className="w-5 h-5 mr-2 text-primary"/> AI Recommended For You</CardTitle>
                    <CardDescription>Based on your recent courses and skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availableInternships.filter(i => i.recommended).slice(0, 3).map(internship => (
                      <div key={internship.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setActiveTab('discover')}>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary text-xl">
                            {internship.company.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{internship.company}</h4>
                            <p className="text-sm text-muted-foreground">{internship.role}</p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">Apply</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-md bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                  <CardHeader>
                    <CardTitle>Current Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center p-6 space-y-4">
                      <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold">You're Hired!</h3>
                      <p className="text-muted-foreground">You have cracked the internship at <strong>{activeInternship.company}</strong> as a {activeInternship.role}.</p>
                      <Button className="mt-4" onClick={() => setActiveTab('active')}>View Active Internship details</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'discover' && (
            <motion.div key="discover" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableInternships.map(internship => (
                  <motion.div key={internship.id} variants={itemVariants} className="h-full">
                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50 hover:border-primary/50 relative overflow-hidden flex flex-col">
                      {internship.recommended && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center">
                          <Sparkles className="w-3 h-3 mr-1"/> Top Match
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center font-bold text-2xl text-foreground mb-4 shadow-sm">
                          {internship.company.charAt(0)}
                        </div>
                        <CardTitle>{internship.company}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground">{internship.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="space-y-2 text-sm text-muted-foreground mt-2 mb-6">
                          <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {internship.location} ({internship.type})</div>
                          <div className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Stipend: {internship.stipend}</div>
                        </div>
                        <Button className="w-full mt-auto" onClick={() => alert(`Applying to ${internship.company}...`)}>Apply Now</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div key="applications" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track the status of the internships you've applied to.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="py-4 px-4 font-medium">Company</th>
                          <th className="py-4 px-4 font-medium">Role</th>
                          <th className="py-4 px-4 font-medium">Applied Date</th>
                          <th className="py-4 px-4 font-medium">Status</th>
                          <th className="py-4 px-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myApplications.map((app) => (
                          <tr key={app.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4 font-semibold flex items-center">
                              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-foreground font-bold mr-3">{app.company.charAt(0)}</div>
                              {app.company}
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{app.role}</td>
                            <td className="py-4 px-4 text-muted-foreground">{app.date}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                                ${app.status === 'Offered' ? 'bg-green-500/20 text-green-500' :
                                  app.status === 'Rejected' ? 'bg-red-500/20 text-red-500' :
                                  app.status === 'Interviewing' ? 'bg-blue-500/20 text-blue-500' :
                                  'bg-zinc-500/20 text-zinc-500'
                                }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <Button variant="ghost" size="sm" className="h-8">View Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'active' && (
            <motion.div key="active" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-6">
              <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h2 className="text-3xl font-bold mb-2">{activeInternship.company}</h2>
                <p className="text-primary-foreground/80 text-xl">{activeInternship.role}</p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="bg-primary-foreground/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Reporting Time</p>
                    <p className="flex items-center font-semibold"><Clock className="w-4 h-4 mr-2"/> {activeInternship.reportingTime}</p>
                  </div>
                  <div className="bg-primary-foreground/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Reporting Location</p>
                    <p className="flex items-center font-semibold"><MapPin className="w-4 h-4 mr-2"/> {activeInternship.reportingLocation}</p>
                  </div>
                  <div className="bg-primary-foreground/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-xs text-primary-foreground/70 uppercase font-bold tracking-wider mb-1">Mentor</p>
                    <p className="flex items-center font-semibold"><User className="w-4 h-4 mr-2"/> {activeInternship.mentor}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>Track your internship journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm font-medium">
                      <span>Completion</span>
                      <span className="text-primary text-2xl font-bold">{activeInternship.progress}%</span>
                    </div>
                    <div className="w-full h-4 bg-secondary rounded-full overflow-hidden mb-6 shadow-inner">
                      <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${activeInternship.progress}%` }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      You have completed a significant portion of your internship. Keep maintaining your daily logs and checking in on time to ensure you receive your completion certificate.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Pending & Completed Work</CardTitle>
                    <CardDescription>Your assigned tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeInternship.tasks.map((task, i) => (
                        <div key={i} className="flex items-center p-3 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                          {task.done ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                          )}
                          <span className={`text-sm font-medium ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
