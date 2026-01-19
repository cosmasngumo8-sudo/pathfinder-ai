import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, GraduationCap, Heart, Target, Building, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/landing/Navbar';
import { GradeInputStep } from '@/components/analyze/GradeInputStep';
import { CareerInterestsStep } from '@/components/analyze/CareerInterestsStep';
import { PreferencesStep } from '@/components/analyze/PreferencesStep';
import { ResultsPage } from '@/components/analyze/ResultsPage';
import { 
  StudentProfile, 
  SubjectGrade, 
  CAREER_CLUSTERS,
  calculateClusterPoints,
  calculateMeanGrade
} from '@/lib/kuccps-data';

const STEPS = [
  { id: 'grades', title: 'KCSE Grades', icon: GraduationCap, description: 'Enter your subject grades' },
  { id: 'interests', title: 'Career Interests', icon: Heart, description: 'What excites you?' },
  { id: 'preferences', title: 'Preferences', icon: Target, description: 'Your goals & risk level' },
  { id: 'results', title: 'Your Results', icon: Sparkles, description: 'Personalized recommendations' },
];

const AnalyzePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [grades, setGrades] = useState<SubjectGrade[]>([]);
  const [year, setYear] = useState(2024);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [learningPreference, setLearningPreference] = useState<'theoretical' | 'practical' | 'mixed'>('mixed');
  const [riskAppetite, setRiskAppetite] = useState<'safe' | 'balanced' | 'competitive'>('balanced');
  const [sponsorship, setSponsorship] = useState<'government' | 'self' | 'undecided'>('undecided');
  const [institutionType, setInstitutionType] = useState<'university' | 'tvet' | 'kmtc' | 'any'>('any');

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  const studentProfile: StudentProfile = {
    grades,
    year,
    careerInterests,
    learningPreference,
    riskAppetite,
    sponsorship,
    institutionType,
  };

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 0:
        // Need at least 7 subjects (compulsory + 4 optional)
        return grades.length >= 7;
      case 1:
        return careerInterests.length >= 1;
      case 2:
        return true;
      default:
        return true;
    }
  }, [currentStep, grades, careerInterests]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1 && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const meanGrade = grades.length > 0 ? calculateMeanGrade(grades) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 pt-24 pb-16 mx-auto">
        {/* Progress Header */}
        {currentStep < 3 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-display font-bold text-foreground">
                Eligibility Analysis
              </h1>
              <Badge variant="teal">Step {currentStep + 1} of {STEPS.length}</Badge>
            </div>
            
            <Progress value={progressPercentage} className="h-2 mb-6" indicatorLevel="teal" />
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${index < currentStep ? 'step-complete' : index === currentStep ? 'step-active' : 'step-pending'}
                    `}>
                      {index < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium hidden md:block ${
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                      index < currentStep ? 'bg-emerald-500' : 'bg-secondary'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="grades"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GradeInputStep 
                grades={grades} 
                setGrades={setGrades}
                year={year}
                setYear={setYear}
              />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CareerInterestsStep 
                selected={careerInterests}
                setSelected={setCareerInterests}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PreferencesStep 
                learningPreference={learningPreference}
                setLearningPreference={setLearningPreference}
                riskAppetite={riskAppetite}
                setRiskAppetite={setRiskAppetite}
                sponsorship={sponsorship}
                setSponsorship={setSponsorship}
                institutionType={institutionType}
                setInstitutionType={setInstitutionType}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsPage 
                profile={studentProfile}
                onBack={() => setCurrentStep(0)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto mt-8 flex items-center justify-between"
          >
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-center gap-4">
              {grades.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Mean Grade: <span className="font-semibold text-foreground">{meanGrade.toFixed(1)}</span> points
                </div>
              )}
              
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                {currentStep === 2 ? 'View Results' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
