import React from "react";
import { Button, Collapse, Typography, Input } from "@material-tailwind/react";
import Nestedcomments from "./Nestedcomments";

export default function Comments({ comment }) {
    
    return (
        <>
            <div className="container mb-5 mt-2">
                <div className="card">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    {comment.length > 0 ?
                                        comment?.map((comment, index) => {
                                            return (
                                                <Nestedcomments key={index} commentt={comment}/>
                                            )
                                        })
                                            :
                                        <Typography color="gray">No comments yet</Typography>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}