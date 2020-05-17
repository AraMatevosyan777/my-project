import React from 'react';
import loader from '../../../assets/images/loader.svg';
import module from '../common.module.css';

const Loader = () => {
    return(
        <div className={module.loader}>
            <img src={loader} alt='Loading...'/>
        </div>
    )
}

export default Loader;