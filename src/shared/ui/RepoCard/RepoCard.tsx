import { IRepo } from 'entities/SearchResults/types/searchResultsSchema';
import classes from './RepoCard.module.scss'
import star from 'shared/assets/icons/star.svg';
import watches from 'shared/assets/icons/watch.svg'
import { Dispatch, SetStateAction, FC } from 'react';
import { Comment } from '../Comment/Comment';

export interface IComment {
  id: number,
  comment: string,
}


interface IRepoCardProps {
  repo: IRepo,
  setComments:  Dispatch<SetStateAction<Record<number, string>>>,
  comments: Record<number, string>;
}

export type FormFields = {
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

  const handleDeleteComment = (commentId: number) => {
     setComments((prevComments) => {
      delete prevComments[commentId]
      localStorage.setItem('comments', JSON.stringify(prevComments))
      return {...prevComments};
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
          <Comment
            onDelete={handleDeleteComment}
            repo={repo} 
            comments={comments}
            handleSubmit={handleSubmit}
           />
    </div>
  )
};