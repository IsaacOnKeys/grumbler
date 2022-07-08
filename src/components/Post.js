import React from 'react'
import { FcApprove } from 'react-icons/fc';
import { BiCommentDots } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
function Post({ post }) {
  const navigate = useNavigate();
  const getUserName = () => {
    const email = post.user.email;
    const username = email.substring(0, email.lastIndexOf("@"));
    return username;
   }

  return (
    <div onClick={() => navigate(`post/${post.id}`)} className="cursor-pointer">
      <div className="flex items-center post-card">
        <div className="h-8 w-8 font-['Angry'] flex justify-center items-center  text-secondary border-2 border-primary rounded-full mr-2">
          <span className="text-2xl relative top-[.2rem]">
            {getUserName()[0]}
          </span>
        </div>
        <span>{getUserName()}</span>
      </div>
      <div className="w-full text-center flex justify-center post-card">
        <img src={post.imageURL} alt="" className="h-60 w-60 object-contain" />


      </div>
      <div className="post-card p2 flex width-full items-center space-x-5">
        <div className="flex space-x-2 items-center">
          <FcApprove />
          <h3>{post.approve.length}</h3>
        </div>
        <div className="flex space-x-2 items-center">
          <BiCommentDots />
          <h3>{post.comment.length}</h3>
        </div>
      </div>
    </div>
  )
}

export default Post