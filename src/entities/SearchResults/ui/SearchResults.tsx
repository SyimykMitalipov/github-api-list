import { EmptyComponent, Loading, RepoCard } from 'shared/ui';
import classes from './SearchResults.module.scss';
import { useAppSelector } from 'app/providers/router/StoreProvider/hooks/redux';
import { REQUEST_STATUSES } from 'shared/constants/constants';
import { useEffect, useState } from 'react';
const SearchResults = () => {

  const [ comments, setComments ] = useState({});

  useEffect(() => {

    const comments = JSON.parse(localStorage.getItem('comments') || '{}');  
    setComments(comments);
  }, [])

  const { searchRepoResults , searchStatus } = useAppSelector((state) => state.searchResults);
  if(searchStatus === REQUEST_STATUSES.REQUESTED) return <Loading />

  if(!searchRepoResults.items) return <EmptyComponent />

  return (
    <div className={classes.repoList}>
      { searchRepoResults.items && searchRepoResults.items.map(repo => <RepoCard 
        comments={comments}
        setComments={setComments}
        repo={repo}
        key={repo.id} 
      />) }
    </div>
  )
}

export default SearchResults