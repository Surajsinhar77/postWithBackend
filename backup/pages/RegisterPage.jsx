export default function Register () {
    return (

        <div className=" mt-4 grow flex items-center justify-around">
            <div className="mb-65">
                <h1 className="text-4xl text-center mb-4">Register your Account</h1>
                <form className="max-w-sm mx-auto py-2">
                    <input type="text" placeholder=" Enter your name"/>
                    <input type=" email" placeholder="Enter ypur eamil"/>
                    <input  type="Password" placeholder="Password"/>

                    <button className="bg-black text-white p-2 rounded-lg m-1">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already  have a Account?{" "}
                        
        {/* redirect to login page */}
                    </div>
                </form>
            </div>

        </div>




    )
}