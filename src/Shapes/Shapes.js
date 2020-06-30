import PropTypes, { number } from 'prop-types';

export const ShapePost = PropTypes.shape({
  i: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

const PostShapes = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

export const ShapePostsList = PropTypes.shape({
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(PostShapes).isRequired,
});

export const ShapePages = PropTypes.shape({
  changePage: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(number).isRequired,
});
