import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Heart, Leaf } from 'lucide-react';

const SupportFooter = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-canada-red" />
              <span className="font-bold">MapleMetrics</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Making Canadian cost of living data accessible to everyone.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Tools</h3>
            <div className="space-y-2 text-sm">
              <Link to="/housing-analyzer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Housing Analyzer
              </Link>
              <Link to="/salary-calculator" className="block text-muted-foreground hover:text-foreground transition-colors">
                Salary Calculator
              </Link>
              <Link to="/retirement-planner" className="block text-muted-foreground hover:text-foreground transition-colors">
                Retirement Planner
              </Link>
              <Link to="/benefits-finder" className="block text-muted-foreground hover:text-foreground transition-colors">
                Benefits Finder
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <div className="space-y-2 text-sm">
              <Link to="/faq" className="block text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-canada-red fill-current" />
            <span>for Canadians</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 MapleMetrics. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SupportFooter;