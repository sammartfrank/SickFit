import Link from 'next/link';
import NavStyles from './styles/NavStyles.js'
import User from './User.js';

const Nav = () => (
 <NavStyles>
  <User>
    {({data: { me }}) => {
     console.log(me);
     if ( me ) return <p>{ me.name }</p>;
      return <p>NoName</p>
    }}
  </User>
  <Link href="/items">
   <a>Shop</a>
  </Link>
  <Link href="/sell">
   <a>Sell</a>
  </Link>
  <Link href="/signup">
   <a>SignUp</a>
  </Link>
  <Link href="/orders">
   <a>Orders</a>
  </Link>
  <Link href="/me">
   <a>Account</a>
  </Link>
 </NavStyles>
)
export default Nav;