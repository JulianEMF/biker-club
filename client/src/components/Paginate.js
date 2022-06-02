import React from 'react';
// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin=false, keyword='' }) => {
    return pages > 1 && (
        <div>
            {[...Array(pages).keys()].map(x => (
                <Link 
                    key={x+1} 
                    to={!isAdmin ? keyword ?`/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/admin/productlist/${x+1}`}>
                    {/* <span active={x+1 === page}>{x+1}</span> */}
                </Link>
            ))}
        </div>
    )
};

export default Paginate;
