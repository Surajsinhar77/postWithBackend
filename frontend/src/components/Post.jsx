import React from 'react';
import { Button, Card, CardBody, Collapse, Input, } from '@material-tailwind/react';
import Comments from './Comments';
import { FcLike } from "react-icons/fc";
import { FaShare } from "react-icons/fa";
import { FcComments } from "react-icons/fc";

export default function Post() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    const [fullCaption, setFullCaption] = React.useState(false);

    const toggleCaption = () => setFullCaption((cur) => !cur);

    return (
        <>
            <div className="container m-auto">
                <div className="card border w-[50%] m-auto mt-8">
                    <div className='p-2'>
                        <img className='p-2' src="/img/post_image.jpg" alt="post image" />
                    </div>
                    <div className='p-6'>
                        <div className="card-body">
                            {/* <h5 className="card-title text-center">Post Title</h5> */}
                            <div className='px-6 text-gray-600'>
                                <div>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                                </div>
                            </div>
                            <Collapse open={fullCaption} className='mt-0'>
                                <Card className='mt-0'>
                                    <CardBody className='mt-0'>
                                        <p className="card-text text-justify text-gray-600">
                                            Molestias, earum voluptate velit saepe dolor optio numquam ad ducimus! Alias molestias unde rem quae possimus non laboriosam. Asperiores accusamus, maiores, harum nesciunt voluptatem voluptate quaerat dignissimos minus officiis atque blanditiis, ut tenetur. A sequi earum eaque placeat aperiam provident libero atque.
                                        </p>
                                    </CardBody>
                                </Card>
                            </Collapse>
                            <button onClick={toggleCaption} className="btn btn-primary my-3 text-blue-500">Read More</button>
                        </div>

                        <div className='flex justify-around border border-gray-300 py-3 rounded'>
                            <div className="likeBtn">
                                <Button>
                                    Like
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
                                    <Input label="Comment" />
                                    <div className="forSendBtn">
                                        <Button>Send</Button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Collapse open={open}>
                            <Card className="my-2 mx-auto w-full">
                                <CardBody>
                                    <Comments />
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
            </div>
        </>
    )
}