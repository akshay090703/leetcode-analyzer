import { SearchForm } from '@/components/search-form';
import { Code2Icon } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              LeetCode Analytics
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Get detailed insights into your LeetCode journey. Track your progress,
              analyze your performance, and improve your coding skills.
            </p>
          </div>
          <SearchForm />
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {/* <Leetcode className="h-5 w-5" />
            <span>Powered by alfa-leetcode-api</span> */}
            <Code2Icon className="h-5 w-5" />
            <span>Powered by LeetCode</span>
          </div>
        </div>
      </div>
    </div>
  );
}