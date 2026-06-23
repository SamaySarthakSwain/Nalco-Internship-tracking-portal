import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, Briefcase, BarChart, LogOut, Bell, CheckCircle2, Circle, TrendingUp, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Mock Data
const mentees = [
  { id: 1, name: "Samay", roll: "CS2026098", status: "Active Internship" },
  { id: 2, name: "Somit", roll: "CS2026102", status: "Applying" },
  { id: 3, name: "Slok", roll: "CS2026045", status: "Active Internship" },
];

const applications = [
  { id: 1, student: "Samay", company: "Nalco", role: "Process Automation Intern", status: "Offered", date: "2026-05-20" },
  { id: 2, student: "Somit", company: "TCS", role: "Software Engineering Intern", status: "Interviewing", date: "2026-06-05" },
  { id: 3, student: "Somit", company: "Amazon", role: "SDE Intern", status: "Applied", date: "2026-06-01" },
  { id: 4, student: "Slok", company: "Infosys", role: "Data Analytics Intern", status: "Offered", date: "2026-05-10" },
];

const progressData = [
  { 
    id: 1, student: "Samay", company: "Nalco", role: "Process Automation Intern", progress: 65,
    tasks: [
      { title: "Complete Safety Induction", done: true },
      { title: "Configure SCADA Network setup", done: true },
      { title: "Analyze telemetry logs", done: false },
      { title: "Present final project report", done: false }
    ],
    skills: [
      { subject: 'React/UI', A: 85, fullMark: 100 },
      { subject: 'Backend', A: 65, fullMark: 100 },
      { subject: 'Data Analysis', A: 90, fullMark: 100 },
      { subject: 'Problem Solving', A: 80, fullMark: 100 },
      { subject: 'Communication', A: 75, fullMark: 100 },
    ],
    weeklyPerformance: [
      { week: 'Week 1', tasksCompleted: 5 },
      { week: 'Week 2', tasksCompleted: 8 },
      { week: 'Week 3', tasksCompleted: 6 },
      { week: 'Week 4', tasksCompleted: 9 },
    ]
  },
  { 
    id: 3, student: "Slok", company: "Infosys", role: "Data Analytics Intern", progress: 90,
    tasks: [
      { title: "ETL Pipeline setup", done: true },
      { title: "Data cleaning models", done: true },
      { title: "Dashboard visualization", done: true },
      { title: "Final code handover", done: false }
    ],
    skills: [
      { subject: 'React/UI', A: 60, fullMark: 100 },
      { subject: 'Backend', A: 80, fullMark: 100 },
      { subject: 'Data Analysis', A: 95, fullMark: 100 },
      { subject: 'Problem Solving', A: 85, fullMark: 100 },
      { subject: 'Communication', A: 80, fullMark: 100 },
    ],
    weeklyPerformance: [
      { week: 'Week 1', tasksCompleted: 7 },
      { week: 'Week 2', tasksCompleted: 10 },
      { week: 'Week 3', tasksCompleted: 12 },
      { week: 'Week 4', tasksCompleted: 11 },
    ]
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/50 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name || 'Score'}:</span>
            <span className="font-bold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'progress'>('overview');
  const [selectedStudentId, setSelectedStudentId] = useState<number>(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const selectedStudentProgress = progressData.find(p => p.id === selectedStudentId);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground font-sans">
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col h-auto md:h-screen sticky top-0 z-40 shadow-sm">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
            <span className="text-lg font-bold text-white">IN</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">InternTrack</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
          <Button variant={activeTab === 'overview' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('overview')}>
            <Users className="mr-3 h-5 w-5" /> Overview
          </Button>
          <Button variant={activeTab === 'applications' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('applications')}>
            <Briefcase className="mr-3 h-5 w-5" /> Student Applications
          </Button>
          <Button variant={activeTab === 'progress' ? 'secondary' : 'ghost'} className="w-auto md:w-full justify-start font-medium h-11 shrink-0" onClick={() => setActiveTab('progress')}>
            <BarChart className="mr-3 h-5 w-5" /> Progress Monitor
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

      <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
        <header className="flex justify-between items-center mb-8 border-b border-border/50 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight capitalize">Faculty {activeTab.replace('-', ' ')}</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Dr. Naren</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="rounded-full relative hover:bg-secondary">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 border-2 border-blue-600 cursor-pointer">
              <AvatarFallback className="bg-blue-600 text-white font-bold">SJ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card shadow-md border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Mentees</p>
                      <h3 className="text-3xl font-bold">{mentees.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                      <Users className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-md border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Total Applications</p>
                      <h3 className="text-3xl font-bold">{applications.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500">
                      <Briefcase className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-md border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Active Internships</p>
                      <h3 className="text-3xl font-bold text-green-500">{progressData.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>My Mentees</CardTitle>
                  <CardDescription>Students currently assigned to you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentees.map(mentee => (
                      <div key={mentee.id} className="flex items-center justify-between p-4 border rounded-xl bg-card">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{mentee.name}</h4>
                            <p className="text-sm text-muted-foreground">{mentee.roll}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${mentee.status === 'Active Internship' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                          {mentee.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div key="applications" variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Student Applications</CardTitle>
                  <CardDescription>Review the internship applications submitted by your mentees.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="py-4 px-4 font-medium">Student Name</th>
                          <th className="py-4 px-4 font-medium">Company</th>
                          <th className="py-4 px-4 font-medium">Role</th>
                          <th className="py-4 px-4 font-medium">Applied Date</th>
                          <th className="py-4 px-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr key={app.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4 font-semibold">{app.student}</td>
                            <td className="py-4 px-4 font-semibold flex items-center">
                              <div className="w-6 h-6 bg-secondary rounded flex items-center justify-center text-foreground font-bold mr-2 text-xs">{app.company.charAt(0)}</div>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div key="progress" variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Student Selector Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-bold mb-2">Select Student</h3>
                {progressData.map((data) => (
                  <div
                    key={data.id}
                    onClick={() => setSelectedStudentId(data.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedStudentId === data.id 
                        ? 'bg-secondary border-primary shadow-md' 
                        : 'bg-card border-border/50 hover:border-primary/30'
                    }`}
                  >
                    <h4 className="font-bold">{data.student}</h4>
                    <p className="text-sm font-medium text-muted-foreground">{data.company} - {data.role}</p>
                    <div className="mt-3 w-full bg-background rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${data.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedStudentProgress && (
                <div className="lg:col-span-3 space-y-6">
                  {/* Header Card */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{selectedStudentProgress.student}'s Progress</span>
                        <span className="text-primary text-2xl font-extrabold">{selectedStudentProgress.progress}%</span>
                      </CardTitle>
                      <CardDescription>{selectedStudentProgress.company} - {selectedStudentProgress.role}</CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Analytics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Radar Chart (Skill Gap Analysis) */}
                    <Card className="shadow-md border-border/50">
                      <CardHeader className="pb-0">
                        <CardTitle className="text-lg">Skill Gap Analysis</CardTitle>
                        <CardDescription>Current proficiency vs requirements</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px] w-full mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={selectedStudentProgress.skills}>
                              <PolarGrid stroke="hsl(var(--border))" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar name="Proficiency" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                              <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Bar Chart (Weekly Performance) */}
                    <Card className="shadow-md border-border/50">
                      <CardHeader className="pb-0">
                        <CardTitle className="text-lg">Weekly Performance</CardTitle>
                        <CardDescription>Tasks completed per week</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px] w-full mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={selectedStudentProgress.weeklyPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} axisLine={false} tickLine={false} />
                              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<CustomTooltip />} />
                              <Bar dataKey="tasksCompleted" name="Tasks" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Task List */}
                  <Card className="shadow-md">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Task Tracking</h4>
                        {selectedStudentProgress.tasks.map((task, i) => (
                          <div key={i} className="flex items-center p-3 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                            {task.done ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                            )}
                            <span className={`text-sm font-medium ${task.done ? 'text-muted-foreground line-through decoration-muted-foreground/50' : 'text-foreground'}`}>
                              {task.title}
                            </span>
                          </div>
                        ))}

                        {selectedStudentProgress.progress < 70 && (
                          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start text-amber-600 dark:text-amber-400">
                            <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <strong>Action Recommended:</strong> Student is behind schedule on pending tasks. Consider scheduling a quick check-in meeting to review their blockers.
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
