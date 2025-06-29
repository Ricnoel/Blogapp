import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';


const CreatePostForm = ({ onPostCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/posts', { title, content })
      .then((response) => {
        onPostCreate(response.data);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }} textAlign="center">Create New Post</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
            variant="outlined"
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePostForm;
