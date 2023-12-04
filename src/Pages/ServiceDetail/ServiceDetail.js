import { useContext, useState } from "react";
import { ShoppingCarContext } from "../../Context";
import { Layout } from "../../Components/Layout/Layout";
import "./style.css";
import { Link } from "react-router-dom";

function ServiceDetail() {
    const context = useContext(ShoppingCarContext);
    console.log(context.productDetail)
    let product = context.productDetail;
    console.log(product);
    return (
        <Layout>
            <section className="pt-3 pb-3">
                <div className="container">
                    <nav className="breadcrumb-nav" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/shop">Home</Link></li>
                            <li className="breadcrumb-item"><Link to={"/shop"}>Category X</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{context.productDetail.nombre}</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-12 col-sm-7">
                            <div id="carouselExampleIndicators" className="carousel slide">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={context.productDetail.urlImagen} alt="Manicura 2" className="d-block w-100" />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-sm-5">
                            <div className="card pt-3 pb-3 px-4">
                                <div className="d-flex justify-content-between">
                                    <label for=""><strong>{context.productDetail.nombre}</strong></label>
                                    <label for=""><strong> ${context.productDetail.precio}</strong></label>
                                </div>
                                <hr />
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label">Cantidad</label>
                                    <input type="number" className="form-control" id="exampleFormControlInput1"
                                    onChange={ (event) => {
                                        product.cant = event.target.value;
                                    }} />
                                </div>
                                <hr />
                                <Link to={"/shopping-car"}>
                                <button type="button" className="btn btn-primary" style={{ background: '#741b47', borderColor: 'black' }}
                                    onClick={() => {
                                        const products = context.addedProducts;
                                        products.push(product);
                                        context.setAddedProducts(products);
                                        context.setContador(context.addedProducts.length);
                                      }}>
                                    Agregar al carrito
                                </button>
                                </Link>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="products" className="mt-4" style={{ marginLeft: '2.5%', marginRight: '2.5%' }}>
                <h5>Técnicas disponibles</h5>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xs-6 col-md-3 col-lg-2 mb-4">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/7664093/pexels-photo-7664093.jpeg?auto=compress&cs=tinysrgb&w=1600" className="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="col-12 col-xs-6 col-md-3 col-lg-2 mb-4">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/3557600/pexels-photo-3557600.jpeg?auto=compress&cs=tinysrgb&w=1600" className="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="col-12 col-xs-6 col-md-3 col-lg-2 mb-4">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/5871223/pexels-photo-5871223.jpeg?auto=compress&cs=tinysrgb&w=1600" className="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="col-12 col-xs-6 col-md-3 col-lg-2 mb-4">
                            <div className="card">
                                <img src="https://images.pexels.com/photos/4677845/pexels-photo-4677845.jpeg?auto=compress&cs=tinysrgb&w=1600" className="card-img-top" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    );
}

export { ServiceDetail };