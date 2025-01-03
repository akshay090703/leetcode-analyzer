'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export function RecentSubmissions({ submissions }: { submissions: Submission[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions.slice(0, 5).map((submission, index) => (
            <div
              key={`${submission.titleSlug}-${index}`}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <h3 className="font-medium">{submission.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(parseInt(submission.timestamp) * 1000), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={submission.statusDisplay === 'Accepted' ? 'default' : 'destructive'}>
                  {submission.statusDisplay}
                </Badge>
                <Badge variant="secondary">{submission.lang}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}