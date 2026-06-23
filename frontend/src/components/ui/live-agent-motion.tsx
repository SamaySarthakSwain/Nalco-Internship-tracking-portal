import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Database, Network, Server, Zap, CheckCircle2 } from 'lucide-react';

const agentSteps = [
  { id: 1, text: "Initializing AI Agent...", icon: <Cpu className="w-4 h-4 text-primary" /> },
  { id: 2, text: "Connecting to global internship database...", icon: <Database className="w-4 h-4 text-blue-500" /> },
  { id: 3, text: "Analyzing student skill gaps...", icon: <Network className="w-4 h-4 text-purple-500" /> },
  { id: 4, text: "Matching profiles with premium opportunities...", icon: <Server className="w-4 h-4 text-emerald-500" /> },
  { id: 5, text: "Optimal matches found. Dashboard ready.", icon: <CheckCircle2 className="w-4 h-4 text-primary" /> },
];

export const LiveAgentMotion = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < agentSteps.length ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-border/50 bg-[#0a0a0e]/90 backdrop-blur-xl shadow-2xl overflow-hidden shadow-primary/10">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 border-b border-border/50 bg-[#12121a]/80">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto flex items-center space-x-2 text-xs font-mono text-muted-foreground">
          <Terminal className="w-3 h-3" />
          <span>agent-workspace ~ bash</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm h-[320px] overflow-hidden flex flex-col justify-end relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay pointer-events-none"></div>
        <AnimatePresence mode="popLayout">
          {agentSteps.slice(0, currentStep).map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3 mb-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="flex-1">
                <span className="text-muted-foreground mr-2">{'>'}</span>
                <span className="text-foreground/90">{step.text}</span>
              </div>
            </motion.div>
          ))}
          {currentStep < agentSteps.length && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 text-muted-foreground mb-4"
            >
              <div className="w-8"></div>
              <span>Processing</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ...
              </motion.span>
            </motion.div>
          )}
          {currentStep === agentSteps.length && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary-foreground flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold tracking-wide">SYSTEM OPTIMIZED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
