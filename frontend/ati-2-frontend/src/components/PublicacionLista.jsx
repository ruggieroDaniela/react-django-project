import { useTransition } from "react"

import "../styles/PostLista.scss"

export const PublicacionLista = ({post}) => {
    return(<>
        <div className="post-lista">
            <div>x</div>
            <div>foto</div>
            <div className="detalles">
                <span className="title">{post.service}</span>
                <span className="subtitle">{post.country}</span>
                {post.id}
            </div>
            <div>x</div>
        </div>
    </>);
}