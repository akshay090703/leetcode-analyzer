'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocalStorage } from 'usehooks-ts';

const Profile = () => {
    const router = useRouter();
    const [leetcodeUsername] = useLocalStorage('leetcodeUsername', '');

    useEffect(() => {
        if (leetcodeUsername) {
            router.push(`/profile/${leetcodeUsername}`);
        } else {
            router.push('/');
        }
    }, [router]);

    return <div className='flex justify-center items-center h-[60vh]'>
        <Skeleton className="h-64 w-64" />
    </div>;
};

export default Profile;
