import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Briefcase, CheckCircle, Clock, FileText, Bell, LayoutDashboard, Settings, LogOut, 
  Calendar, Plus, UploadCloud, Send, MessageSquare, Sparkles, User, ShieldAlert 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Mock Data
const initialProgressData = [
  { name: 'Week 1', tasks: 4 },
  { name: 'Week 2', tasks: 7 },
  { name: 'Week 3', tasks: 5 },
  { name: 'Week 4', tasks: 9 },
  { name: 'Week 5', tasks: 12 },
];

const initialApplications = [
  {
    id: 1,
    company: "Google India",
    role: "Frontend Developer Intern",
    status: "Interviewing",
    date: "2026-05-15",
    type: "Remote",
    duration: "6 months",
    timeline: [
      { label: "Application Submitted", date: "May 15", completed: true },
      { label: "Resume Shortlisted", date: "May 20", completed: true },
      { label: "Technical Interview 1", date: "May 28", completed: true },
      { label: "HR Review", date: "June 10 (Upcoming)", completed: false },
    ],
    interview: {
      date: "June 10, 2026",
      time: "2:00 PM - 3:00 PM",
      link: "https://meet.google.com/abc-defg-hij"
    }
  },
  {
    id: 2,
    company: "Nalco Industries",
    role: "Process Automation Intern",
    status: "Offered",
    date: "2026-05-20",
    type: "On-site",
    duration: "3 months",
    timeline: [
      { label: "Application Submitted", date: "May 20", completed: true },
      { label: "Aptitude Test", date: "May 25", completed: true },
      { label: "Technical Panel Interview", date: "June 01", completed: true },
      { label: "Offer Released", date: "June 05", completed: true },
    ],
    offerLetter: "Nalco_Offer_Letter.pdf"
  },
  {
    id: 3,
    company: "Microsoft",
    role: "UI/UX Design Intern",
    status: "Applied",
    date: "2026-06-01",
    type: "Hybrid",
    duration: "3 months",
    timeline: [
      { label: "Application Submitted", date: "June 01", completed: true },
      { label: "Portfolio Review", date: "In Progress", completed: false },
    ]
  }
];

const initialLogs = [
  { id: 1, date: "2026-06-05", hours: 8, tasks: "Implemented dashboard routing and authentication screen interfaces.", challenges: "None" },
  { id: 2, date: "2026-06-04", hours: 8, tasks: "Designed user flow charts and refined Aurora shader animations.", challenges: "Performance lag in older browsers. Fixed by optimizing render loops." },
  { id: 3, date: "2026-06-03", hours: 7, tasks: "Scaffolded React application structure and configured Tailwind CSS + Shadcn UI.", challenges: "Path alias setup conflicts." }
];

