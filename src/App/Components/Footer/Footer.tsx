import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

function FooterHome() {
  const date = new Date();

  return (
    <Footer container className="flex flex-wrap  bg-[#e0dedb] ">
      <Footer.Copyright by="Familink™" href="/home" year={date.getFullYear()} />
      <div className="flex flex-wrap gap-3">
        <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
          A propos
        </Link>
        <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>
          Politique de confidentialité
        </Link>
        <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
          Contact
        </Link>
      </div>
    </Footer>
  );
}

export default FooterHome;
