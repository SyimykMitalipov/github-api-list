import React, { FC } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate, useLocation } from "react-router-dom";

interface IPaginationProps {
  total_count: number;
}

export const PaginationCard: FC<IPaginationProps> = ({ total_count }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = +(searchParams.get("page") || 1);
  let per_page = +(searchParams.get("per_page") || 3);

  per_page = Math.min(per_page, 1000);

  const nextPage = page + 1;
  const prevPage = page - 1;

  const query = searchParams.get("q") || "";

  let lastPage = Math.ceil(total_count / per_page);
  lastPage = Math.min(lastPage, Math.ceil(1000 / per_page));
  lastPage = Math.max(lastPage, 1);

  const last = page === lastPage;
  const first = page === 1;

  const handlePaginationClick = (pageNum: number) => {
    searchParams.set("q", query);
    searchParams.set("page", pageNum.toString());
    searchParams.set("per_page", per_page.toString());

    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Pagination size="lg">
      {!first && (
        <Pagination.Prev onClick={() => handlePaginationClick(prevPage)} />
      )}
      {page > 1 && <Pagination.Item onClick={() => handlePaginationClick(1)}>1</Pagination.Item>}
      {page > 2 && <Pagination.Ellipsis disabled />}

      {page > 2 && (
        <Pagination.Item onClick={() => handlePaginationClick(prevPage)}>
          {prevPage}
        </Pagination.Item>
      )}

      {page !== lastPage && (
        <Pagination.Item active>{page}</Pagination.Item>
      )}
      {page < lastPage && (
        <Pagination.Item onClick={() => handlePaginationClick(nextPage)}>
          {nextPage}
        </Pagination.Item>
      )}
      {page < lastPage - 1 && <Pagination.Ellipsis disabled />}
      {lastPage !== 1 && total_count && (
        <Pagination.Item
          active={page === lastPage}
          onClick={() => handlePaginationClick(lastPage)}
        >
          {lastPage}
        </Pagination.Item>
      )}
      {!last && (
        <Pagination.Next onClick={() => handlePaginationClick(nextPage)} />
      )}
    </Pagination>
  );
};
