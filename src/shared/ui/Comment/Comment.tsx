import { IRepo } from "entities/SearchResults/types/searchResultsSchema"
import { FormFields } from "../RepoCard/RepoCard"
import { FC } from "react"
import classes from './Comment.module.scss'
import edit from 'shared/assets/icons/edit.svg';


interface ICommentProps {
    repo: IRepo,
    comments: Record<number, string>,
    handleSubmit: (event:React.FormEvent<HTMLFormElement & FormFields> ) => void;
    onDelete: (commentId: number) => void;
}

export const Comment: FC<ICommentProps> = ({ comments, repo, handleSubmit, onDelete }) => {
  return <>
      {comments[repo.id] 
            ? <div className={classes.comment}>
                <p>{comments[repo.id]}</p> 
                <button className={classes.removeButton} onClick={() => onDelete(repo.id)}>
                    Удалить комментарий
                </button>
            </div>
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
  </>
}

