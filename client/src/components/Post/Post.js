import React from 'react';

const Post = props => {
    const { post } = props;

    return (
        <div>
            <p>{post.title}</p>
        </div>
    )
}

export default Post;