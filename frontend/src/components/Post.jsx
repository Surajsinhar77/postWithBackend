import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardBody, Collapse, Input, Typography } from '@material-tailwind/react';
import Comments from './Comments';
import api from '../common/api/AuthApi';

export default function Post({postt}) {
    const [post , setPost] = useState(postt)

    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);
    const [fullCaption, setFullCaption] = React.useState(false);
    const toggleCaption = () => setFullCaption((cur) => !cur);

    const [newComment, setNewComment] = useState("");

    async function addNewComment() {
        if(!post?._id && post._id!=undefined && post._id!= "" && post_id != undefined ){
            return
        }
        const response = await api.post(`/post/comments/addNewComment/${post?._id}`, {comment:newComment});
        if (response.status === 200) {
            post.parentComment.push(response.data?.post?.parentComment[response?.data?.post?.parentComment?.length-1]);
            setPost(post);
            setNewComment("");
            return
        }
    }

    async function handelInput(e) {
        setNewComment(e.target.value);
    }

    return (
        <>
            <div className="container m-auto">
                <div className="card border w-[50%] m-auto mt-8">
                    <div className='p-2'>
                        <img className='p-2' src="/img/post_image.jpg" alt="post image" />
                    </div>
                    <div className='p-6'>
                        <div className="card-body">
                            <div className="user flex gap-2 items-center mb-3">
                                <Avatar  size="sm" src="/img/post_image.jpg" /> 
                                <Typography size="sm"> {post?.user?.name} </Typography>
                            </div>
                            <div className='px-6 text-gray-600'>
                                <div className=''>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                                </div>
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

                        <div className='flex justify-around border border-gray-300 py-3 rounded'>
                            <div className="likeBtn">
                                <Button>
                                    Like  {post?.like}
                                </Button>
                            </div>
                            <div className="comment">
                                <Button onClick={toggleOpen}>
                                    Comment
                                </Button>
                            </div>
                            <div className="share">
                                <Button>
                                    Share
                                </Button>
                            </div>
                        </div>

                        <div className="commentSection">
                            <div className="commentOperation">
                                <div className="row w-[100%] flex flex-row py-3 gap-3">
                                    <Input value={newComment} label="Comment" onChange={(e)=>handelInput(e)}/>
                                    <div className="forSendBtn">
                                        <Button onClick={addNewComment}>Send</Button>
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