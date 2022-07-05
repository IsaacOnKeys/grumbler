import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout';
import { fireDB } from '../firebaseConfig';
import { FcApprove } from 'react-icons/fc';
import { BiCommentDots } from 'react-icons/bi';


// import { toast } from 'react-toastify';
function PostDescription() {
  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserName = () => {
    const email = post.user.email;
    const username = email.substring(0, email.lastIndexOf("@"));
    return username;
  };
  useEffect(() => {
    dispatch({ type: 'showLoading' });
    getDoc(doc(fireDB, 'posts', params.id))
      .then((response) => {
        console.log(response.data())
        setPost({ ...response.data(), id: response.id })
        dispatch({ type: 'hideLoading' });
      }).catch(() => {
        dispatch({ type: 'hideLoading' });
      });
  }, []);
  return (
    <DefaultLayout>
      <div className="flex w-full justify-center">
        {post && (
          <div
            onClick={() => navigate(`post/${post.id}`)} className="cursor-pointer h-[500px] w-[500px]">
            <div className="flex items-center post-card p-2">
              <div className="h-8 w-8 font-['Angry'] flex justify-center items-center  text-secondary border-2 border-primary rounded-full mr-2">
                <span className="text-2xl relative top-[.2rem]">
                  {getUserName()[0]}
                </span>
              </div>
              <span>{getUserName()}</span>
            </div>
            <div className="w-full text-center flex justify-center post-card">
              <img src={post.imageURL} alt="" className="h-full w-full" />


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

        )}
      </div>

    </DefaultLayout>
  )
};


export default PostDescription;