import React from "react";
import { Button, Collapse, Typography, Input } from "@material-tailwind/react";
import { FaReply } from "react-icons/fa";
import api from "../common/api/AuthApi";
import Childcomment from "./Childcomment";
import Nestedcomments from "./Nestedcomments";

export default function Comments({ comment }) {
    
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
                                    {comment?.map((comment, index) => {
                                        return (
                                            <Nestedcomments key={index} commentt={comment}/>
                                        )
                                    })
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