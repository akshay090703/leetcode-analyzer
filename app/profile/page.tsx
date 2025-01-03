'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
    const router = useRouter();

    useEffect(() => {
        const storedUsername = localStorage.getItem('leetcodeUsername');
        if (storedUsername) {
            router.push(`/profile/${storedUsername}`);
        } else {
            router.push('/');
        }
    }, [router]);

    return <div className='flex justify-center items-center h-[60vh]'>
        <Skeleton className="h-64 w-64" />
    </div>;
};

export default Profile;
