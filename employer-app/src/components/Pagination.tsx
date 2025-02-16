const Pagination = () => {
  return (
    <nav
      data-testid="pagination"
      className="pagination-container"
      aria-label="Pagination"
    >
      <ul className="pagination">
        <li>
          <button
            className="btn-primary"
            type="button"
            disabled
            aria-disabled="true"
            aria-label="Previous page"
          >
            Prev
          </button>
        </li>

        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`btn-primary ${pageNumber === 1 ? "active" : ""}`}
              type="button"
              aria-current={pageNumber === 1 ? "page" : undefined}
              aria-label={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        <li>
          <button className="btn-primary" type="button" aria-label="Next page">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
