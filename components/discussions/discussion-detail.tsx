'use client';

import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import type { DiscussionTopic } from '@/lib/types';
import MDEditor from '@uiw/react-md-editor';

interface DiscussionDetailProps {
    discussion: DiscussionTopic;
}

export function DiscussionDetail({ discussion }: DiscussionDetailProps) {
    const { title, viewCount, topLevelCommentCount, post } = discussion;
    const timeAgo = formatDistanceToNow(post.creationDate * 1000, { addSuffix: true });

    return (
        <Card>
            <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={post.author?.profile.userAvatar} alt={post.author?.username} />
                            <AvatarFallback>{post.author?.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>{post.author?.username}</span>
                                <span>•</span>
                                <span>{timeAgo}</span>
                                {post.author?.isDiscussAdmin && (
                                    <>
                                        <span>•</span>
                                        <Badge variant="secondary">Admin</Badge>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            <span>{viewCount}</span>
                        </div>
                        <div className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            <span>{topLevelCommentCount}</span>
                        </div>
                        <div className="flex items-center">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            <span>{post.voteCount}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <MDEditor.Markdown className="p-2 rounded-md" source={post.content} />
            </CardContent>
        </Card>
    );
}