import { motion } from 'framer-motion';
import { Shield, Zap, Target, GraduationCap, Building, Wallet, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PreferencesStepProps {
  learningPreference: 'theoretical' | 'practical' | 'mixed';
  setLearningPreference: (pref: 'theoretical' | 'practical' | 'mixed') => void;
  riskAppetite: 'safe' | 'balanced' | 'competitive';
  setRiskAppetite: (risk: 'safe' | 'balanced' | 'competitive') => void;
  sponsorship: 'government' | 'self' | 'undecided';
  setSponsorship: (sponsor: 'government' | 'self' | 'undecided') => void;
  institutionType: 'university' | 'tvet' | 'kmtc' | 'any';
  setInstitutionType: (type: 'university' | 'tvet' | 'kmtc' | 'any') => void;
}

export function PreferencesStep({
  learningPreference,
  setLearningPreference,
  riskAppetite,
  setRiskAppetite,
  sponsorship,
  setSponsorship,
  institutionType,
  setInstitutionType,
}: PreferencesStepProps) {

  const riskOptions = [
    { 
      id: 'safe', 
      label: 'Safe', 
      icon: Shield, 
      description: 'High probability courses only',
      color: 'emerald'
    },
    { 
      id: 'balanced', 
      label: 'Balanced', 
      icon: Target, 
      description: 'Mix of safe and stretch goals',
      color: 'amber'
    },
    { 
      id: 'competitive', 
      label: 'Competitive', 
      icon: Zap, 
      description: 'Include high-reach options',
      color: 'rose'
    },
  ];

  const learningOptions = [
    { id: 'theoretical', label: 'Theoretical', description: 'Prefer lectures & research' },
    { id: 'practical', label: 'Practical', description: 'Hands-on, skills-based' },
    { id: 'mixed', label: 'Mixed', description: 'Balance of both' },
  ];

  const sponsorshipOptions = [
    { id: 'government', label: 'Government Sponsored', description: 'KUCCPS placement priority' },
    { id: 'self', label: 'Self-Sponsored', description: 'Open to private options' },
    { id: 'undecided', label: 'Undecided', description: 'Show all options' },
  ];

  const institutionOptions = [
    { id: 'university', label: 'University', icon: GraduationCap },
    { id: 'tvet', label: 'TVET College', icon: Building },
    { id: 'kmtc', label: 'KMTC', icon: Building },
    { id: 'any', label: 'Any Institution', icon: Building },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Risk Appetite */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Risk Appetite
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>This affects which courses we recommend based on your placement probability.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            How much competition are you comfortable with?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {riskOptions.map((option) => {
              const isSelected = riskAppetite === option.id;
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRiskAppetite(option.id as any)}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-200
                    ${isSelected 
                      ? `bg-${option.color}-50 border-2 border-${option.color}-500` 
                      : 'bg-secondary/50 border-2 border-transparent hover:border-secondary'
                    }
                  `}
                >
                  <option.icon className={`w-6 h-6 mb-2 ${isSelected ? `text-${option.color}-600` : 'text-muted-foreground'}`} />
                  <div className="font-semibold text-sm text-foreground">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Preference */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Learning Style</CardTitle>
          <CardDescription>Do you prefer theory or hands-on learning?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {learningOptions.map((option) => {
              const isSelected = learningPreference === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setLearningPreference(option.id as any)}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-200
                    ${isSelected 
                      ? 'bg-teal-50 border-2 border-teal-500' 
                      : 'bg-secondary/50 border-2 border-transparent hover:border-secondary'
                    }
                  `}
                >
                  <div className="font-semibold text-sm text-foreground">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sponsorship */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Funding Preference
          </CardTitle>
          <CardDescription>How do you plan to fund your education?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {sponsorshipOptions.map((option) => {
              const isSelected = sponsorship === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSponsorship(option.id as any)}
                  className={`
                    p-4 rounded-xl text-left transition-all duration-200
                    ${isSelected 
                      ? 'bg-teal-50 border-2 border-teal-500' 
                      : 'bg-secondary/50 border-2 border-transparent hover:border-secondary'
                    }
                  `}
                >
                  <div className="font-semibold text-sm text-foreground">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Institution Type */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Institution Preference</CardTitle>
          <CardDescription>What type of institution are you targeting?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {institutionOptions.map((option) => {
              const isSelected = institutionType === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setInstitutionType(option.id as any)}
                  className={`
                    p-4 rounded-xl text-center transition-all duration-200
                    ${isSelected 
                      ? 'bg-teal-50 border-2 border-teal-500' 
                      : 'bg-secondary/50 border-2 border-transparent hover:border-secondary'
                    }
                  `}
                >
                  <option.icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-teal-600' : 'text-muted-foreground'}`} />
                  <div className="font-semibold text-sm text-foreground">{option.label}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
