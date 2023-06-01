import { useTransition } from "react"

import "../styles/PostLista.scss"

export const PublicacionLista = ({post}) => {
    return(<>
        <div className="post-lista">
            <section>x</section>
            <section>foto</section>
            <section className="detalles">

                <div className="column">
                    <div className="header-grid">
                        <div className="detalles-title">{post.service}</div>
                        <div className="subtitle">{post.country}</div>
                        <div>
                            <div className="bold-subtitle">estado: <span className="blue-body">{post.state}</span></div>
                            <div className="bold-subtitle">ciudad: <span className="blue-body">{post.city}</span></div>
                        </div>
                        <div>
                            <div className="bold-subtitle">{post.user}</div>
                            <div className="bold-subtitle">{post.age}</div>
                        </div>
                    
                    </div>
                    <div className="title">{post.publication_time}</div>
                    <div className="desc-body">{post.description}</div>
                    <div className="info-and-contact">
                        <ul className="info-list">
                            <li>
                                <span className="item-title">instrucción: </span> 123 
                            </li>
                            <li>
                                <span className="item-title">perfil laboral: </span><a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">funciones: </span><a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">documentacion: </span><a href="" className="item-link">Ver detalles</a>
                            </li>
                        </ul>
                        <button>contactar</button>
                    </div>
                    <a href="" className="title link">mas info</a>
                </div>

                <div className="column">
                    <div className="info-container">
                        <div className="container-title">
                            condiciones de trabajo
                        </div>
                        <ul className="info-list">
                            <li>
                                <span className="item-title">salario: </span> 123 
                            </li>
                            <li>
                                <span className="item-title">beneficios: </span>No / Si <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">disponibilidad: </span> 0/0/0
                            </li>
                            <li>
                                <span className="item-title">viajar: </span> Si. <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">horario: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">salidas: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">condiciones: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li>
                                <span className="item-title">clientes: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                        </ul>
                    </div>
                    <a href="" className="title link">mas info</a>
                </div>
            </section>
            <section>x</section>
        </div>
    </>);
}