import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostExcerpt } from './PostExcerpt';
import { fetchPosts, selectAllPosts } from './postsSlice';

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);


    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch]);

    let content;

    if (postsStatus === 'loading') {
        content = <div className='loader'>Loading...</div>
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

        content = orderedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ));
    }

    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
}