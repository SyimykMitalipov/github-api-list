import { useAppDispatch , useAppSelector} from "app/providers/router/StoreProvider/hooks/redux";
import { getSearchResults } from "entities/SearchResults/model/searchResultsSlice";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PaginationCard } from "shared/ui";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const perPage = searchParams.get('per_page') || '6';
  const query = searchParams.get('q');
  const page = searchParams.get('page');

  const total_count = useAppSelector((state) => state.searchResults.searchRepoResults.total_count);

  useEffect(() => {
    searchParams.set('q', query || '');
    searchParams.set('per_page', perPage);
    searchParams.set('page', page || '1');
    navigate({ search: searchParams.toString() });
  }, [query, page, perPage, navigate]);

  useEffect(() => {
    dispatch(getSearchResults({
      q: query,
      per_page: perPage,
      page: page || '1',
    }));
  }, [query, page, dispatch, perPage]);

  return (
    <>
      <PaginationCard total_count={total_count} />
    </>
  );
};

export default Pagination;
