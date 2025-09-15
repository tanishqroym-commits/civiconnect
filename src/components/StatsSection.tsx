import { Card } from "@/components/ui/card";
import { TrendingUp, Users, CheckCircle, AlertTriangle } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      title: "Reports Submitted",
      value: "12,847",
      change: "+23%",
      trend: "up",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Citizens",
      value: "3,429",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Issues Resolved",
      value: "9,156",
      change: "+18%",
      trend: "up",
      icon: CheckCircle,
      color: "text-status-resolved",
      bgColor: "bg-status-resolved/10",
    },
    {
      title: "Avg. Response Time",
      value: "2.3 days",
      change: "-15%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-status-pending",
      bgColor: "bg-status-pending/10",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Making a Real Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our community is working together to improve city services and quality of life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 border border-border shadow-sm hover:shadow-md transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-status-resolved' : 'text-status-urgent'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {stat.title}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;