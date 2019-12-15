import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const PostListItem = props => {
    const { post, deletePost, editPost } = props;
    const history = useHistory();

    // const handleClickPost = post => {
    //     const slug = slugify(post.title, { lower: true });

    //     clickPost(post);
    //     history.push(`/posts/${slug}`);
    // };

    const handleEditPost = post => {
        editPost(post);
        history.push(`/edit-post/${post._id}`);
    }
    const handleDelete = post =>{
        deletePost(post);
    }
    // <button onClick={() => handleEditPost(post)}>Edit Post</button>
    return (
        <div>
             <div className="postListItem">
                <p>{post.title}</p>
                <button onClick={() => handleDelete(post)}>Delete</button>
                
             </div>
        </div>
    );
};

export default PostListItem;