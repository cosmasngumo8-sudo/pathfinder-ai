import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Shield, Sparkles, ArrowRight, CheckCircle2, BarChart3, Users, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden hero-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container relative z-10 px-4 pt-24 pb-16 mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Trust Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Badge variant="trust" className="text-sm py-1.5 px-4 bg-white/10 border-white/20 text-white backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              KUCCPS-Aligned Intelligence System
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Your Academic Future,
            <br />
            <span className="text-gradient bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent">
              Intelligently Guided
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Advanced placement intelligence for KCSE graduates. Get probability-based course recommendations, 
            career forecasts, and personalized pathways—all aligned with official KUCCPS methodology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/analyze')}
              className="group"
            >
              Analyze My Eligibility
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl">
              How It Works
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: '500+', label: 'Courses Analyzed', icon: GraduationCap },
              { value: '95%', label: 'Accuracy Rate', icon: TrendingUp },
              { value: '50K+', label: 'Students Guided', icon: Users },
              { value: '2025', label: 'Cutoff Data', icon: BarChart3 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-card rounded-xl p-4 bg-white/5 backdrop-blur-sm border-white/10"
              >
                <stat.icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Analysis',
                description: 'Our intelligent engine analyzes your grades against thousands of historical cutoffs',
                color: 'teal'
              },
              {
                icon: BarChart3,
                title: 'Probability Scoring',
                description: 'Get percentage-based placement predictions, not just yes/no answers',
                color: 'amber'
              },
              {
                icon: Sparkles,
                title: 'Career Intelligence',
                description: 'See employment rates, salary ranges, and career paths for each course',
                color: 'emerald'
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                variant="glass"
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
