import React from 'react';
import './FormsControl.css';

export const Input = ({input, meta, ...props}) => {
    let haserror = meta.touched && meta.error
    return(
        <div className='formControls'>
            <input {...input} {...props}/>
            {haserror &&
            <div className='error'>{meta.error}</div>
            }
            
        </div>
    )
}