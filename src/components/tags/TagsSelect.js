import React from 'react';
import PropTypes from 'prop-types';
import { TagPropType } from '../../proptypes/TagPropTypes';
import { Select, Tag } from 'antd';
import withTags from '../../containers/WithTags';

function TagsSelect(props) {
    const { tags, ...restProps } = props;

    restProps.value = props.tags.find(tag => tag.id === restProps.value) ? restProps.value : null;

    return (
        <Select mode="tags" allowClear={true} {...restProps}>
            {tags.map(tag => (
                <Select.Option key={tag.id} value={tag.id}>
                    <Tag color={tag.color}>{tag.title}</Tag>
                </Select.Option>
            ))}
        </Select>
    );
}

TagsSelect.propTypes = {
    tags: PropTypes.arrayOf(TagPropType).isRequired
}

export default withTags(TagsSelect);