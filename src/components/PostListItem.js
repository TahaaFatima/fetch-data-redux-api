import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'POST';

const PostListItem = ({ post, index, movePost }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePost(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li className='post-list' ref={(node) => ref(drop(node))}>
      <div>
        <h3 className='post-title'>{post.title}</h3>
        <p className='post-content'>{post.body}</p>
      </div>
    </li>
  );
};

export default PostListItem;
