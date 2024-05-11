import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { useEffect, useState } from 'react';
import api from '../common/api/AuthApi';
import Postmodal from '../components/Postmodal';
import axios from 'axios';
import params from '../common/params';
import { toast } from 'react-toastify';


export default function Home() {
    let [posts, setPosts] = useState([]);

    async function GetAllPostsAndComments() {
        const response = await axios.get(`${params.baseURL}/posts/getAllPosts`, {
            withCredentials: params.withCredentials,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
            }
        });
        if (response.status === 200) {
            setPosts(response?.data?.posts);
        }
    }

    useEffect(() => {
        GetAllPostsAndComments();
        toast.success("Welcome to the Home Page");
    }, []);

    return (
        <div>
            <div className="container pt-20 m-auto">
                <Postmodal GetAllPostsAndComments={GetAllPostsAndComments} />
                <div className="postContainer  flex flex-col gap-6 overflow-hidden">
                    {
                        [...posts].reverse().map((post) => {
                            return <Post key={post._id} postt={post} setPosts={setPosts} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}