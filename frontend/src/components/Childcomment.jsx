import { useEffect } from "react";
import api from "../common/api/AuthApi";
import React from "react";
import { FaReply } from "react-icons/fa";
import { Button, Collapse, Input } from "@material-tailwind/react";
import { getTimeAgo } from "../utlity/Timeago";
import params from '../common/params.json';


export default function Childcomment({ comment, re = true }) {

    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    const [commentt, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");

    const handelInput = (e) => {
        setNewComment(e.target.value);
    }

    async function GetAllPostsAndComments() {
        const response = await api.get(`${params.baseURL}/post/comments/getCommentById/${comment}`,
        {
            withCredentials: true,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
            }
        }
        );
        if (response.status === 200) {
            setComments(response?.data?.comment);
            return response?.data?.comment?.user;
        }
    }


    async function addNewComment() {
        if (!comment && comment === undefined && commentt.post === undefined ) {
            return
        }
            const response = await api.post(`/post/comments/replyToComment/${comment}`,{
                postId: commentt?.post,
                comment: newComment
            });
            if (response.status === 200) {
                GetAllPostsAndComments();
                setNewComment("");
            }
    }

    useEffect(() => {
        GetAllPostsAndComments()
    }, [])

    return (
        <div className="media mt-4 flex">
            <img className="rounded-full w-10 h-10" alt="Bootstrap Media Another Preview" src={commentt?.user?.profileImage} />
            <div className="media-body w-full">
                <div className="row ml-3">
                    <div className="col-12 flex gap-2 items-center">
                        <h5>{commentt?.user?.name}</h5>
                        <span className="text-xs text-blue-400">
                            {commentt?.createdAt ? getTimeAgo(commentt?.createdAt) : ""}
                        </span>
                    </div>
                    
                        <div className="flex justify-between">
                            <p> {commentt?.commentInfo} </p>
                            {re ?
                                <button onClick={toggleOpen} className="flex gap-1 items-center"> <FaReply /> Reply </button>
                            :
                            ""
                            }
                        </div>    
                        
                </div>


                <Collapse open={open}>
                    <div className="commentSection">
                        <div className="commentOperation">
                            <div className="row w-[100%] flex flex-row py-3 gap-3">
                                <Input value={newComment} label="Comment" onChange={handelInput} />
                                <div className="forSendBtn">
                                    <Button onClick={addNewComment}>Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
                {
                    commentt?.children?.map((child, index) => {
                        return <Childcomment key={index} comment={child} re={false} />
                    })
                }
            </div>
        </div>
    )
}
