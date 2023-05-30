import { useTransition } from "react"

import "../styles/PostLista.scss"

export const PublicacionLista = ({post}) => {
    return(<>
        <div className="post-lista">
            <div>x</div>
            <div>foto</div>
            <div className="detalles">
                <div className="title">{post.service}</div>
                <div className="subtitle">{post.country}</div>
                <div className="bold-subtitle">estado: <span className="blue-body">{post.state}</span></div>
                <div className="bold-subtitle">ciudad: <span className="blue-body">{post.city}</span></div>
                <div className="bold-subtitle">{post.user}</div>
                <div className="bold-subtitle">{post.age}</div>
                <div className="title">{post.publication_time}</div>
                <div className="desc-body">{post.description}</div>
            </div>
            <div>x</div>
        </div>
    </>);
}