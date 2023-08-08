import './error.css';

import errorImage from '../../assets/Icon/404.svg';

function Error() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="">404 Page Non Trouvée</p>

      <img className="invert" src={errorImage} alt="" />
    </div>
  );
}

export default Error;
