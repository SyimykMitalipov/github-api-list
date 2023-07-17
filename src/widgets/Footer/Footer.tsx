import classes from './Footer.module.scss'
import { Pagination } from 'entities/Pagination';
import { DropDown } from 'shared/ui';
const Footer = () => {
  
  return (
    <footer className={classes.footer}>
      <DropDown />
      <Pagination />
    </footer>
  )
}

export default Footer