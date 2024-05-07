import React, { useEffect } from "react";
import api from "../common/api/AuthApi";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Input,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { useAuth } from "../common/AuthContext";
import Fileuploader from "./Fileuploader";
import { toast } from "react-toastify";
import axios from "axios";
import params from "../common/params";

const notify = (message) => {
  toast.success(message);
}

export default function Postmodal({ GetAllPostsAndComments }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const handleOpen = () => setOpen(!open);
  const [userData, setUserData] = React.useState(null);
  const [post, setPost] = React.useState(null);

  const handleData = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  async function handlePost() {
    handleOpen();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('discription', post.discription);
    formData.append('file', file);


    try {
      if (!post?.title || !post?.discription) {
        notify("Please fill all the fields");

        return
      }
      const response = await axios.post(`${params.baseURL}/posts/addNewPost`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
        }
      });
      if (response.status === 200) {
        GetAllPostsAndComments();
        notify(response?.data?.message);
        return;
      }
      toast.error("Something went wrong");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  }

  useEffect(() => {
    setUserData(user);
  }, [])
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" className="fixed">
        Add Post
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" />
            <div>
              <Typography variant="h6">{userData?.name}</Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {userData?.email}
              </Typography>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="mx-4 flex flex-col gap-5">
            <Fileuploader file={file} setFile={setFile}  />
            <Input  label="Title*" name="title" onChange={handleData} />
            <Textarea label="Discription*" name="discription" onChange={handleData} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handlePost}>
            <span>Post</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}