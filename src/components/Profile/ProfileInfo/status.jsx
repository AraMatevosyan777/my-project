import React, { useState, useEffect } from 'react';

const Status = (props) => {
    const [status, setStatus] = useState(props.status);
    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{
        setStatus(props.status);
    },[props.status])

    const activateEditMode = () => {
        if(props.isOwner){
            setEditMode(true);
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    return(
        <div className='status'>
            {editMode &&
                <input onBlur={deactivateEditMode} onChange={(e)=>setStatus(e.currentTarget.value)} 
                value={status} autoFocus/> 
                
            }
            {!editMode && 
                <span onDoubleClick={activateEditMode}>{status || "No status"}</span>
            }
        </div>
    )
}

export default Status;