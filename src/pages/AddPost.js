import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from '../components/DefaultLayout';
import "../App.css";
import { toast } from 'react-toastify';
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../firebaseConfig";

function AddPost() {
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addPost = () => {
        dispatch({ type: 'showLoading' })
        const storage = getStorage();
        const storageRef = ref(storage, `/posts/${image.name}`);
        uploadBytes(storageRef, image)
            .then((snapshot) => {

                getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {

                    addDoc(collection(fireDB, 'posts'), {
                        description,
                        imageURL: url,
                        approve: [],
                        comment: [],
                        user: JSON.parse(localStorage.getItem('grumper.user'))
                    })
                        .then(() => {
                            toast.success('Successful grump addition');
                            dispatch({ type: 'hideLoading' });
                            navigate('/');
                        })
                        .catch(() => {
                            dispatch({ type: 'hideLoading' })
                            toast.error('Error in grumping')
                        })
                });
            })
            .catch((error) => {
                console.log(error)
                toast.error('Error uploading')
            });

    };
    const onImageChange = (e) => {
        setImage(e.target.files[0]);

    };

    return (
        <DefaultLayout>
            <div>
                <h1 className="text-2xl">Add New Grumble</h1>

                <div className="w-screen flex flex-col">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-2 border-dashed border-secondary w-1/2 md:w-full my-5 p-5"></textarea>

                    <input type='file' onChange={(e) => onImageChange(e)} />

                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="mt-5 h-52 w-52 object-contain rounded" />
                    )}
                </div>

                {description &&
                    image && (
                        <button
                            className="bg-primary h-10 rounded-sm pl-5 pr-5 font-bold text-white hover:ring-2 hover:ring-[#eee] hover:bg-secondary mt-10"
                            onClick={addPost}
                        >
                            Grumble
                        </button>
                    )}
            </div>
        </DefaultLayout>

    )
}

export default AddPost