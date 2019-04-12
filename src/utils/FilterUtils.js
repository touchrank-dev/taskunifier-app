import { getConditionsForType } from "./FieldUtils";
import { getValue } from "./ObjectUtils";

export const applyFilter = (filter, tasks, fields) => {
    if (!filter || !filter.condition) {
        return tasks;
    }

    return tasks.filter(task => applyCondition(filter.condition, task, fields));
}

const applyCondition = (condition, task, fields) => {
    const field = fields.find(field => field.id === condition.field);

    if (!condition || !field) {
        return true;
    }

    if (condition.operator) {
        if (!condition.conditions || condition.conditions.length === 0) {
            return true;
        }

        switch (condition.operator) {
            case 'AND': {
                let result = true;

                for (let i = 0; i < condition.conditions.length; i++) {
                    result = result && applyCondition(condition.conditions[i], task, fields);

                    if (!result) {
                        return false;
                    }
                }

                return result;
            }
            case 'OR': {
                let result = false;

                for (let i = 0; i < condition.conditions.length; i++) {
                    result = result || applyCondition(condition.conditions[i], task, fields);

                    if (result) {
                        return true;
                    }
                }

                return result;
            }
            case 'NOT': {
                return !applyCondition(condition.conditions[0], task, fields);
            }
            default: {
                return true;
            }
        }
    } else {
        const c = getConditionsForType(field.type).find(c => c.type === condition.type);

        if (!c) {
            return true;
        }

        return c.apply(condition.value, getValue(task, field.path));
    }
}

export const getConditionsForCheckbox = () => {
    return [
        {
            type: 'equals',
            title: 'Equals',
            apply: (conditionValue, taskValue) => {
                return conditionValue === taskValue;
            }
        },
        {
            type: 'not_equals',
            title: 'Does not equal',
            apply: (conditionValue, taskValue) => {
                return conditionValue !== taskValue;
            }
        }
    ]
}

export const getConditionsForNumber = () => {
    return [
        {
            type: 'equals',
            title: 'Equals',
            apply: (conditionValue, taskValue) => {
                return conditionValue === taskValue;
            }
        },
        {
            type: 'not_equals',
            title: 'Does not equal',
            apply: (conditionValue, taskValue) => {
                return conditionValue !== taskValue;
            }
        }
    ]
}

export const getConditionsForText = () => {
    return [
        {
            type: 'equals',
            title: 'Equals',
            apply: (conditionValue, taskValue) => {
                return conditionValue === taskValue;
            }
        },
        {
            type: 'not_equals',
            title: 'Does not equal',
            apply: (conditionValue, taskValue) => {
                return conditionValue !== taskValue;
            }
        },
        {
            type: 'contains',
            title: 'Contains',
            apply: (conditionValue, taskValue) => {
                return (taskValue || '').includes(conditionValue);
            }
        },
        {
            type: 'not_contains',
            title: 'Does not contain',
            apply: (conditionValue, taskValue) => {
                return !(taskValue || '').includes(conditionValue);
            }
        }
    ]
}