const initialAttendance = [
  { date: "2026-06-05", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", hours: 8 },
  { date: "2026-06-04", checkIn: "08:55 AM", checkOut: "05:00 PM", status: "Present", hours: 8 },
  { date: "2026-06-03", checkIn: "09:05 AM", checkOut: "04:05 PM", status: "Present", hours: 7 },
  { date: "2026-06-02", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present", hours: 8 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'logs' | 'attendance' | 'settings'>('dashboard');
  
  // Dashboard states
  const [applications, setApplications] = useState(initialApplications);
  const [selectedAppIdx, setSelectedAppIdx] = useState(0);
  
  const [logs, setLogs] = useState(initialLogs);
  const [newLog, setNewLog] = useState({ date: new Date().toISOString().split('T')[0], hours: 8, tasks: '', challenges: '' });
  
  const [attendance, setAttendance] = useState(initialAttendance);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  // AI Assistant Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Hi Alex! I'm your InternTrack AI Assistant. Ask me anything about preparing for interviews, writing daily logs, or optimizing your resume." }
  ]);
  const [chatInput, setChatInput] = useState('');

  // AI Resume Analyzer State
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Profile Settings State
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@college.edu",
    roll: "CS2026098",
    branch: "Computer Science & Engineering",
    mentor: "Dr. Sarah Jenkins",
    targetHours: 240
  });

  const totalHoursLogged = logs.reduce((acc, curr) => acc + curr.hours, 0) + 120; // 120 base hours

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.tasks) return;
    const addedLog = {
      id: Date.now(),
      ...newLog
    };
    setLogs([addedLog, ...logs]);
    
    // Add to attendance log automatically
    const today = newLog.date;
    const hasAttendanceToday = attendance.some(a => a.date === today);
    if (!hasAttendanceToday) {
      setAttendance([
        {
          date: today,
          checkIn: "09:00 AM",
          checkOut: `0${9 - 8 + Number(newLog.hours)}:00 PM`,
          status: "Present",
          hours: Number(newLog.hours)
        },
        ...attendance
      ]);
    }
    setNewLog({ date: new Date().toISOString().split('T')[0], hours: 8, tasks: '', challenges: '' });
  };

  const handleCheckInOut = () => {
    if (!isCheckedIn) {
      // Checking In
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsCheckedIn(true);
      setCheckInTime(timeStr);
    } else {
      // Checking Out
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const today = now.toISOString().split('T')[0];
      
      setAttendance([
        {
          date: today,
          checkIn: checkInTime || "09:00 AM",
          checkOut: timeStr,
          status: "Present",
          hours: 8
        },
        ...attendance
      ]);
      setIsCheckedIn(false);
      setCheckInTime(null);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulated responses
    setTimeout(() => {
      let botResponse = "I can guide you on that! Feel free to ask more specific questions about NALCO internships, interview prep, or resume metrics.";
      const inputLower = userMsg.text.toLowerCase();
      if (inputLower.includes('nalco')) {
        botResponse = "NALCO process internships require understanding of Process Control Systems, Automation, Safety protocols, and Industrial Scada networks. Focus on Core Engineering & PLC/SCADA basics.";
      } else if (inputLower.includes('interview')) {
        botResponse = "For engineering technical rounds, be ready to explain your projects, database normalization, basic data structures, and system architecture. Practice mock coding on LeetCode/GeeksforGeeks.";
      } else if (inputLower.includes('resume')) {
        botResponse = "To pass ATS filters, keep headings standard (Education, Skills, Experience), use bullet points starting with action verbs, and integrate exact keywords from the job description.";
      } else if (inputLower.includes('log')) {
        botResponse = "Your daily work logs should be descriptive. Mention what you implemented, specific libraries/tools used, and how you solved challenges. Avoid single-word tasks.";
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
    }, 800);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulated Gemini AI Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        atsScore: 82,
        strengths: ["Excellent TypeScript and React experience", "Strong implementation of animations and responsive design", "Clear project formatting"],
        weaknesses: ["Missing Docker/Kubernetes keywords", "Lack of clear metrics/KPIs for previous projects (e.g. 'improved performance by X%')"],
        roadmap: [
          { skill: "Process / System Deployment", course: "Docker & Kubernetes Essentials (Udemy)" },
          { skill: "Database Optimization", course: "Advanced PostgreSQL Queries (Coursera)" }
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col h-auto md:h-screen sticky top-0 z-40">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">IN</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">InternTrack</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          <Button 
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
            className="w-auto md:w-full justify-start font-medium h-11 shrink-0"
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
          </Button>
          <Button 
            variant={activeTab === 'applications' ? 'secondary' : 'ghost'} 
            className="w-auto md:w-full justify-start font-medium h-11 shrink-0"
            onClick={() => setActiveTab('applications')}
          >
            <Briefcase className="mr-3 h-5 w-5" /> Applications
          </Button>
          <Button 
            variant={activeTab === 'logs' ? 'secondary' : 'ghost'} 
            className="w-auto md:w-full justify-start font-medium h-11 shrink-0"
            onClick={() => setActiveTab('logs')}
          >
            <FileText className="mr-3 h-5 w-5" /> Daily Logs
          </Button>
          <Button 
            variant={activeTab === 'attendance' ? 'secondary' : 'ghost'} 
            className="w-auto md:w-full justify-start font-medium h-11 shrink-0"
            onClick={() => setActiveTab('attendance')}
          >
            <Clock className="mr-3 h-5 w-5" /> Attendance
          </Button>
          <Button 
            variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
            className="w-auto md:w-full justify-start font-medium h-11 shrink-0"
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-3 h-5 w-5" /> Settings & AI
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
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab} Hub</h1>
            <p className="text-muted-foreground mt-1">Logged in as {profile.name} ({profile.roll})</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full relative hover:bg-secondary">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Student" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Tab content wrapper */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div variants={itemVariants}>
                  <Card className="bg-card shadow-sm border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Applications</CardTitle>
                      <Briefcase className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{applications.filter(a => a.status === 'Applied' || a.status === 'Interviewing').length}</div>
                      <p className="text-xs text-muted-foreground mt-1">1 upcoming interview</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="bg-card shadow-sm border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Current Internship</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold truncate">Automation Intern</div>
                      <p className="text-xs text-muted-foreground mt-1">at Nalco Industries</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-card shadow-sm border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Hours Logged</CardTitle>
                      <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{totalHoursLogged}</div>
                      <p className="text-xs text-muted-foreground mt-1">Target: {profile.targetHours} hours</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm border-primary/20 hover:shadow-md hover:shadow-primary/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-primary">AI Profile Score</CardTitle>
                      <Sparkles className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">{analysisResult?.atsScore || 85}%</div>
                      <p className="text-xs text-primary/80 mt-1">Resume matches 3 recommended roles</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <Card className="shadow-sm border-border/50 h-full hover:border-primary/20 transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Task Completion Progress</CardTitle>
                      <CardDescription>Your weekly completed internship tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={initialProgressData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} dx={-10} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* AI Recommendations */}
                <motion.div variants={itemVariants} className="h-full">
                  <Card className="shadow-sm border-border/50 flex flex-col h-full hover:border-primary/20 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Sparkles className="mr-2 text-primary h-5 w-5" />
                        AI Recommendations
                      </CardTitle>
                      <CardDescription>Based on your profile & skills</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col space-y-4">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 rounded-lg bg-secondary/50 border border-border flex flex-col hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm">Process Automation Intern</h4>
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded font-medium">95% Match</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Nalco Industries • 3 months • On-site</p>
                        <Button size="sm" className="w-full mt-auto h-8 text-xs transition-transform hover:scale-[1.02]" onClick={() => setActiveTab('applications')}>View Application</Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 rounded-lg bg-secondary/50 border border-border flex flex-col hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm">Frontend Developer</h4>
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded font-medium">92% Match</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Google India • 6 months • Remote</p>
                        <Button size="sm" className="w-full mt-auto h-8 text-xs transition-transform hover:scale-[1.02]" onClick={() => setActiveTab('applications')}>Check Timeline</Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div 
              key="applications"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left column: List of Applications */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-bold mb-2">My Applications</h3>
                {applications.map((app, index) => (
                  <motion.div
                    key={app.id}
                    onClick={() => setSelectedAppIdx(index)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedAppIdx === index 
                        ? 'bg-secondary border-primary shadow-md' 
                        : 'bg-card border-border/50 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">{app.company}</h4>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        app.status === 'Offered' ? 'bg-green-500/20 text-green-500' :
                        app.status === 'Interviewing' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-zinc-500/20 text-zinc-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{app.role}</p>
                    <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                      <span>{app.type} • {app.duration}</span>
                      <span>Applied: {app.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right column: Status details of selected application */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">{applications[selectedAppIdx].company}</CardTitle>
                        <CardDescription>{applications[selectedAppIdx].role} ({applications[selectedAppIdx].type})</CardDescription>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full font-bold ${
                        applications[selectedAppIdx].status === 'Offered' ? 'bg-green-500/20 text-green-500' :
                        applications[selectedAppIdx].status === 'Interviewing' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-zinc-500/20 text-zinc-400'
                      }`}>
                        Status: {applications[selectedAppIdx].status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Timeline */}
                    <div>
                      <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Application Timeline</h4>
                      <div className="relative border-l border-border pl-6 space-y-6 ml-2">
                        {applications[selectedAppIdx].timeline.map((step, idx) => (
                          <div key={idx} className="relative">
                            <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                              step.completed 
                                ? 'bg-primary border-primary animate-pulse' 
                                : 'bg-background border-border'
                            }`} />
                            <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                              <span className={`font-semibold text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
                              <span className="text-xs text-muted-foreground">{step.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interview Details */}
                    {applications[selectedAppIdx].interview && (
                      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                        <h4 className="font-semibold text-sm text-primary flex items-center mb-2">
                          <Calendar className="mr-2 h-4 w-4" /> Upcoming Interview
                        </h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Date:</strong> {applications[selectedAppIdx].interview?.date}</p>
                          <p><strong>Time:</strong> {applications[selectedAppIdx].interview?.time}</p>
                          <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <a href={applications[selectedAppIdx].interview?.link} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                              <Button size="sm" className="w-full">Join Meeting Link</Button>
                            </a>
                            <Button size="sm" variant="outline" className="w-full sm:w-auto">Reschedule Request</Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Offer details */}
                    {applications[selectedAppIdx].offerLetter && (
                      <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                        <h4 className="font-semibold text-sm text-green-500 flex items-center mb-2">
                          <CheckCircle className="mr-2 h-4 w-4" /> Offer Letter Released
                        </h4>
                        <p className="text-sm mb-4">Congratulations! You've received an official offer letter from this company.</p>
                        <div className="flex gap-4">
                          <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white" onClick={() => alert("Simulating Offer Acceptance... Your status has been locked as active Intern at Nalco.")}>
                            Accept Offer
                          </Button>
                          <Button size="sm" variant="outline" className="border-green-500/30 hover:bg-green-500/10">
                            Download Letter
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div 
              key="logs"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left column: Add Log form */}
              <div className="lg:col-span-1">
                <Card className="bg-card border-border/50 sticky top-24">
                  <CardHeader>
                    <CardTitle>Log Daily Work</CardTitle>
                    <CardDescription>Enter details of tasks accomplished today.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddLog} className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={newLog.date}
                          onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                          className="bg-background/50" 
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="hours">Hours Worked</Label>
                        <Input 
                          id="hours" 
                          type="number" 
                          min={1} 
                          max={16} 
                          value={newLog.hours}
                          onChange={(e) => setNewLog({ ...newLog, hours: Number(e.target.value) })}
                          className="bg-background/50" 
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="tasks">Tasks Completed</Label>
                        <textarea 
                          id="tasks" 
                          rows={4}
                          value={newLog.tasks}
                          onChange={(e) => setNewLog({ ...newLog, tasks: e.target.value })}
                          placeholder="What did you build/learn today?"
                          className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="challenges">Challenges Faced (Optional)</Label>
                        <Input 
                          id="challenges" 
                          value={newLog.challenges}
                          onChange={(e) => setNewLog({ ...newLog, challenges: e.target.value })}
                          placeholder="Bugs, deployment issues, blocker details..."
                          className="bg-background/50" 
                        />
                      </div>
                      <Button type="submit" className="w-full mt-4">
                        <Plus className="mr-2 h-4 w-4" /> Submit Work Log
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right column: Logs History */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                      <CardTitle>Work Log History</CardTitle>
                      <CardDescription>Records of your submitted daily performance</CardDescription>
                    </div>
                    <span className="text-xs bg-secondary px-3 py-1.5 rounded-full font-semibold">Total Logs: {logs.length}</span>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {logs.map((log) => (
                      <div key={log.id} className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-primary" /> {log.date}
                          </span>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">{log.hours} Hours Logged</span>
                        </div>
                        <p className="text-sm text-foreground">{log.tasks}</p>
                        {log.challenges && log.challenges !== "None" && (
                          <div className="text-xs text-red-400 bg-red-400/5 p-2 rounded border border-red-500/10 flex items-start">
                            <ShieldAlert className="mr-2 h-4 w-4 shrink-0 mt-0.5" />
                            <span><strong>Challenge:</strong> {log.challenges}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'attendance' && (
            <motion.div 
              key="attendance"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Check in / Check out portal */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card border-border/50 text-center">
                  <CardHeader>
                    <CardTitle>Attendance Punch Clock</CardTitle>
                    <CardDescription>Mark your daily entry & exit times</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center py-6">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-32 h-32 rounded-full border-4 border-primary/20 flex flex-col items-center justify-center cursor-pointer bg-primary/10 relative overflow-hidden"
                      onClick={handleCheckInOut}
                    >
                      <Clock className={`h-12 w-12 mb-1 ${isCheckedIn ? 'text-green-500 animate-pulse' : 'text-primary'}`} />
                      <span className="text-sm font-bold">{isCheckedIn ? "PUNCH OUT" : "PUNCH IN"}</span>
                    </motion.div>
                    
                    <div className="mt-6 space-y-2 w-full text-sm">
                      <div className="flex justify-between py-1 border-b border-border/30">
                        <span className="text-muted-foreground">Today's Status:</span>
                        <span className="font-semibold text-green-500">{isCheckedIn ? "Active (Checked In)" : "Checked Out"}</span>
                      </div>
                      {isCheckedIn && (
                        <div className="flex justify-between py-1 border-b border-border/30">
                          <span className="text-muted-foreground">Checked In At:</span>
                          <span className="font-semibold text-primary">{checkInTime}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress hours */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Required Hours Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Internship Progress</span>
                      <span className="font-bold">{Math.round((totalHoursLogged / profile.targetHours) * 100)}% ({totalHoursLogged} / {profile.targetHours} Hours)</span>
                    </div>
                    <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${(totalHoursLogged / profile.targetHours) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">You require {profile.targetHours - totalHoursLogged} more logged hours to complete the course certification requirements.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Attendance Table logs */}
              <div className="lg:col-span-2">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Monthly Attendance Records</CardTitle>
                    <CardDescription>Detailed clock in / clock out registry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-border/50 text-muted-foreground">
                            <th className="py-3 px-2">Date</th>
                            <th className="py-3 px-2">Punch In</th>
                            <th className="py-3 px-2">Punch Out</th>
                            <th className="py-3 px-2">Duration</th>
                            <th className="py-3 px-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendance.map((record, index) => (
                            <tr key={index} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                              <td className="py-3 px-2 font-medium">{record.date}</td>
                              <td className="py-3 px-2 text-muted-foreground">{record.checkIn}</td>
                              <td className="py-3 px-2 text-muted-foreground">{record.checkOut}</td>
                              <td className="py-3 px-2 font-semibold">{record.hours} Hours</td>
                              <td className="py-3 px-2">
                                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded font-semibold">{record.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Profile Config */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-primary" /> Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="prof-name">Full Name</Label>
                      <Input 
                        id="prof-name" 
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="bg-background/50" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prof-email">Email</Label>
                      <Input 
                        id="prof-email" 
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-background/50" 
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prof-roll">Roll Number</Label>
                      <Input id="prof-roll" value={profile.roll} disabled className="bg-background/30 opacity-70" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prof-branch">Branch</Label>
                      <Input id="prof-branch" value={profile.branch} disabled className="bg-background/30 opacity-70" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="prof-mentor">Faculty Mentor</Label>
                      <Input id="prof-mentor" value={profile.mentor} disabled className="bg-background/30 opacity-70" />
                    </div>
                    <Button className="w-full mt-4" onClick={() => alert("Profile updated successfully!")}>Save Settings</Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI Hub Section: Resume Analyzer & Chatbot */}
              <div className="lg:col-span-2 space-y-6">
                {/* Resume Analyzer */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-primary" />
                      AI Resume Analyzer
                    </CardTitle>
                    <CardDescription>Analyze your resume against ATS and get skill gap improvements.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border/80 rounded-xl p-6 flex flex-col items-center justify-center bg-secondary/20 relative">
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <UploadCloud className="h-10 w-10 text-primary mb-2" />
                      <p className="text-sm font-semibold">{resumeName || "Drop your Resume PDF here"}</p>
                      <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOCX up to 5MB</p>
                    </div>

                    {isAnalyzing && (
                      <div className="flex flex-col items-center py-4 space-y-2">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs text-primary font-medium">Gemini AI is analyzing your skills & keywords...</p>
                      </div>
                    )}

                    {analysisResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 pt-4 border-t border-border"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-sm">ATS Match Rating:</span>
                          <span className="font-bold text-lg text-green-500">{analysisResult.atsScore}%</span>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Strengths Identified</h5>
                          <ul className="text-xs space-y-1 list-disc list-inside pl-1">
                            {analysisResult.strengths.map((str: string, i: number) => (
                              <li key={i} className="text-green-400">{str}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Recommended Skill Roadmaps</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {analysisResult.roadmap.map((rm: any, i: number) => (
                              <div key={i} className="p-3 bg-secondary/50 rounded-lg border border-border text-xs">
                                <p className="font-bold text-foreground">Gap: {rm.skill}</p>
                                <p className="text-muted-foreground mt-1">Course: {rm.course}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Copilot Chatbot */}
                <Card className="bg-card border-border/50 flex flex-col h-[380px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm">
                      <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                      InternTrack AI Copilot Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between overflow-hidden">
                    {/* Chat view */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-4 text-sm scrollbar-thin">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-xl px-3 py-2 ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground font-medium rounded-tr-none' 
                              : 'bg-secondary text-foreground rounded-tl-none border border-border'
                          }`}>
                            <p className="text-xs leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Input 
                        placeholder="Ask about NALCO core questions, resume, logs..." 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="bg-background/50"
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
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
