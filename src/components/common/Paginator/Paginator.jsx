import React, { useState } from 'react';
import module from '../common.module.css';
import classnames from 'classnames';

const Paginator = (props) => {

    let pagesCount = props.totalCount / props.pageSize;
    let pages = [];
    for( let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }

    let portionSize = 10;
    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return(
        <div className={module.paginator}>
            {portionNumber > 1 &&
               <span onClick={() => { setPortionNumber(portionNumber - 1) }}>&laquo;</span>
            }
            {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => <span key={page} onClick={()=> props.setPage(page)}
            className={classnames(props.page === page && module.currentPage)} >{page}</span>)}
            {portionCount > portionNumber &&
               <span onClick={() => { setPortionNumber(portionNumber + 1) }} >&raquo;</span>
            }
        </div>
    )
}

export default Paginator;