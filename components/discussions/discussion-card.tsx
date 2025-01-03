'use client';

import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import type { TrendingDiscussion } from '@/lib/types';

interface DiscussionCardProps {
    discussion: TrendingDiscussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
    const { title, post } = discussion;
    const timeAgo = formatDistanceToNow(post.creationDate * 1000, { addSuffix: true });

    // Remove HTML tags from content preview
    const cleanContent = post.contentPreview.replace(/<[^>]*>/g, '');

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start space-x-4">
                <Avatar className="h-10 w-10">
                    {post.author?.profile.userAvatar && (
                        <AvatarImage src={post.author.profile.userAvatar} alt={post.author.username} />
                    )}
                    <AvatarFallback>
                        {post.author?.username.charAt(0).toUpperCase() || 'A'}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <h3 className="font-semibold line-clamp-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {post.author?.username || 'Anonymous'} • {timeAgo}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {cleanContent}
                </p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Join the discussion</span>
                </div>
            </CardContent>
        </Card>
    );
}