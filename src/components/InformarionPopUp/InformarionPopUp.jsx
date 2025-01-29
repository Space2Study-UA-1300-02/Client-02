import s from "./InformationPopUp.module.css";


const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
      setIsOpen(false);""
  };

  return (
      isOpen && (
          <div className="overlay" onClick={(event) => {
              const popup = document.getElementById("popup");
              if (!popup.contains(event.target)) {
                  event.stopPropagation();
              }
          }}>
              <div className="popup" id="popup">
                  <button className="close-btn" onClick={closePopup}>&times;</button>
                  <h2>Your email address needs to be verified</h2>
                  <p>We sent a confirmation email to: <strong>eb5oio0p@kzccv.com</strong></p>
                  <p>Check your email and click on the confirmation button to continue.</p>
                  <button onClick={closePopup}>OK</button>
              </div>
          </div>
      )
  );
};
export default Popup;
