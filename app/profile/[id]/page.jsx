'use client';

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Profile from '@components/Profile';


const MyProfile = () => {
    const { data: session } = useSession()
    const [myPosts, setMyPosts] = useState([])
    const { id } = useParams()


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${id}/posts`)
            const data = await response.json()
            setMyPosts(data)
        }
        if (session?.user.id) fetchPosts()

    }, [session])


    return (
        <Profile
            name={session?.user.name}
            desc="Welcome you your personlized profile page"
            data={myPosts}
            handleProfileClick={() => { }}
        />
    )
}

export default MyProfile;