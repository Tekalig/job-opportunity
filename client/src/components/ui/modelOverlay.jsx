import PropTypes from "prop-types";

export default function ModelOverlay(props) {
  return (
    <div className="fixed top-[20vh] p-4 left-[20%] w-7/12 bg-amber-300 shadow-md rounded-2xl z-40">
      <div className="">{props.children}</div>
    </div>
  );
}

ModelOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};
