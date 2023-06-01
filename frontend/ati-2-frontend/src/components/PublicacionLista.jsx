import { useTransition } from "react"

import "../styles/PostLista.scss"

export const PublicacionLista = ({post}) => {
    return(<>
        <div key={`post ${post.id}`} className="post-lista">
            <section key={`post ${post.id} buttons 1`}>
                x
            </section>
            
            <section key={`post ${post.id} foto`}>
                foto
            </section>

            <section key={`post ${post.id} details`} className="detalles">

                <div className="column" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                    <div className="header-grid" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <div>
                            <div className="detalles-title" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {post.service}
                            </div>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {post.user}
                            </div>
                            <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {post.age} años
                            </div>
                        </div>
                        <div className="subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            {post.country}
                        </div>
                        <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                estado: <span className="blue-body">{post.state}</span>
                            </div>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                ciudad: <span className="blue-body">{post.city}</span>
                            </div>
                        </div>
                    
                    </div>
                    <div className="title" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        {post.publication_time}
                    </div>
                    <div className="desc-body">{post.description}</div>
                    <div className="info-and-contact">
                        <ul className="info-list">
                            <li key={`post ${post.id} instruccion`}>
                                <span className="item-title">instrucción: </span> {post.education_level} 
                            </li>
                            <li key={`post ${post.id} perfil laboral`}>
                                <span className="item-title">perfil laboral: </span><a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} funciones`}>
                                <span className="item-title">funciones: </span><a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} documentacion`}>
                                <span className="item-title">documentacion: </span><a href="" className="item-link">Ver detalles</a>
                            </li>
                        </ul>
                        <button>contactar</button>
                    </div>
                    <div className="more-info">
                        <a href="" className="title link">mas info</a>
                    </div>
                </div>

                <div className="column">
                    <div className="info-container">
                        <div className="container-title">
                            condiciones de trabajo
                        </div>
                        <ul className="info-list">
                            <li key={`post ${post.id} salario`}>
                                <span className="item-title">salario: </span> {post.payment_amount} {post.currency} 
                            </li>
                            <li key={`post ${post.id} beneficios`}>
                                <span className="item-title">beneficios: </span>No / Si <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} disponibilidad`}>
                                <span className="item-title">disponibilidad: </span> {post.availability_date}
                            </li>
                            <li key={`post ${post.id} viajar`}>
                                <span className="item-title">viajar: </span> Si. <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} horario`}>
                                <span className="item-title">horario: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} salidas`}>
                                <span className="item-title">salidas: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} condiciones`}>
                                <span className="item-title">condiciones: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                            <li key={`post ${post.id} clientes`}>
                                <span className="item-title">clientes: </span> <a href="" className="item-link">Ver detalles</a>
                            </li>
                        </ul>
                    </div>
                    <div className="more-info">
                        <a href="" className="title link">mas info</a>
                    </div>
                </div>
            </section>
            <section>x</section>
        </div>
    </>);
}