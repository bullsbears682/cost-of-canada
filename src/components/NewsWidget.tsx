import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: 'economy' | 'housing' | 'inflation' | 'employment';
}

const NewsWidget = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock Canadian economic news data
  const mockNews: NewsItem[] = [
    {
      title: "Bank of Canada Holds Interest Rate at 4.95%",
      description: "The central bank maintains its key interest rate amid cooling inflation and housing market concerns.",
      url: "#",
      publishedAt: "2025-08-17T09:00:00Z",
      source: "Bank of Canada",
      category: "economy"
    },
    {
      title: "Housing Starts Rise 8% in Major Canadian Cities",
      description: "New construction permits show increasing activity in Vancouver, Toronto, and Calgary markets.",
      url: "#",
      publishedAt: "2025-08-16T14:30:00Z",
      source: "CMHC",
      category: "housing"
    },
    {
      title: "Consumer Price Index Shows 1.4% Annual Increase",
      description: "June inflation data indicates continued moderation in price pressures across most provinces.",
      url: "#",
      publishedAt: "2025-08-15T08:00:00Z",
      source: "Statistics Canada",
      category: "inflation"
    },
    {
      title: "Employment Rate Hits 62.9% in July",
      description: "Job market remains resilient with unemployment rates varying significantly by province.",
      url: "#",
      publishedAt: "2025-08-14T10:00:00Z",
      source: "Statistics Canada",
      category: "employment"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNews(mockNews);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economy': return 'bg-blue-500';
      case 'housing': return 'bg-green-500';
      case 'inflation': return 'bg-orange-500';
      case 'employment': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Latest Economic News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Latest Economic News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Latest Economic News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item, index) => (
          <div 
            key={index} 
            className="border-l-4 border-primary/20 pl-4 hover:border-primary/40 transition-colors duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
              <h4 className="font-medium text-sm leading-tight flex-1">
                {item.title}
              </h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-1 shrink-0"
                asChild
              >
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {item.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge 
                variant="secondary" 
                className={`${getCategoryColor(item.category)} text-white text-xs px-2 py-0.5`}
              >
                {item.category}
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDate(item.publishedAt)}
              </div>
              <span className="text-muted-foreground">
                {item.source}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewsWidget;