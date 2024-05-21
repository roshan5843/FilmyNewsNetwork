// import { useEffect, useState } from 'react'
// import moment from 'moment'
// import { FaThumbsUp } from 'react-icons/fa'
// import {useSelector} from 'react-redux'
// 
// 
// const Comment = ({ comment, onLike }) => {
//   const [user, setUser] = useState({})
//  const {currentUser} = useSelector((state) => state.user)
// 
//   useEffect(() => {
//     const getuser = async () => {
//       try {
//         const res = await fetch(`/api/user/${comment.userId}`)
//         const data = await res.json()
//         if (res.ok) {
//           setUser(data)
//         }
//       } catch (error) {
//         console.log(error.message)
//       }
//     }
//     getuser()
//   }, [comment])
//   return (
//     <div className='flex p-4 border-b dark:border-green-600 text-sm'>
//       <div className='flex-shrink-0 mr-3'>
//         <img
//           className='w-10 h-10 rounded-full bg-gray-200'
//           src={user.profilePicture}
//           alt={user.username}
//         />
//       </div>
//       <div className='flex-1'>
//         <div className='flex items-center mb-1'>
//           <span className='font-bold mr-1 text-xs truncate'>
//             {user ? `${user.username}` : 'anonymous user'}
//           </span>
//           <span>{moment(comment.createdAt).fromNow()}</span>
//         </div>
//         <>
//         <p className='text-gray-500 pb-2'>{comment.content}</p>
//             <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
//               <button
//                 type='button'
//                 onClick={() => onLike(comment._id)}
//                 className={`text-gray-400 hover:text-blue-500 ${
//                   currentUser &&
//                   comment.likes.includes(currentUser._id) &&
//                   '!text-blue-500'
//                 }`}
//               >
//                 <FaThumbsUp className='text-sm' />
//             </button>
//             <p className='text-gray-400'>
//                 {comment.numberOfLikes > 0 &&
//                   comment.numberOfLikes +
//                     ' ' +
//                     (comment.numberOfLikes === 1 ? 'like' : 'likes')}
//               </p>
//           </div>
//           </>
//       </div>
//     </div>
//   )
// }
// 
// export default Comment
// 


import { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(comment.numberOfLikes);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, [comment.userId]);

  useEffect(() => {
    if (currentUser && comment.likes.includes(currentUser._id)) {
      setUserHasLiked(true);
    } else {
      setUserHasLiked(false);
    }
  }, [currentUser, comment.likes]);

  const handleLikeClick = () => {
    if (currentUser) {
      const newLikeStatus = !userHasLiked;
      setUserHasLiked(newLikeStatus);

      const newLikeCount = newLikeStatus ? likes + 1 : likes - 1;
      setLikes(newLikeCount);

      onLike(comment._id, newLikeStatus);
    }
  };

  return (
    <div className='flex p-4 border-b dark:border-green-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `${user.username}` : 'anonymous user'}
          </span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
          <button
            type='button'
            onClick={handleLikeClick}
            className={`text-gray-400 hover:text-blue-500 ${
              userHasLiked && '!text-blue-500'
            }`}
          >
            <FaThumbsUp className='text-sm' />
          </button>
          <p className='text-gray-400'>
            {likes > 0 && `${likes} ${likes === 1 ? 'like' : 'likes'}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
