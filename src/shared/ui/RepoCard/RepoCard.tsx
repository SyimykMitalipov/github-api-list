import { IRepo } from 'entities/SearchResults/types/searchResultsSchema';
import classes from './RepoCard.module.scss'
import star from 'shared/assets/icons/star.svg';
import watches from 'shared/assets/icons/watch.svg'
import edit from 'shared/assets/icons/edit.svg';
import { Dispatch, SetStateAction, FC } from 'react';

interface IComment {
  id: number,
  comment: string,
}


interface IRepoCardProps {
  repo: IRepo,
  setComments:  Dispatch<SetStateAction<IComment>>,
  comments: Record<number, string>;
}

type FormFields = {
  comment: HTMLInputElement;
};

export const RepoCard: FC<IRepoCardProps> = ({ repo, setComments, comments}) => {
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement & FormFields>) => {
    event.preventDefault();
    const comment =  event.currentTarget.comment.value;
    setComments((prevComments) => {
      const newComments = { ...prevComments, [repo.id]: comment }
      localStorage.setItem('comments', JSON.stringify(newComments))
      return newComments;
    })
  }
  return (
    <div className={classes.repoCard}>
          <a href={repo.html_url} target='_blank' rel="noreferrer">
            <p className={classes.repoName}>{repo.name}</p>
          </a>
          <div className={classes.ownerInfo}>
              <img src={repo.owner.avatar_url} alt="" />
              <a href={repo.owner.html_url} target='_blank' rel="noreferrer">
                <p>{repo.owner.login}</p>
              </a>
          </div>

          <div className={classes.repoRating}>
            <div className={classes.starRating}>
              <img src={star} alt="" />
              <p>{repo.watchers}</p>
            </div>
            <div className={classes.starRating}>
              <img src={watches} alt="" />
              <p>{repo.forks}</p>
            </div>
          </div>
            {comments[repo?.id] 
            ? <p>{comments[repo?.id]}</p> 
            : <form className={classes.repoComment} onSubmit={handleSubmit}>
            <input 
              className={classes.commentInput} 
              placeholder='Комментарий к проекту' 
              name='comment'
              type="text" 
             />
            <button>
              <img src={edit} alt="" />
            </button>
        </form> }
    </div>
  )
};