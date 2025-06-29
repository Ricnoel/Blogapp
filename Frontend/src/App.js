import React, { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import PostList from './PostList';
import EditPostForm from './EditPostForm';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handlePostCreate = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostEdit = (updatedPost) => {
    setPosts(posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)));
    setEditingPost(null);
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <div>
      <CreatePostForm onPostCreate={handlePostCreate} />
      {editingPost ? (
        <EditPostForm post={editingPost} onPostEdit={handlePostEdit} />
      ) : (
        <PostList onEdit={setEditingPost} onDelete={handlePostDelete} />
      )}
    </div>
  );
};

export default App;
