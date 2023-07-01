import { useRef } from "react"

export default function RadioField({name,values,id,fieldRef,error}){
    return(
        <>
            <div className="flex gap-x-4 mb-2">
                {
                    values.map( ({label, value}, index) => {
                        const ref = useRef()
                        fieldRef.current[index] = ref
                        RadioField.current
                        return(
                            <div key={value}>
                                <label htmlFor={id}><input type="radio" ref={ref} value={value} name={name} id={id} /> {label}</label>
                            </div>
                        )
                    })
                }
            </div>
            <span className="error">{error}</span>
        </>
    )
}