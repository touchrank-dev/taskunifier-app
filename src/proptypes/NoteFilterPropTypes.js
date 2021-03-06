import PropTypes from 'prop-types';
import { SorterPropType } from 'proptypes/SorterPropTypes';

export const NoteFilterPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    directory: PropTypes.string,
    sorters: PropTypes.arrayOf(SorterPropType.isRequired),
    condition: PropTypes.object
});