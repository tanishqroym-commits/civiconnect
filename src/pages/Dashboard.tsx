import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, Search, Eye, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for reports
  const mockReports = [
    {
      id: "RPT-001",
      title: "Pothole on Main Street",
      category: "pothole",
      location: "Main Street & 5th Ave",
      status: "in-progress",
      priority: "high",
      submittedDate: "2024-01-15",
      description: "Large pothole causing traffic issues",
      photos: 2,
      assignedTo: "Public Works Dept."
    },
    {
      id: "RPT-002", 
      title: "Broken Streetlight",
      category: "streetlight",
      location: "Park Avenue",
      status: "pending",
      priority: "medium",
      submittedDate: "2024-01-14",
      description: "Streetlight not working, safety concern",
      photos: 1,
      assignedTo: "Electrical Dept."
    },
    {
      id: "RPT-003",
      title: "Overflowing Trash Bin",
      category: "trash",
      location: "Central Park",
      status: "resolved",
      priority: "low",
      submittedDate: "2024-01-13",
      description: "Trash bin needs emptying",
      photos: 1,
      assignedTo: "Sanitation Dept."
    },
    {
      id: "RPT-004",
      title: "Graffiti on Building Wall",
      category: "graffiti",
      location: "Oak Street",
      status: "pending",
      priority: "medium",
      submittedDate: "2024-01-12",
      description: "Vandalism on commercial building",
      photos: 3,
      assignedTo: "Code Enforcement"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-status-pending text-status-pending-foreground";
      case "in-progress": return "bg-status-in-progress text-status-in-progress-foreground";
      case "resolved": return "bg-status-resolved text-status-resolved-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-status-resolved/20 text-status-resolved border-status-resolved/30";
      case "medium": return "bg-status-pending/20 text-status-pending border-status-pending/30";
      case "high": return "bg-status-urgent/20 text-status-urgent border-status-urgent/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in-progress": return <AlertTriangle className="h-4 w-4" />;
      case "resolved": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesFilter = filter === "all" || report.status === filter || report.category === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Community Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track reported issues and their resolution status across the community
            </p>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="pothole">Potholes</SelectItem>
                    <SelectItem value="streetlight">Streetlights</SelectItem>
                    <SelectItem value="trash">Waste Management</SelectItem>
                    <SelectItem value="graffiti">Graffiti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredReports.length} of {mockReports.length} reports
              </div>
            </div>
          </Card>

          {/* Reports Grid */}
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="p-6 hover:shadow-md transition-smooth">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-foreground">
                        {report.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {report.id}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {report.location}
                      </div>
                      <div>
                        Submitted: {report.submittedDate}
                      </div>
                      <div>
                        Photos: {report.photos}
                      </div>
                    </div>
                    
                    <p className="text-foreground">
                      {report.description}
                    </p>
                    
                    <div className="text-sm text-muted-foreground">
                      Assigned to: <span className="font-medium text-foreground">{report.assignedTo}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3 min-w-0 lg:min-w-48">
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">{report.status.replace('-', ' ')}</span>
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(report.priority)}>
                        {report.priority.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full lg:w-auto">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No reports found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;