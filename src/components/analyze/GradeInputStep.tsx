import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, HelpCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ALL_SUBJECTS, 
  KCSE_GRADES, 
  GRADE_POINTS,
  SubjectGrade,
  KCSEGrade 
} from '@/lib/kuccps-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface GradeInputStepProps {
  grades: SubjectGrade[];
  setGrades: (grades: SubjectGrade[]) => void;
  year: number;
  setYear: (year: number) => void;
}

const COMPULSORY_SUBJECTS = ['English', 'Kiswahili', 'Mathematics'];

export function GradeInputStep({ grades, setGrades, year, setYear }: GradeInputStepProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<KCSEGrade | ''>('');

  const availableSubjects = ALL_SUBJECTS.filter(
    subject => !grades.find(g => g.subject === subject)
  );

  const addGrade = () => {
    if (selectedSubject && selectedGrade) {
      setGrades([...grades, { subject: selectedSubject, grade: selectedGrade }]);
      setSelectedSubject('');
      setSelectedGrade('');
    }
  };

  const removeGrade = (subject: string) => {
    setGrades(grades.filter(g => g.subject !== subject));
  };

  const updateGrade = (subject: string, newGrade: KCSEGrade) => {
    setGrades(grades.map(g => 
      g.subject === subject ? { ...g, grade: newGrade } : g
    ));
  };

  const missingCompulsory = COMPULSORY_SUBJECTS.filter(
    sub => !grades.find(g => g.subject === sub)
  );

  return (
    <div className="max-w-3xl mx-auto">
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Enter Your KCSE Grades
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Enter at least 7 subjects: English, Kiswahili, Mathematics (compulsory) plus 4 optional subjects.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>
                Add your KCSE subject grades for accurate course recommendations
              </CardDescription>
            </div>
            <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2023, 2022, 2021, 2020].map(y => (
                  <SelectItem key={y} value={y.toString()}>KCSE {y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Missing Compulsory Warning */}
          {missingCompulsory.length > 0 && grades.length > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Missing compulsory subjects</p>
                <p className="text-amber-700">
                  Please add: {missingCompulsory.join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Add Grade Form */}
          <div className="flex gap-3">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                    {COMPULSORY_SUBJECTS.includes(subject) && (
                      <span className="ml-2 text-xs text-muted-foreground">(Required)</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGrade} onValueChange={(v) => setSelectedGrade(v as KCSEGrade)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {KCSE_GRADES.map(grade => (
                  <SelectItem key={grade} value={grade}>
                    {grade} ({GRADE_POINTS[grade]} pts)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="teal" 
              onClick={addGrade}
              disabled={!selectedSubject || !selectedGrade}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Grades List */}
          <div className="space-y-2">
            {grades.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No grades added yet. Start by adding your compulsory subjects.</p>
              </div>
            ) : (
              <div className="grid gap-2">
                {grades.map((grade, index) => (
                  <motion.div
                    key={grade.subject}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{grade.subject}</span>
                      {COMPULSORY_SUBJECTS.includes(grade.subject) && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={grade.grade} 
                        onValueChange={(v) => updateGrade(grade.subject, v as KCSEGrade)}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {KCSE_GRADES.map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-muted-foreground w-12">
                        {GRADE_POINTS[grade.grade]} pts
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeGrade(grade.subject)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {grades.length > 0 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {grades.length} subject{grades.length !== 1 ? 's' : ''} entered
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={grades.length >= 7 ? 'emerald' : 'amber'}>
                  {grades.length >= 7 ? 'Ready to continue' : `Need ${7 - grades.length} more`}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="mt-6 p-4 rounded-lg bg-teal-50 border border-teal-100">
        <h4 className="text-sm font-semibold text-teal-800 mb-2">💡 Tips for Best Results</h4>
        <ul className="text-sm text-teal-700 space-y-1">
          <li>• Enter all subjects you sat for, not just your best ones</li>
          <li>• Cluster subjects matter - include sciences for STEM courses</li>
          <li>• Double-check your grades before proceeding</li>
        </ul>
      </div>
    </div>
  );
}
