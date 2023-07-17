import classes from './EmptyComponent.module.scss';

export const EmptyComponent = () => {
  return (
    <div className={classes.emptyWrapper}>
        <h2>Пока что все пусто :( Попробуйте поиcкать другие репозитории</h2>
    </div>
  )
}

