import PropTypes from 'prop-types';

export const StatusPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string
});