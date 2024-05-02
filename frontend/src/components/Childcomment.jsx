import { useEffect } from "react";
import api from "../common/api/AuthApi";
import React from "react";
import { FaReply } from "react-icons/fa";
import { Button, Collapse, Input } from "@material-tailwind/react";


export default function Childcomment(props) {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const [comment, setComments] = React.useState([]);
    const [person, setPerson] = React.useState([]);

    async function GetAllPostsAndComments() {
        const response = await api.get(`/post/comments/getCommentById/${props.comment}`);
        if (response.status === 200) {
            setComments(response?.data?.comment);
            return response?.data?.comment?.user;
        }
    }

    async function getUserInfo(userId) {
        const response = await api.get(`/auth/getUser/${userId}`);
        if (response.status === 200) {
            setPerson(response?.data?.result);
        }
    }
    useEffect( () => {
        GetAllPostsAndComments().then((userId) => {
            getUserInfo(userId);
        }).catch((err) => {
            console.log(err);
        })
    }, [])



    return (
        <div className="media mt-4 flex">
            <img className="rounded-full w-10 h-10" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/xELPaag.jpg" />
            <div className="media-body w-full">
                <div className="row ml-3">
                    <div className="col-12 flex">
                        <h5>{person?.name}</h5>
                        <span>- 3 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                        <p> {comment?.commentInfo} </p>
                        <button onClick={toggleOpen} className="flex gap-1 items-center"> <FaReply /> Reply </button>
                    </div>
                </div>
                <Collapse open={open}>
                    <div className="commentSection">
                        <div className="commentOperation">
                            <div className="row w-[100%] flex flex-row py-3 gap-3">
                                <Input label="Comment" />
                                <div className="forSendBtn">
                                    <Button>Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}
