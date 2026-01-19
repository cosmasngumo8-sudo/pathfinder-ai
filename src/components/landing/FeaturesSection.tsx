import { motion } from 'framer-motion';
import { CheckCircle2, FileText, MessageCircle, TrendingUp, Shield, Clock, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: TrendingUp,
    title: 'Multi-Year Cutoff Analysis',
    description: 'Track cutoff trends across 2022-2024 to predict future requirements',
    badge: 'Data-Driven'
  },
  {
    icon: Shield,
    title: 'KUCCPS Methodology',
    description: 'Exact cluster point calculations following official subject weighting',
    badge: 'Official'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get your eligibility analysis in seconds, not days',
    badge: 'Fast'
  },
  {
    icon: Award,
    title: 'Career Intelligence',
    description: 'Employment rates, salary data, and career pathways for informed decisions',
    badge: 'Insightful'
  },
  {
    icon: FileText,
    title: 'PDF Reports',
    description: 'Download official-looking eligibility reports for your records',
    badge: 'Premium'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    description: 'Get personalized guidance from our education advisors',
    badge: 'Support'
  }
];

const steps = [
  {
    number: '01',
    title: 'Enter Your Grades',
    description: 'Input your KCSE subject grades using our intuitive interface'
  },
  {
    number: '02',
    title: 'Select Preferences',
    description: 'Tell us about your career interests, risk appetite, and goals'
  },
  {
    number: '03',
    title: 'Get Recommendations',
    description: 'Receive probability-ranked course suggestions with career insights'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="teal" className="mb-4">Why Outreach AI</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Intelligence That Goes Beyond Basic Checking
          </h2>
          <p className="text-lg text-muted-foreground">
            We don't just tell you if you qualify. We analyze probability, predict trends, 
            and guide your entire academic journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full hover:border-teal-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="amber" className="mb-4">Simple Process</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Three Steps to Your Future
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-teal-300 to-teal-100" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 text-white font-display font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
