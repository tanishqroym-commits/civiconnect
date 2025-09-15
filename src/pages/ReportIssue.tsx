import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Send, Upload, X, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReportIssue = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    contact: "",
    priority: "medium"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getLocation = async () => {
    setLocationLoading(true);
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding (in a real app, you'd use a geocoding service)
      const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      
      setLocation({
        lat: latitude,
        lng: longitude,
        address: address
      });

      toast({
        title: "Location detected",
        description: "Your current location has been added to the report",
      });
    } catch (error) {
      console.error("Error getting location:", error);
      toast({
        title: "Location access denied",
        description: "Please enable location permissions or enter address manually",
        variant: "destructive"
      });
    } finally {
      setLocationLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } // Use back camera on mobile
      });
      
      // Create video element to capture frame
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.addEventListener('loadedmetadata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0);
          const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setPhotos(prev => [...prev, photoDataUrl]);
          
          // Stop the stream
          stream.getTracks().forEach(track => track.stop());
          
          toast({
            title: "Photo captured",
            description: "Photo added to your report",
          });
        }
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access denied",
        description: "Please enable camera permissions or upload a photo instead",
        variant: "destructive"
      });
    }
  };

  const uploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      
      toast({
        title: "Photos uploaded",
        description: `${files.length} photo(s) added to your report`,
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in the category and description",
        variant: "destructive"
      });
      return;
    }

    // Here you would submit to your backend
    toast({
      title: "Report submitted successfully!",
      description: "We'll review your report and update you on progress",
    });
    
    // Reset form
    setFormData({ category: "", description: "", contact: "", priority: "medium" });
    setPhotos([]);
    setLocation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Report an Issue
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Help us improve your community. Submit a detailed report and we'll make sure it reaches the right department.
              </p>
            </div>
            
            <Card className="p-8 shadow-lg border border-border">
              <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Form Section */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Issue Category *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pothole">Potholes & Road Issues</SelectItem>
                          <SelectItem value="streetlight">Street Lighting</SelectItem>
                          <SelectItem value="trash">Waste Management</SelectItem>
                          <SelectItem value="graffiti">Graffiti & Vandalism</SelectItem>
                          <SelectItem value="traffic">Traffic Signals</SelectItem>
                          <SelectItem value="park">Parks & Recreation</SelectItem>
                          <SelectItem value="water">Water & Drainage</SelectItem>
                          <SelectItem value="sidewalk">Sidewalks & Walkways</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Location
                      </label>
                      <div className="space-y-3">
                        <div className="relative">
                          <Input 
                            placeholder="Enter address or use location detection"
                            value={location?.address || ""}
                            onChange={(e) => setLocation(prev => prev ? { ...prev, address: e.target.value } : null)}
                            className="pr-20"
                          />
                          <Button 
                            type="button"
                            size="sm" 
                            variant="ghost" 
                            onClick={getLocation}
                            disabled={locationLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-2"
                          >
                            {locationLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MapPin className="h-4 w-4 text-primary" />
                            )}
                          </Button>
                        </div>
                        {location && (
                          <div className="bg-secondary/10 p-3 rounded-lg">
                            <p className="text-sm text-foreground font-medium">Location detected:</p>
                            <p className="text-sm text-muted-foreground">
                              Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description *
                      </label>
                      <Textarea 
                        placeholder="Describe the issue in detail..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Contact (Optional)
                      </label>
                      <Input 
                        placeholder="Email or phone for updates"
                        value={formData.contact}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  {/* Photo Upload Section */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Add Photos
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-smooth">
                        <div className="space-y-4">
                          <div className="bg-primary/10 rounded-lg p-4 w-16 h-16 mx-auto flex items-center justify-center">
                            <Camera className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Capture or upload photos</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Photos help us understand and resolve issues faster
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button type="button" variant="civic" size="sm" onClick={takePhoto}>
                              <Camera className="h-4 w-4 mr-2" />
                              Take Photo
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={uploadPhoto}>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    
                    {/* Photo Preview */}
                    {photos.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-3">
                          Uploaded Photos ({photos.length})
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={photo} 
                                alt={`Issue photo ${index + 1}`}
                                className="w-full aspect-square object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-2 right-2 bg-status-urgent text-status-urgent-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Priority Level */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          type="button"
                          variant={formData.priority === "low" ? "default" : "outline"}
                          size="sm" 
                          onClick={() => setFormData(prev => ({ ...prev, priority: "low" }))}
                          className="text-status-resolved border-status-resolved/30"
                        >
                          Low
                        </Button>
                        <Button 
                          type="button"
                          variant={formData.priority === "medium" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, priority: "medium" }))}
                          className="text-status-pending border-status-pending/30"
                        >
                          Medium
                        </Button>
                        <Button 
                          type="button"
                          variant={formData.priority === "high" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, priority: "high" }))}
                          className="text-status-urgent border-status-urgent/30"
                        >
                          Urgent
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      <Send className="h-5 w-5 mr-2" />
                      Submit Report
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportIssue;