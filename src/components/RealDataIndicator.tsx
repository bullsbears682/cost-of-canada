import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RealDataIndicatorProps {
  lastUpdated?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  sources?: string[];
  error?: string | null;
}

const RealDataIndicator = ({ 
  lastUpdated, 
  isLoading, 
  onRefresh, 
  sources = [],
  error 
}: RealDataIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-gradient-primary/5 rounded-lg border">
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4 text-primary" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Real Data
            </Badge>
            {error && (
              <Badge variant="destructive" className="text-xs">
                Error
              </Badge>
            )}
          </div>
          {lastUpdated && !error && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              Updated {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1" />
      
      {onRefresh && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      )}
      
      {sources.length > 0 && (
        <div className="text-xs text-muted-foreground">
          Sources: {sources.slice(0, 2).join(', ')}
          {sources.length > 2 && ` +${sources.length - 2} more`}
        </div>
      )}
    </div>
  );
};

export default RealDataIndicator;