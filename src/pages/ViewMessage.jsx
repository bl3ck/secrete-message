import { Timestamp, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useReducer, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"
import Loading from "../components/Loading"
import { INITIAL_STATE, ViewMessageReducer } from "../ViewMessageReducer"


export default function ViewMessage(){
    const {messageID} = useParams()

    const [state, dispatch] = useReducer(ViewMessageReducer, INITIAL_STATE)

    useEffect( () => {
        ( async (entryId) => {
            dispatch({type:'FETCH_START'})
            const docRef = doc(db, 'messages', entryId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const data = { ...docSnap.data(), id: docSnap.id };
                let expired = false
                const timeNow = Timestamp.now().toDate()
                if (data.durationType == 'views'){
                    const newDuration = data.duration - 1;
                    await updateDoc (docRef, {
                        duration: newDuration
                    })
                    if(data.duration < 1) expired = true
                } else if (data.durationType == 'hours' || data.durationType == 'days'){
                    const expirationTime = data.expirationTime.toDate()
                    expired = timeNow > expirationTime ? true : false
                }
                dispatch({type:'FETCH_SUCCESS', payload: {...data, expired}})
            } else {
                dispatch({type:'FETCH_ERROR'})
            }
        }
        )(messageID)
    }, [])

    return(
        <>
            { state.isLoading ? 
               <Loading />
            :
            <>
            {
                !state.hasExpired && state.hasExpired != undefined && 
                <>
                    <p>Message ID:</p>
                    <h1>{state.message?.id}</h1>
                </>
            }
                <p className={`v-message ${(state.hasExpired != undefined && !state.hasExpired) ? 'active' : 'expired' }`}>{state.message?.msg}</p> 
            </>
            }
        </>
    )
}