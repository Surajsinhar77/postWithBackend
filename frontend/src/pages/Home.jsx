import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { useEffect,useState} from 'react';
import api from '../common/api/AuthApi';

export default function Home() {
    let [posts, setPosts] = useState([]);

    async function GetAllPostsAndComments(){
        const response = await api.get('/posts/getAllPosts');
        if(response.status === 200){
            setPosts(response?.data?.posts);
        }
    }

    useEffect(() => {
        const comment = GetAllPostsAndComments();
        
    },[]);

    return (
        <div>   
            <Navbar />
            {
                posts.map((post) => {
                    return <Post key={post._id} postt={post} setPosts={setPosts} />
                })
            }
        </div>
    )
}