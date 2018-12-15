import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/encyclopedia">
      <a>Encyclopedia</a>
    </Link>
    <Link href="/birdLog">
      <a>Log</a>
    </Link>
    <Link href="/mySightings">
    <a>My Sightings</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
  </NavStyles>
);

export default Nav;
