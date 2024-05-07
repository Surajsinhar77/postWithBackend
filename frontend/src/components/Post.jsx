import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardBody, Collapse, Input, Typography } from '@material-tailwind/react';
import Comments from './Comments';
import api from '../common/api/AuthApi';
import {getTimeAgo} from '../utlity/Timeago.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import params from '../common/params.json';
import { useAuth } from '../common/AuthContext.jsx';

const notify = (message) => {
    toast(message, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
}

export default function Post({postt}) {
    const {user} = useAuth();
    const [post , setPost] = useState(postt)

    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const [fullCaption, setFullCaption] = React.useState(false);
    const toggleCaption = () => setFullCaption((cur) => !cur);

    const [newComment, setNewComment] = useState("");
    
    async function addNewComment() {
        try{
            if(!post?._id && post._id!=undefined && post._id!= "" && post_id != undefined ){
                return
            }
            const response = await axios.post(`${params.baseURL}/post/comments/addNewComment/${post?._id}`, {comment:newComment},{
                withCredentials: true,
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
                }
            });
            if (response.status === 200) {
                post.parentComment.push(response.data?.post?.parentComment[response?.data?.post?.parentComment?.length-1]);
                setPost(post);
                setNewComment("");
                return
            }
        }catch(err){
            console.log("Error while adding new comment",err)
            notify(err?.response.data.message);  
        }
    }


    async function handelInput(e) {
        setNewComment(e.target.value);
    }

    return (
        <>
            <div className="container m-auto">
                <div className="card border w-[50%] m-auto">
                    <div>
                    <img className="h-96 w-full object-cover object-center" src={post?.postImage} alt="post image" />
                    </div>
                    <div className='p-6'>
                        <div className="card-body">
                            <div className="user flex gap-2 items-center mb-7">
                                <Avatar  size="sm" src={post?.user?.profileImage} /> 
                                <div>
                                    <Typography className='uppercase text-xs'>  {post?.user?.name} </Typography>
                                    <Typography  className='text-xs'> {getTimeAgo(post?.createdAt)} </Typography>
                                </div>
                            </div>
                            <div className='text-gray-600'>
                                <div className=''>
                                    <Typography variant='h6' className='capitalize'> {post?.title} </Typography>
                                </div>
                                <hr />
                            </div>
                            <Collapse open={fullCaption} className='mt-0'>
                                <Card className='mt-0'>
                                    <CardBody className='mt-0'>
                                        <p className="card-text text-justify text-gray-600">
                                            {post?.discription}
                                        </p>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <button onClick={toggleCaption} className="btn btn-primary my-3 text-blue-500">Read More</button>
                        </div>

                        <div className='flex justify-around py-3 rounded'>
                            <div className="likeBtn">
                                <Button color='purple'>
                                    Like  {post?.like}
                                </Button>
                            </div>
                            <div className="comment">
                                <Button onClick={toggleOpen} color='deep-orange'>
                                    Comment {post?.parentComment?.length}
                                </Button>
                            </div>
                            <div className="share" >
                                <Button color='indigo'>
                                    Share
                                </Button>
                            </div>
                        </div>

                        <div className="commentSection">
                            <div className="commentOperation">
                                <div className="row w-[100%] flex flex-row py-3 gap-3">
                                    <Input value={newComment} label="Comment" onChange={(e)=>handelInput(e)}/>
                                    <div className="forSendBtn">
                                        <Button color='green' onClick={addNewComment}>Send</Button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Collapse open={open}>
                            <Card>
                                <CardBody>
                                    
                                    <Comments comment={post?.parentComment} />
                                      
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
            </div>
        </>
    )
}