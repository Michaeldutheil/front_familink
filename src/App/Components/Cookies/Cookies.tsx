import { useState, useEffect } from 'react';
import './cookies.css';

function Cookies() {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

  const handleAccept = () => {
    // Code pour gérer l'acceptation des cookies
    setShowBanner(false);
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const handleDecline = () => {
    // Code pour gérer le refus des cookies
    setShowBanner(false);
    setCookiesAccepted(false);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  useEffect(() => {
    const hasAcceptedCookies =
      localStorage.getItem('cookiesAccepted') === 'true';
    if (hasAcceptedCookies) {
      setShowBanner(false);
      setCookiesAccepted(true);
    }
  }, []);

  if (!showBanner) {
    return null; // Ne rend rien si la bannière ne doit pas être affichée
  }

  return (
    <div className={`cookie-banner ${showBanner ? 'show' : 'hide'}`}>
      <span className="cookie-banner-text">
        Nous utilisons des cookies pour améliorer votre expérience sur notre
        site. En continuant à naviguer, vous acceptez notre utilisation des
        cookies.
      </span>
      <div className="mt-2">
        <button
          type="button"
          className="cookie-banner-button"
          onClick={handleAccept}
        >
          Accepter
        </button>
        <button
          type="button"
          className="cookie-banner-button"
          onClick={handleDecline}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}

export default Cookies;
