import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';

function ExpandCollapse(props) {
    let expanded;
    let icon;
    let color;

    switch (props.expandMode) {
        case 'expanded':
            expanded = true;
            icon = 'minus-square';
            color = undefined;
            break;
        case 'collapsed':
            expanded = false;
            icon = 'plus-square';
            color = undefined;
            break;
        default:
        case 'hidden':
            expanded = false;
            icon = 'plus-square';
            color = 'transparent';
            break;
    }

    return (
        <Icon
            icon={icon}
            color={color}
            style={{
                marginRight: 5
            }}
            onClick={() => props.onSetExpanded(!expanded)} />
    );
}

ExpandCollapse.propTypes = {
    expandMode: PropTypes.oneOf(['expanded', 'collapsed', 'hidden']).isRequired,
    onSetExpanded: PropTypes.func.isRequired
};

export default ExpandCollapse;