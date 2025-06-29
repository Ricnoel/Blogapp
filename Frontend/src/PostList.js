import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Box, Container } from '@mui/material';

const PostList = ({ onEdit, onDelete }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the posts!', error);
      });
  }, []);

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:5000/api/posts/${postId}`)
      .then((response) => {
        // After deletion, update the frontend to remove the post locally
        setPosts(posts.filter((post) => post._id !== postId));
        console.log('Post deleted:', response.data.message);
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                  {post.content.slice(0, 100)}...
                </Typography>
                <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                  <Button variant="outlined" color="primary" onClick={() => onEdit(post)}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginLeft: 2 }}
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostList;
