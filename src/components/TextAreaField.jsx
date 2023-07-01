export default function TextAreaInput({label,name,placeholder='',row='5',cols='30',fieldRef,error}){
    return(
        <>
            { label && <label htmlFor={name}>{label}</label> }
            <textarea name={name} id={name} placeholder={placeholder} cols={cols} ref={fieldRef} rows={row}></textarea>
            <span className="error">{error}</span>
        </>
    )
}