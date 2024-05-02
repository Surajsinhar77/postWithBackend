import { Typography, Collapse, Input, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import Childcomment from "./Childcomment";
import api from "../common/api/AuthApi";

export default function Nestedcomments({ commentt }) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const [person, setPerson] = useState([]);

    const [comment, setComments] = useState(commentt);

    const [newComment, setNewComment] = useState("");

    async function getUserInfo() {
        if (comment?.user === undefined && comment?.user === undefined) {
            return
        }
        console.log("undefine aa he nahi sakta hai ", comment.user);
        const response = await api.get(`/auth/getUser/${comment?.user}`);
        if (response.status === 200) {
            setPerson(response?.data?.result);
        }
    }

    async function addNewComment() {
        if (!comment?._id) {
            return
        }
        console.log("comment Added 2", comment);
        const response = await api.post(`/post/comments/replyToComment/${comment?._id}`,
            {
                postId: comment?.post,
                comment: newComment
            });
        if (response.status === 200) {
            console.log("Comment Added ", response.data?.comment);
            // setComments(comment.children.push(response?.data?.comment?.children[response?.data?.comment?.children.length-1]))
            setComments(response.data.comment)
            setNewComment("");
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div className="media flex mb-3">
            <img className="mr-3 rounded-full w-10 h-10" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
            <div className="media-body w-full">
                <div className="row ">
                    <div className="col-8 flex">
                        <h5>{person?.name}</h5>
                        <span>- 2 hours ago</span>
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
                                <Input label="Comment" onChange={(e) => setNewComment(e.target.value)} />
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