import ReactDOM from "react-dom";
import BackDrop from "./backDrop.jsx";
import ModelOverlay from "./modelOverlay.jsx";
import JobDetails from "../components/jobdetails.jsx";

function Model() {
  const portalElements = document.querySelector("#overlay");
  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, portalElements)}
      {ReactDOM.createPortal(
        <ModelOverlay>
          <JobDetails />
        </ModelOverlay>,
        portalElements
      )}
    </>
  );
}

export default Model;
