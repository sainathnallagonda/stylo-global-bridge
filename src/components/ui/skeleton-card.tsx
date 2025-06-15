
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface SkeletonCardProps {
  showImage?: boolean;
  showButton?: boolean;
  lines?: number;
}

const SkeletonCard = ({ showImage = true, showButton = true, lines = 3 }: SkeletonCardProps) => {
  return (
    <Card className="overflow-hidden">
      {showImage && (
        <Skeleton className="h-48 w-full" />
      )}
      <CardContent className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-16" />
          {showButton && <Skeleton className="h-9 w-24" />}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
