import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostExcerpt } from './PostExcerpt';
import { fetchPosts, selectPostIds } from './postsSlice';

export const PostsList = () => {
    const dispatch = useDispatch();
    const orderedPostsIds = useSelector(selectPostIds);
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
        content = orderedPostsIds.map(postId => (
            <PostExcerpt key={postId} postId={postId} />
        ));
    } else if (postsStatus === 'error') {
        content = <div>{error}</div>
    }

    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
}