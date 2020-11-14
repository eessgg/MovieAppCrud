import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log(currentPage)

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1)

  return (
    <div className="mt-5"> 
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {pages.map((page) => (
            <li
              key={page}
              class="page-item"
              className={page === currentPage ? "page-item active" : "page-item"}
            >
              <a class="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;