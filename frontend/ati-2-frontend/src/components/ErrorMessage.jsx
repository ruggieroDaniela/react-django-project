const ErrorMessage = ({message}) => {
    const style = {
        marginTop: "0.5em",
        gridColumn: "1/-1",
        marginBottom: "1em",
        fontSize: "13px",
        borderRadius: "4px", 
        padding: "4px", 
        width: "97.5%",
        paddingLeft: "15px", 
        color: "#D8000C",
		backgroundColor: "#FFBABA"
    }

    return ( <div style={style} > {message}  </div>)
}

export  default ErrorMessage