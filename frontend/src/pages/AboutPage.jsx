export default function AboutPage(){
    let message = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates amet vero fuga odit quo neque iure deleniti. Qui architecto ipsa fugit sint facere repellendus aut est illum, corporis impedit distinctio!`
    return (
        <section className="section-white">
            <div className="container">
                <div className="row">
                     
                    <div className="col-md-12 text-center">
                        <h2 className="section-title">
                            The Team Behind Project
                        </h2>
                        <p className="section-subtitle">{message}</p>
                    </div>

                </div>
            </div>
        </section>
    )
}