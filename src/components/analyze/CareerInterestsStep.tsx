import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CAREER_CLUSTERS } from '@/lib/kuccps-data';

interface CareerInterestsStepProps {
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export function CareerInterestsStep({ selected, setSelected }: CareerInterestsStepProps) {
  const toggleCluster = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>What Career Areas Interest You?</CardTitle>
          <CardDescription>
            Select up to 3 career clusters that excite you. This helps us prioritize recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CAREER_CLUSTERS.map((cluster, index) => {
              const isSelected = selected.includes(cluster.id);
              return (
                <motion.button
                  key={cluster.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleCluster(cluster.id)}
                  disabled={!isSelected && selected.length >= 3}
                  className={`
                    relative p-4 rounded-xl text-left transition-all duration-200
                    ${isSelected 
                      ? 'bg-teal-50 border-2 border-teal-500 shadow-md' 
                      : 'bg-secondary/50 border-2 border-transparent hover:border-teal-200 hover:bg-secondary'
                    }
                    ${!isSelected && selected.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="text-2xl mb-2">{cluster.icon}</div>
                  <div className="font-semibold text-sm text-foreground mb-1">
                    {cluster.name}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Selection Summary */}
          <div className="mt-6 pt-4 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selected.length === 0 
                ? 'Select at least 1 career cluster' 
                : `${selected.length}/3 clusters selected`
              }
            </div>
            <div className="flex gap-2">
              {selected.map(id => {
                const cluster = CAREER_CLUSTERS.find(c => c.id === id);
                return cluster ? (
                  <Badge key={id} variant="teal" className="gap-1">
                    {cluster.icon} {cluster.name.split(' ')[0]}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border">
        <h4 className="text-sm font-semibold text-foreground mb-2">🎯 Why This Matters</h4>
        <p className="text-sm text-muted-foreground">
          Your career interests help us weigh recommendations. A student interested in Technology 
          might prefer Computer Science over Business IT, even if both are available options.
        </p>
      </div>
    </div>
  );
}
