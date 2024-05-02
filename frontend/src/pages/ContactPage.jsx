import { useState } from "react"


export default function ContactPage(){
    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[message, setMessage] = useState('');



    function handleSubmit(e){
        e.preventDefault()
// send backend 
    }

    return (
        <diV  className=" flex justify-center mt-4 p-2 ">
            <h1 className="text-lg mt-4">Contact us </h1>
        <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    </diV>
       
    )
}