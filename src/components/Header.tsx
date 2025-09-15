import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary rounded-lg p-2">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <a href="/" className="text-xl font-bold text-foreground hover:text-primary transition-smooth">
                  CivicConnect
                </a>
                <p className="text-sm text-muted-foreground">Report. Track. Improve.</p>
              </div>
            </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/report" className="text-foreground hover:text-primary transition-smooth">
              Report Issue
            </a>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-smooth">
              Dashboard
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-sm">311</span>
            </div>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Admin Login
            </Button>
            <Button variant="hero" size="sm" asChild>
              <a href="/report">Report Issue</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;