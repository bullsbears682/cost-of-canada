import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  type?: 'dashboard' | 'calculator' | 'table' | 'chart';
  rows?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'dashboard', 
  rows = 3 
}) => {
  if (type === 'dashboard') {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 animate-pulse" />
          <Skeleton className="h-4 w-96 animate-pulse" style={{ animationDelay: '0.1s' }} />
        </div>
        
        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 animate-pulse" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2 animate-pulse" />
                <Skeleton className="h-3 w-32 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Chart skeleton */}
        <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '0.4s' }}>
          <CardContent className="pt-6">
            <Skeleton className="h-64 w-full animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (type === 'calculator') {
    return (
      <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <Skeleton className="h-6 w-48 animate-pulse" />
          <Skeleton className="h-4 w-64 animate-pulse" style={{ animationDelay: '0.1s' }} />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <Skeleton className="h-4 w-32 animate-pulse" />
              <Skeleton className="h-10 w-full animate-pulse" />
            </div>
          ))}
          <Skeleton className="h-10 w-24 animate-pulse hover-scale" style={{ animationDelay: '0.5s' }} />
        </CardContent>
      </Card>
    );
  }

  if (type === 'table') {
    return (
      <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <Skeleton className="h-6 w-48 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table header */}
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 flex-1 animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
            {/* Table rows */}
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-8 flex-1 animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'chart') {
    return (
      <Card className="animate-fade-in hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <Skeleton className="h-6 w-48 animate-pulse" />
          <Skeleton className="h-4 w-64 animate-pulse" style={{ animationDelay: '0.1s' }} />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-80 w-full animate-pulse" />
          <div className="flex justify-center gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <Skeleton className="h-3 w-3 rounded-full animate-pulse" />
                <Skeleton className="h-3 w-16 animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default LoadingSkeleton;