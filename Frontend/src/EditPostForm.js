import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const EditPostForm = ({ post, onPostEdit }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:5000/api/posts/${post._id}`, { title, content })
      .then((response) => {
        onPostEdit(response.data);
      })
      .catch((error) => {
        console.error('There was an error editing the post!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
      />
      <Button type="submit" variant="contained" color="primary">Save Changes</Button>
    </form>
  );
};

export default EditPostForm;
