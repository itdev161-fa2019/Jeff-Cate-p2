import React from 'react';
import PostListItem from './PostListItem';

const PostList = props => {
    const { posts, deletePost } = props;
    return posts.map(post => (
            <PostListItem
            key={post._id}
            post={post}
            // clickPost={clickPost}
            deletePost={deletePost}
            // editPost={editPost}
        />
    ));
};

export default PostList;