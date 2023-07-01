import { useContext } from "react"
import FlashProvider, { FlashContext } from "../contexts/FlashProvider"

export default function FlashMessage(){
    const {flashMessage, visible, hideFlash} = useContext(FlashContext)
    return(
        <>
            { visible && <p onClick={hideFlash} className="error" type={flashMessage.type || 'default'}>{flashMessage.message}</p>}
        </>
    )
}