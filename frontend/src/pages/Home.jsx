import Navbar from '../components/Navbar';
import Post from '../components/Post';
import {ContactPage} from "../pages/ContactPage"

export default function Home() {
    return (
        <div>  
          
            <Navbar />
            <Post />
            <ContactPage/> 
        </div>
    )
}