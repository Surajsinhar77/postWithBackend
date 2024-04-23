import React from 'react';
import { Button, Card, CardBody, Collapse, Input, } from '@material-tailwind/react';
import Comments from './Comments';

export default function Post() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <div className="container m-auto  mt-8 py-6 px-4 border-2 ">
                <div className="card w-[70] m-auto p-8  border-2 bg-gray-100 shadow ">
                    <div className="card-body font-light">

                        <h5 className="card-title">Post Title</h5>
                        <p className="card-text">Post Content</p>
                        <a href="#" className="btn btn-primary">Read More</a>
                    </div>
                    <div className="comment mt-3 p-1">
                        <Button onClick={toggleOpen}>Comments</Button>
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
        </>
    )
}