
export default function AboutPage(){
    let message = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates amet vero fuga odit quo neque iure deleniti. Qui architecto ipsa fugit sint facere repellendus aut est illum, corporis impedit distinctio!`
    return (
        <section className="section-white  mt-12 w-full">
            <div className="container w-[70%] justify-center m-auto">
                <div className="row w-[50%">
                    <div className=" text-center bg-red-200 b">
                        <h2 className="section-title font-serif whitespace-pre-line font-semibold text-xl ">
                            The Team Behind Project
                        </h2>
                        <p className="section-subtitle whitespace-pre-line font-serif font-medium text-lg">{message}</p>
                    </div>
                 
                    <div className=" flex mt-4 border bg-blue-300 border-gray-300 rounded-md   ">
                        <div className="team-item bg-gray-300  text-center m-20 p-20 gap-0  hover:bg-blue-200 rounded-lg">
                            <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="item-img max-w-[140px] p-6 rounded-lg" alt="image"/>
                            <h3  className="font-serif font-semibold mt-6 mx-auto ">Suraj Kumar</h3>
                            <div className="item-info font-serif mb-0 block w-50%  ">
                                <p>Work On Backend</p>
                                <p>deatail on work Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, ratione? </p>

                              <ul className="team-icon">
                                <li><a href="#" className="twitter">
                                    <i className="fa fa-twitter"></i>
                                    </a></li>
                                    <li><a href="#" className="linkedin">
                                    <i className="fa fa-linkedin"></i>
                                    </a></li>
                                   
                              </ul>


                            </div>

                        </div>
                        <div className="team-item bg-gray-300  text-center m-20 p-20  hover:bg-blue-200 rounded-lg">
                            <img src="https://images.pexels.com/photos/3852204/pexels-photo-3852204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="item-img max-w-[140px] " alt="image"/>
                            <h3  className="font-serif font-semibold text-center mt-6 m-auto">Suraj Kumar</h3>
                            <div className="item-info font-serif mb-0 block ">
                                <p>Work On Backend</p>
                                <p>deatail on work Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ea numquam excepturi sequi eaque cupiditate?</p>

                              <ul className="team-icon">
                                <li><a href="#" className="twitter">
                                    <i className="fa fa-twitter"></i>
                                    </a></li>
                                    <li><a href="#" className="linkedin">
                                    <i className="fa fa-linkedin"></i>
                                    </a></li>
                                   
                              </ul>


                            </div>

                        </div>
                    </div>
                    </div>

                
            </div>
        </section>
    )
}