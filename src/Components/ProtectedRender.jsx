import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function ProtectedRender(props) {
  const location = useLocation();
  const paths = props.paths || [];
  const element = props.element || <></>;

  // Check if location.pathname matches any path or starts with a path that ends with '*'
  const included = paths.some((path) => {
    if (path.endsWith('*')) {
      const basePath = path.slice(0, -1); // Remove the '*' at the end
      return location.pathname.startsWith(basePath);
    } else {
      return path === location.pathname;
    }
  });

  return included && <>{element}</>;
}

// Props validation
ProtectedRender.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string),
  element: PropTypes.element,
};
