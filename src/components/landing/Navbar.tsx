import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHome ? 'bg-transparent' : 'bg-background/80 backdrop-blur-lg border-b'
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-none ${isHome ? 'text-white' : 'text-foreground'}`}>
                Outreach AI
              </span>
              <span className={`text-[10px] ${isHome ? 'text-white/60' : 'text-muted-foreground'}`}>
                Student Placement Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className={`text-sm font-medium transition-colors ${
                isHome ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className={`text-sm font-medium transition-colors ${
                isHome ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className={`text-sm font-medium transition-colors ${
                isHome ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              FAQ
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Badge variant="premium" className="hidden lg:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              2025 Data Live
            </Badge>
            <Button 
              variant={isHome ? 'hero' : 'teal'}
              onClick={() => navigate('/analyze')}
            >
              Check Eligibility
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isHome ? 'text-white' : 'text-foreground'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isHome ? 'text-white' : 'text-foreground'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            <a 
              href="#features" 
              className={`block text-sm font-medium ${isHome ? 'text-white/80' : 'text-muted-foreground'}`}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className={`block text-sm font-medium ${isHome ? 'text-white/80' : 'text-muted-foreground'}`}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className={`block text-sm font-medium ${isHome ? 'text-white/80' : 'text-muted-foreground'}`}
            >
              FAQ
            </a>
            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => navigate('/analyze')}
            >
              Check Eligibility
            </Button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
