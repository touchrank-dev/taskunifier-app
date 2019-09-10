import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import { getContactsFilteredByVisibleState } from 'selectors/ContactSelectors';
import { getContactTitle } from 'utils/ContactUtils';

export const ContactSelect = React.forwardRef(function ContactSelect(props, ref) {
    const contacts = useSelector(getContactsFilteredByVisibleState);
    const value = contacts.find(contact => contact.id === props.value) ? props.value : null;

    return (
        <Select ref={ref} allowClear={true} {...props} value={value}>
            {contacts.map(contact => (
                <Select.Option key={contact.id} value={contact.id}>
                    <Icon icon="circle" color={contact.color} text={getContactTitle(contact)} />
                </Select.Option>
            ))}
        </Select>
    );
});

ContactSelect.displayName = 'ForwardRefContactSelect';

ContactSelect.propTypes = {
    value: PropTypes.string
};

export default ContactSelect;