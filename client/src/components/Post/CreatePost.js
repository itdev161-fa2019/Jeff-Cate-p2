import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './styles.css';

const CreatePost = ({ token, onPostCreated }) => {
    let history = useHistory();
    const [postData, setPostData] = useState({
        title: ''
    });
    const { title} = postData;

    const onChange = e => {
        const { name, value } = e.target;

        setPostData({
            ...postData,
            [name]: value
        });
    };

    const create = async () => {
        if (!title) {
            console.log('Title and body are required');
        } else {
            const newPost = {
                title: title
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    }
                };

                // Create the post
                const body = JSON.stringify(newPost);
                const res = await axios.post(
                    'http://localhost:5000/api/posts',
                    body,
                    config
                );

                // Call the handler and redirect
                onPostCreated(res.data);
                history.push('/');
            } catch (error) {
                console.error(`Error creating post: ${error}`);
            }
        }
    };

    return (
        
        <div>
            <input className="newItem"
            name="title"
            type="text"
            placeholder="Add Item..."
            value={title}
            onChange={e => onChange(e)}
            />
            <button className="newItem" onClick={() => create()}>Add Item</button>
        </div>
    );
};

export default CreatePost;