import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* CTA Section */}
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative -top-12"
        >
          <Card variant="gradient" className="bg-gradient-to-r from-teal-500 to-teal-600 border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  Ready to Find Your Path?
                </h3>
                <p className="text-white/80">
                  Join thousands of students making informed decisions about their future.
                </p>
              </div>
              <Button variant="heroOutline" size="xl" className="whitespace-nowrap">
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 mx-auto pb-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="font-display font-bold text-xl">Outreach AI</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Student Placement Intelligence System. Built for Kenyan students, powered by AI.
            </p>
            <Badge variant="trust" className="bg-white/10 border-white/20 text-white/80">
              KUCCPS-Aligned Guidance
            </Badge>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Eligibility Checker</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Course Database</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Explorer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TVET Programs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">KMTC Courses</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">How KUCCPS Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cluster Subjects Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cutoff Trends 2024</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://wa.me/254798645698" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  WhatsApp: 0798 645 698
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@outreachai.website" 
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  support@outreachai.website
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                Mon-Sat: 8AM - 8PM EAT
              </li>
            </ul>

            <div className="mt-6">
              <Button 
                variant="success" 
                size="sm"
                className="w-full"
                onClick={() => window.open('https://wa.me/254798645698', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <div>
            © {currentYear} Outreach AI. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-lg bg-white/5 text-xs text-white/40 text-center">
          <strong>Disclaimer:</strong> Outreach AI is an independent guidance tool and is not affiliated with KUCCPS or the Kenya Ministry of Education. 
          Our recommendations are based on historical data and should be used as guidance only. 
          Always verify official requirements through KUCCPS.
        </div>
      </div>
    </footer>
  );
}
