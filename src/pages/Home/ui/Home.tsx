import { SearchResults } from "entities/SearchResults"
import classes from './Home.module.scss';

const Home = () => {
  return (
    <div className={classes.repoListWrapper}>
      <SearchResults />
    </div>
  )
}

export default Home