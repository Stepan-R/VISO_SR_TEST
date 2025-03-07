import { Link } from 'react-router-dom';
import classes from '../styles/Header.module.css';
import { useSelector } from 'react-redux';
import { Meal } from '../interfaces/Interfaces';

export const Header = () => {
  const collectedProducts = useSelector((state: { collectedProducts: { collected: Meal[] } }) => state.collectedProducts.collected);

  return (
    <div className={classes.header_layout}>
      <Link 
        to='/'
        className={classes.header_h1}>
          Gordon Menu
      </Link>
      <Link 
        to='/collection'
      >
        <img src="/book.svg" alt='book' className={classes.book_link} />
        <div className={classes.circle}>
          <p className={classes.numberOf} >{collectedProducts.length}</p>
        </div>
      </Link>
    </div>
  )
}