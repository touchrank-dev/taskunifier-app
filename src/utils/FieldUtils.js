import { getFieldConfiguration } from 'data/DataFieldConfigurations';

export const getWidthForType = type => {
    return getFieldConfiguration(type).width;
};

export const isAlwaysInEditionForType = type => {
    return getFieldConfiguration(type).alwaysInEdition;
};

export const isCommitOnChangeForType = type => {
    return getFieldConfiguration(type).commitOnChange;
};

export const isHandleToggleEdit = type => {
    return getFieldConfiguration(type).handleToggleEdit;
};

export const getNormalizeForType = type => {
    return getFieldConfiguration(type).normalize;
};

export const getValuePropNameForType = type => {
    return getFieldConfiguration(type).valuePropName;
};

export const getValueFromEventForType = type => {
    return getFieldConfiguration(type).getValueFromEvent;
};

export const getRenderForType = (type, options, value, props) => {
    return getFieldConfiguration(type, options).render(value, props);
};

export const getInputForType = (type, options, props) => {
    return getFieldConfiguration(type, options).input(props);
};

export const getSelectForType = type => {
    return getFieldConfiguration(type).select();
};

export const getConditionsFieldTypeForType = type => {
    return getFieldConfiguration(type).conditionsFieldType;
};