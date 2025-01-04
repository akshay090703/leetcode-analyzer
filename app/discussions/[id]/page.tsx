import { notFound } from 'next/navigation';
import { DiscussionDetail } from '@/components/discussions/discussion-detail';
import { getDiscussionById } from '@/lib/api/discussions';

export default async function DiscussionPage({
    params,
}: {
    params: { id: string };
}) {
    try {
        const discussion = await getDiscussionById(parseInt(params.id));

        if (!discussion?.data?.topic) {
            notFound();
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <DiscussionDetail discussion={discussion.data.topic} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching discussion:', error);
        notFound();
    }
}
