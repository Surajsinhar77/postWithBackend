import { Typography, Collapse, Input, Button } from "@material-tailwind/react";
import { useEffect, useState} from "react";
import { FaReply } from "react-icons/fa";
import Childcomment from "./Childcomment";
import api from "../common/api/AuthApi";
import { getTimeAgo } from "../utlity/Timeago";
import axios from "axios";
import params from '../common/params.json'

export default function Nestedcomments({ commentt }){
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    const [comment, setComments] = useState(commentt);
    const [newComment, setNewComment] = useState("");

    async function getCommentById() {
        if (commentt === undefined) {
            return
        }
        const response = await axios.get(`${params.baseURL}/post/comments/getCommentById/${commentt}`,{
            withCredentials: true,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
            }
        });
        if (response.status === 200) {
            setComments(response?.data?.comment);
        }
    }

    async function addNewComment() {
        if (!commentt && commentt === undefined && comment.post === undefined ) {
            return
        }
            const response = await api.post(`${params.baseURL}/post/comments/replyToComment/${commentt}`,{
                postId: comment?.post,
                comment: newComment
            });
            if (response.status === 200) {
                getCommentById();
                setNewComment("");
            }
    }

    useEffect(() => {
        getCommentById();
    }, []);

    return (
        <div className="media flex mb-3 ">
            <img className="mr-3 rounded-full w-10 h-10" alt="Bootstrap Media Preview" src={comment?.user?.profileImage} />
            <div className="media-body w-full">
                <div className="row ">
                    <div className="col-8 flex gap-2 items-center">
                        <h5>{comment?.user?.name}</h5>
                        <span className="text-xs text-blue-400">
                            {comment?.createdAt ? getTimeAgo(comment?.createdAt) : ""}
                        </span>
                    </div>
                    <div className="col-4">
                        <div className="float-right reply">
                            <button onClick={toggleOpen} className="flex gap-1 items-center"> <FaReply /> Reply </button>
                        </div>
                    </div>
                </div>
                {
                    comment ?
                        <Typography>
                            {comment?.commentInfo}
                        </Typography>
                        :
                        ""
                }
                {/* sub Comment 1 */}
                <Collapse open={open}>
                    <div className="commentSection">
                        <div className="commentOperation">
                            <div className="row w-[100%] flex flex-row py-3 gap-3">
                                <Input value={newComment} label="Comment" onChange={(e) => setNewComment(e.target.value)} />
                                <div className="forSendBtn">
                                    <Button onClick={addNewComment}>Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
                {
                    comment?.children?.map((child, index) => {
                        return <Childcomment key={index} comment={child} />
                    })
                }
            </div>
        </div>
    )
}