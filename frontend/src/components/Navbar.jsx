
export default function Navbar() {
    return(
        <>
            <div className="navBar bg-gray-200 w-full   items-center mb-8 ">
                <div className="navBarContainer flex  justify-between items-center">
                    <div className="navBarLeft ">
                        <h1 className="mx-12 p-2  bg- rounded-lg text-black ">Logo</h1>
                    </div>
                    <div className="navBarRigh  justify-between items-center">
                        <ul className="flex  mx-12  font-medium mb-4 gap-6 cursor-pointer">
                            <li className=" text-black rounded-lg p-2 hover:text-red-200 " to="/">Home</li>
                            <li className="  text-black rounded-lg p-2" to="">About</li>
                            <li className="  text-black rounded-lg p-2" >Services</li>
                            <li className="  text-black rounded-lg p-2">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}