export default function InputField({label,type,name,fieldRef,error}){
    return(
        <>
            <div>
                { label && <label htmlFor={name}>{label}</label> } 
                <input type={type || 'text'} name={name} id={name} ref={fieldRef} />
                <span className="error">{error}</span>
            </div>
        </>
    )
}