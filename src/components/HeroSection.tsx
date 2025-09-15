import { Button } from "@/components/ui/button";
import { Camera, MapPin, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/civic-hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-subtle overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Make Your City
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Better</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Report issues, track progress, and help build a more responsive community. 
                From potholes to broken streetlights - your voice matters.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex items-center gap-2" asChild>
                <a href="/report">
                  <Camera className="h-5 w-5" />
                  Report an Issue
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/dashboard">View Dashboard</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="bg-primary/10 rounded-lg p-3 w-12 h-12 mx-auto flex items-center justify-center">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Snap & Send</h3>
                <p className="text-sm text-muted-foreground">Quick photo reporting</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-secondary/10 rounded-lg p-3 w-12 h-12 mx-auto flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground">Auto-Location</h3>
                <p className="text-sm text-muted-foreground">Precise positioning</p>
              </div>
              <div className="text-center space-y-2">
                <div className="bg-status-resolved/10 rounded-lg p-3 w-12 h-12 mx-auto flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-status-resolved" />
                </div>
                <h3 className="font-semibold text-foreground">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Real-time updates</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 rounded-2xl blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="Citizens reporting civic issues" 
              className="relative w-full h-[400px] object-cover rounded-2xl shadow-civic"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-status-in-progress" />
                <div>
                  <p className="font-semibold text-sm">Average Response</p>
                  <p className="text-2xl font-bold text-primary">2.3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;