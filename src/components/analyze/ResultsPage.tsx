import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Minus, Crown, Lock, Download, 
  MessageCircle, ChevronRight, ExternalLink, Briefcase, 
  GraduationCap, Building, DollarSign, Users, ArrowUpRight, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  StudentProfile, 
  Course, 
  COURSES,
  calculateClusterPoints,
  calculateMeanGrade,
  calculatePlacementProbability,
  getCutoffTrend,
  getCompetitiveness,
  meetsMinimumRequirements,
  formatKES,
  CAREER_CLUSTERS
} from '@/lib/kuccps-data';

interface ResultsPageProps {
  profile: StudentProfile;
  onBack: () => void;
}

interface CourseResult extends Course {
  clusterPoints: number;
  probability: number;
  trend: 'rising' | 'stable' | 'falling';
  competitiveness: 'low' | 'medium' | 'high' | 'very-high';
  meetsRequirements: boolean;
  interestMatch: boolean;
}

export function ResultsPage({ profile, onBack }: ResultsPageProps) {
  const [showPremium, setShowPremium] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseResult | null>(null);

  // Calculate results
  const results = useMemo(() => {
    const meanGrade = calculateMeanGrade(profile.grades);
    
    const courseResults: CourseResult[] = COURSES
      .filter(course => {
        // Filter by institution type
        if (profile.institutionType !== 'any' && course.institutionType !== profile.institutionType) {
          return false;
        }
        // Filter by sponsorship
        if (profile.sponsorship === 'government' && !course.sponsored) {
          return false;
        }
        return true;
      })
      .map(course => {
        const clusterPoints = calculateClusterPoints(profile.grades, course.clusterSubjects);
        const trend = getCutoffTrend(course.cutoff2024, course.cutoff2023, course.cutoff2022);
        const probability = calculatePlacementProbability(clusterPoints, course.cutoff2024, trend);
        const competitiveness = getCompetitiveness(course.cutoff2024, course.level);
        const meetsReqs = meetsMinimumRequirements(profile.grades, course.minimumRequirements);
        const interestMatch = profile.careerInterests.includes(course.cluster);

        return {
          ...course,
          clusterPoints,
          probability: meetsReqs ? probability : 0,
          trend,
          competitiveness,
          meetsRequirements: meetsReqs,
          interestMatch,
        };
      })
      .filter(course => {
        // Filter by risk appetite
        if (profile.riskAppetite === 'safe' && course.probability < 50) return false;
        if (profile.riskAppetite === 'balanced' && course.probability < 25) return false;
        return course.probability > 5;
      })
      .sort((a, b) => {
        // Prioritize interest matches
        if (a.interestMatch && !b.interestMatch) return -1;
        if (!a.interestMatch && b.interestMatch) return 1;
        // Then by probability
        return b.probability - a.probability;
      });

    return {
      meanGrade,
      totalCourses: courseResults.length,
      highProbability: courseResults.filter(c => c.probability >= 70).length,
      courseResults,
    };
  }, [profile]);

  const topCourses = results.courseResults.slice(0, 3);
  const remainingCourses = results.courseResults.slice(3);

  const getProbabilityColor = (prob: number): "high" | "medium" | "low" => {
    if (prob >= 70) return 'high';
    if (prob >= 40) return 'medium';
    return 'low';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'rising') return <TrendingUp className="w-4 h-4 text-rose-500" />;
    if (trend === 'falling') return <TrendingDown className="w-4 h-4 text-emerald-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card variant="gradient" className="bg-gradient-to-br from-navy-800 to-navy-900 text-white border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <Badge variant="trust" className="mb-4 bg-white/10 border-white/20 text-white">
                  KUCCPS-Aligned Analysis Complete
                </Badge>
                <h1 className="text-3xl font-display font-bold mb-2">
                  Your Placement Intelligence Report
                </h1>
                <p className="text-white/70">
                  Based on {profile.grades.length} subjects from KCSE {profile.year}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-teal-400">{results.meanGrade.toFixed(1)}</div>
                  <div className="text-xs text-white/60">Mean Points</div>
                </div>
                <div className="text-center px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-amber-400">{results.totalCourses}</div>
                  <div className="text-xs text-white/60">Courses Found</div>
                </div>
                <div className="text-center px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-emerald-400">{results.highProbability}</div>
                  <div className="text-xs text-white/60">High Probability</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interest Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-muted-foreground">Your interests:</span>
        {profile.careerInterests.map(id => {
          const cluster = CAREER_CLUSTERS.find(c => c.id === id);
          return cluster ? (
            <Badge key={id} variant="teal">
              {cluster.icon} {cluster.name}
            </Badge>
          ) : null;
        })}
      </div>

      {/* Top Recommendations */}
      <div className="mb-8">
        <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          Top Recommendations
        </h2>
        <div className="grid gap-4">
          {topCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                variant={index === 0 ? 'premium' : 'elevated'} 
                className="cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSelectedCourse(course)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        {index === 0 && (
                          <Badge variant="premium" className="shrink-0">
                            <Crown className="w-3 h-3 mr-1" />
                            Best Match
                          </Badge>
                        )}
                        {course.interestMatch && (
                          <Badge variant="teal" className="shrink-0">Matches Interest</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {course.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {course.institution}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Probability */}
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          course.probability >= 70 ? 'text-emerald-600' :
                          course.probability >= 40 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {course.probability}%
                        </div>
                        <div className="text-xs text-muted-foreground">Probability</div>
                        <Progress 
                          value={course.probability} 
                          className="h-1.5 w-20 mt-1" 
                          indicatorLevel={getProbabilityColor(course.probability)}
                        />
                      </div>

                      {/* Cutoff & Trend */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-lg font-semibold">{course.cutoff2024}</span>
                          {getTrendIcon(course.trend)}
                        </div>
                        <div className="text-xs text-muted-foreground">2024 Cutoff</div>
                        <div className="text-xs text-muted-foreground">
                          You: {course.clusterPoints.toFixed(1)}
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Gate */}
      <Card variant="premium" className="mb-8">
        <CardContent className="p-8 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 text-amber-600" />
          <h3 className="text-xl font-display font-bold text-foreground mb-2">
            Unlock Full Intelligence Report
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Get access to {remainingCourses.length}+ more course recommendations, detailed career outlooks, 
            salary data, and a downloadable PDF report.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="premium" size="lg" className="gap-2">
              <Crown className="w-4 h-4" />
              Unlock for KES 499
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={() => window.open('https://wa.me/254798645698', '_blank')}
            >
              <MessageCircle className="w-4 h-4" />
              Get Help on WhatsApp
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Secure payment via M-Pesa or Card • Instant access
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Start New Analysis
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Questions?</span>
          <Button 
            variant="success" 
            size="sm"
            onClick={() => window.open('https://wa.me/254798645698', '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp: 0798 645 698
          </Button>
        </div>
      </div>

      {/* Course Detail Modal could go here */}
    </div>
  );
}
