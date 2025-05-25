import PropTypes from "prop-types";

export default function Card(props) {
  return (
    <div className="p-4 shadow-md rounded-xl bg-amber-300">
      {props.children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
