import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { MdOutlineVerified } from "react-icons/md";

export default function UserProfileBadge(props) {
  return (
    // <a href={`/bud/${props?.connection?.id}`}>
    <Row className="items-center my-2">
      <Col xs={3} className="w-fit">
        <img
          src={props?.connection?.profile_picture}
          width={50}
          alt="profile"
          className="border-black border-2 h-[3rem] w-[3rem] object-cover rounded-full"
        />
      </Col>
      <Col xs={9}>
        <p className="m-0 flex">
          {props?.connection?.profile_name}
          <span className="mx-2">
            {props?.connection?.is_verified && <MdOutlineVerified />}
          </span>
        </p>
        <p>{props?.connection?.name}</p>
        <p>#{props?.connection?.id}</p>
      </Col>
    </Row>
    // </a>
  );
}

// Props validation
UserProfileBadge.propTypes = {
  connection: PropTypes.shape({
    profile_picture: PropTypes.string,
    profile_name: PropTypes.string,
    is_verified: PropTypes.bool,
    id: PropTypes.number,
  }),
};
