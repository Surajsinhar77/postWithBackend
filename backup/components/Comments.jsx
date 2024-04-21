import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { FaReply } from "react-icons/fa";

export default function Comments() {
    return (
        <>
            <div className="container mb-5 mt-5">

                <div className="card">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-center mb-5 ">
                                Nested comment section
                            </h3>
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="media flex">
                                        <img className="mr-3 rounded-full" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
                                        <div className="media-body">
                                            <div className="row ">
                                                <div className="col-8 flex">
                                                    <h5>Maria Smantha</h5>
                                                    <span>- 2 hours ago</span>
                                                </div>

                                                <div className="col-4">

                                                    <div className="float-right reply">

                                                        <button className="flex gap-1 items-center"> <FaReply/> Reply </button> 

                                                    </div>

                                                </div>
                                            </div>

                                            <Typography>
                                            It is a long established fact that a reader will be distracted by the readable content of a page.
                                            </Typography>

                                            {/* sub Comment 1 */}
                                            <div className="media mt-4 flex">
                                                <img className="rounded-full" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/xELPaag.jpg" />
                                                <div className="media-body">

                                                    <div className="row flex ml-3">
                                                        <div className="col-12 flex">
                                                            <h5>Simona Disa</h5>
                                                            <span>- 3 hours ago</span>
                                                        </div>


                                                    </div>

                                                    letters, as opposed to using 'Content here, content here', making it look like readable English.
                                                </div>
                                            </div>

                                            {/* sub Comment 2 */}
                                            <div className="media mt-3 flex">
                                                <img className="rounded-full" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/nAcoHRf.jpg" />
                                                <div className="media-body">
                                                    <div className="row flex ml-3">
                                                        <div className="col-12 flex">
                                                            <h5>John Smith</h5>
                                                            <span>- 4 hours ago</span>
                                                        </div>


                                                    </div>

                                                    the majority have suffered alteration in some form, by injected humour, or randomised words.

                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div className="media mt-4 flex">
                                        <img className="mr-3 rounded-full" alt="Bootstrap Media Preview" src="https://i.imgur.com/xELPaag.jpg" />
                                        <div className="media-body">
                                            <div className="row">
                                                <div className="col-8 flex">
                                                    <h5>Shad f</h5>
                                                    <span>- 2 hours ago</span>
                                                </div>

                                                <div className="col-4">

                                                    <div className="float-right reply">

                                                    <Button> <i className="fa fa-reply"></i> reply </Button>

                                                    </div>

                                                </div>
                                            </div>

                                            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33.


                                            <div className="media mt-4 flex">
                                                <img className="rounded-full" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/nUNhspp.jpg" />
                                                <div className="media-body">

                                                    <div className="row flex ml-3">
                                                        <div className="col-12 flex">
                                                            <h5>Andy flowe</h5>
                                                            <span>- 5 hours ago</span>
                                                        </div>


                                                    </div>

                                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                                </div>
                                            </div>

                                            <div className="media mt-3 flex">
                                                <img className="rounded-full" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/HjKTNkG.jpg" />
                                                <div className="media-body">
                                                    <div className="row flex ml-3">
                                                        <div className="col-12 flex">
                                                            <h5>Simp f</h5>
                                                            <span>- 5 hours ago</span>
                                                        </div>


                                                    </div>

                                                    a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur
                                                </div>
                                            </div>


                                            <div className="media mt-3 flex">
                                                
                                                    <img className="rounded-full" alt="Bootstrap Media Another Preview" src="https://i.imgur.com/nAcoHRf.jpg" />
                                            
                                                <div className="media-body">
                                                    <div className="row flex ml-3">
                                                        <div className="col-12 flex">
                                                            <h5>John Smith</h5>
                                                            <span>- 4 hours ago</span>
                                                        </div>


                                                    </div>

                                                    the majority have suffered alteration in some form, by injected humour, or randomised words.

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}