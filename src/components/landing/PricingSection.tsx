import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Quick eligibility preview',
    features: [
      'Basic eligibility check',
      'Top 3 course suggestions',
      'Mean grade calculation',
      'General career categories'
    ],
    cta: 'Start Free',
    variant: 'outline' as const,
    popular: false
  },
  {
    name: 'Premium',
    price: 'KES 499',
    description: 'Full intelligence unlock',
    features: [
      'Everything in Basic',
      'Full ranked course list (50+)',
      'Probability-based scoring',
      'Multi-year cutoff analysis',
      'Salary & employment data',
      'Career pathway mapping',
      'Downloadable PDF report',
      'WhatsApp advisor access'
    ],
    cta: 'Unlock Premium',
    variant: 'premium' as const,
    popular: true
  },
  {
    name: 'Institution',
    price: 'Custom',
    description: 'For schools & counselors',
    features: [
      'Bulk student analysis',
      'Custom dashboards',
      'API integration',
      'Dedicated support',
      'White-label options'
    ],
    cta: 'Contact Sales',
    variant: 'navy' as const,
    popular: false
  }
];

export function PricingSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="premium" className="mb-4">
            <Crown className="w-3 h-3 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Invest in Your Future
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with a free preview, upgrade for complete intelligence and career insights.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-amber-400 text-white border-0 px-4 py-1 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card 
                variant={plan.popular ? 'premium' : 'elevated'}
                className={`h-full ${plan.popular ? 'scale-105 z-10' : ''}`}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-display font-bold text-foreground">{plan.price}</span>
                    {plan.price !== 'Free' && plan.price !== 'Custom' && (
                      <span className="text-muted-foreground text-sm ml-1">one-time</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={plan.variant}
                    className="w-full"
                    size="lg"
                    onClick={() => navigate('/analyze')}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted payment powered by</p>
          <div className="flex items-center justify-center gap-8">
            <div className="text-2xl font-bold text-muted-foreground/50">IntaSend</div>
            <div className="text-muted-foreground/30">|</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-emerald-500" />
              M-Pesa Supported
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-emerald-500" />
              Card Payments
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
