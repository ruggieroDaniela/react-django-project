import { useTransition } from "react"
import { useTranslation } from 'react-i18next'

import "../styles/PostLista.scss"

export const PublicacionLista = ({post}) => {

    const {t} = useTranslation();

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
                                {t(`publicaciones_vista_lista.${post.service}`)}
                            </div>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {post.user}
                            </div>
                            <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {post.age} {t(`publicaciones_vista_lista.años`)}
                            </div>
                        </div>
                        <div className="subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            {post.country}
                        </div>
                        <div key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {t(`publicaciones_vista_lista.estado`)}: <span className="blue-body">{post.state}</span>
                            </div>
                            <div className="bold-subtitle" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                                {t(`publicaciones_vista_lista.ciudad`)}: <span className="blue-body">{post.city}</span>
                            </div>
                        </div>
                    
                    </div>
                    <div className="title" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        {post.publication_time}
                    </div>
                    <div className="desc-body" key={`post ${post.id} ${self.crypto.randomUUID()}`}>{post.description}</div>
                    <div className="info-and-contact" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <ul className="info-list" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <li key={`post ${post.id} instruccion`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.grado_instruccion`)}: </span> {t(`publicaciones_vista_lista.${post.education_level}`)}
                            </li>
                            <li key={`post ${post.id} perfil laboral`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.perfil_laboral`)}: </span><a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} funciones`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.funciones_previas`)}: </span><a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} documentacion`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.documentacion`)}: </span><a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                        </ul>
                        <button key={`post ${post.id} ${self.crypto.randomUUID()}`}>{t(`publicaciones_vista_lista.contactar`)}</button>
                    </div>
                    <div className="more-info" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <a href="" className="title link" key={`post ${post.id} ${self.crypto.randomUUID()}`}>{t(`publicaciones_vista_lista.ver_informacion`)}</a>
                    </div>
                </div>

                <div className="column" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                    <div className="info-container" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <div className="container-title" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            {t(`publicaciones_vista_lista.condiciones`)}
                        </div>
                        <ul className="info-list" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                            <li key={`post ${post.id} salario`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.salario`)}: </span> {post.payment_amount} {post.currency} 
                            </li>
                            <li key={`post ${post.id} beneficios`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.beneficios`)}: </span>{t('no')} / {t('si')} <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} disponibilidad`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.disponibilidad`)}: </span> {post.availability_date}
                            </li>
                            <li key={`post ${post.id} viajar`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.viajar`)}: </span> {t('si')} . <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} horario`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.horario`)}: </span> <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} salidas`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.salidas`)}: </span> <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} condiciones`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.condiciones`)}: </span> <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                            <li key={`post ${post.id} clientes`}>
                                <span className="item-title">{t(`publicaciones_vista_lista.clientes`)}: </span> <a href="" className="item-link">{t(`publicaciones_vista_lista.ver_detalles`)}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="more-info" key={`post ${post.id} ${self.crypto.randomUUID()}`}>
                        <a href="" className="title link" key={`post ${post.id} ${self.crypto.randomUUID()}`}>{t(`publicaciones_vista_lista.ver_informacion`)}</a>
                    </div>
                </div>
            </section>
            <section key={`post ${post.id} ${self.crypto.randomUUID()}`}>x</section>
        </div>
    </>);
}