import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/fetchPosts';
import PostListItem from './PostListItem';
import { savePostsToFirebase } from '../firebase';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [reorderedPosts, setReorderedPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      setReorderedPosts(posts);
    }
  }, [posts]);

  const movePost = useCallback((dragIndex, hoverIndex) => {
    const updatedPosts = Array.from(reorderedPosts);
    const [movedPost] = updatedPosts.splice(dragIndex, 1);
    updatedPosts.splice(hoverIndex, 0, movedPost);
    setReorderedPosts(updatedPosts);
  }, [reorderedPosts]);

  const saveChanges = async () => {
    await savePostsToFirebase(reorderedPosts);
    alert('Changes saved to Firebase!');
  };

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='post-data'>
      <h1>Posts List</h1>
      <button className='save-btn' onClick={saveChanges}>Confirm List Order</button>

      <DndProvider backend={HTML5Backend}>
        {reorderedPosts && reorderedPosts.length > 0 ? (
          <ul className='list-parent'>
            {reorderedPosts.map((post, index) => (
              <PostListItem key={post.id} post={post} index={index} movePost={movePost} />
            ))}
          </ul>
        ) : (
          <p>No posts available...</p>
        )}
      </DndProvider>
    </div>
  );
};

export default PostsList;
