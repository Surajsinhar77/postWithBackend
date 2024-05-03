import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { useEffect, useState } from 'react';
import api from '../common/api/AuthApi';
import Postmodal from '../components/Postmodal';


export default function Home() {
    let [posts, setPosts] = useState([]);

    async function GetAllPostsAndComments() {
        const response = await api.get('/posts/getAllPosts');
        if (response.status === 200) {
            setPosts(response?.data?.posts);
        }
    }

    useEffect(() => {
        GetAllPostsAndComments();
    }, []);

    return (
        <div>
            <Navbar />
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