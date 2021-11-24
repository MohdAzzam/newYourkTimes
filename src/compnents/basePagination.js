import React, {useState} from "react";
import Pagination from "react-js-pagination";

export default function BasePagination
    ({
         totalItemsCount,
         currentPageParam,
         pageRangeDisplayed = 5,
         perPage = 10,
         linkClass = "page-link",
         activeClass = "active-link",
         onChange
     }) {

    const [currentPage, setCurrentPage] = useState(currentPageParam);
    const handlePageChange = () => {
        console.log('sss');
    }
    return (
        <div className="pagination-wrapper d-flex justify-content-center">
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={perPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                linkClass={linkClass}
                activeClass={activeClass}
                disabledClass="disabled-link"
                onChange={handlePageChange}
            />


        </div>
    );
}