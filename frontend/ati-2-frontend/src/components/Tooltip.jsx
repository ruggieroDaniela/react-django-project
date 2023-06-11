import "../styles/Tooltip.scss"

export const Tooltip = ({title, text}) => {
    return(<>
        <div className="tooltip-container">
            <h1>{title}</h1>
            <div>
                {text}
            </div>
        </div>
    </>);
}