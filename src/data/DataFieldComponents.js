/* eslint react/display-name: 0 react/prop-types: 0 */

import React from 'react';
import moment from 'moment';
import { Checkbox, Input, InputNumber, Progress, Select, Tag } from 'antd';
import { getFieldType } from 'data/DataFieldTypes';
import ColorPicker from 'components/common/ColorPicker';
import DatePicker from 'components/common/DatePicker';
import ExtendedDatePicker from 'components/common/ExtendedDatePicker';
import StarCheckbox from 'components/common/StarCheckbox';
import ContactTitle from 'components/contacts/ContactTitle';
import ContactSelect from 'components/contacts/ContactSelect';
import ContextTitle from 'components/contexts/ContextTitle';
import ContextSelect from 'components/contexts/ContextSelect';
import FolderTitle from 'components/folders/FolderTitle';
import FolderSelect from 'components/folders/FolderSelect';
import GoalTitle from 'components/goals/GoalTitle';
import GoalSelect from 'components/goals/GoalSelect';
import LengthField from 'components/common/LengthField';
import {
    LinkedContactLinksSelect,
    LinkedFileLinksSelect,
    LinkedTaskLinksSelect
} from 'components/links/LinksSelect';
import {
    LinkedContactLinksTitle,
    LinkedFileLinksTitle,
    LinkedTaskLinksTitle
} from 'components/links/LinksTitle';
import LocationTitle from 'components/locations/LocationTitle';
import LocationSelect from 'components/locations/LocationSelect';
import NoteFieldTitle from 'components/notefields/NoteFieldTitle';
import NoteFieldSelect from 'components/notefields/NoteFieldSelect';
import NoteTitle from 'components/notes/common/NoteTitle';
import NoteSelect from 'components/notes/common/NoteSelect';
import ReminderField from 'components/common/ReminderField';
import RepeatFromField from 'components/common/RepeatFromField';
import PriorityTitle from 'components/priorities/PriorityTitle';
import PrioritySelect from 'components/priorities/PrioritySelect';
import RepeatField from 'components/repeat/RepeatField';
import SortDirectionTitle from 'components/sorters/SortDirectionTitle';
import SortDirectionSelect from 'components/sorters/SortDirectionSelect';
import StatusTitle from 'components/statuses/StatusTitle';
import StatusSelect from 'components/statuses/StatusSelect';
import TagsTitle from 'components/tags/TagsTitle';
import TagsSelect from 'components/tags/TagsSelect';
import TaskTitle from 'components/tasks/common/TaskTitle';
import TaskSelect from 'components/tasks/common/TaskSelect';
import TaskFieldTitle from 'components/taskfields/TaskFieldTitle';
import TaskFieldSelect from 'components/taskfields/TaskFieldSelect';
import TaskTemplateSelect from 'components/tasktemplates/TaskTemplateSelect';
import TimerField from 'components/common/TimerField';
import { TaskTemplateTitle } from 'components/tasktemplates/TaskTemplateTitle';
import { escape } from 'utils/RegexUtils';
import { formatRepeat } from 'utils/RepeatUtils';
import {
    toStringPassword,
    toStringReminder,
    toStringRepeatFrom
} from 'utils/StringUtils';

export function getDefaultGetValueFromEvent(e) {
    if (!e || !e.target) {
        return e;
    }
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : target.value;
}

export function getRenderForType(type, options, value, props = {}) {
    return getFieldComponents(type, options).render(value, props);
}

export function getInputForType(type, options, props = {}) {
    return getFieldComponents(type, options).input(props);
}

export function getSelectForType(type) {
    return getFieldComponents(type).select();
}

export function getFieldComponents(type, options) {
    let configuration = null;

    const removeExtraProps = props => {
        const { ...wrappedProps } = props;
        delete wrappedProps.fieldMode;
        delete wrappedProps.onCommit;
        return wrappedProps;
    };

    switch (type) {
        case 'boolean': {
            configuration = {
                render: value => <Checkbox checked={!!value} />,
                input: props => (
                    <Checkbox
                        data-prevent-default={true}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'color': {
            configuration = {
                render: value => <ColorPicker color={value} />,
                input: props => (
                    <ColorPicker
                        onBlur={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'contact': {
            configuration = {
                render: value => (
                    <ContactTitle contactId={value} />
                ),
                input: props => (
                    <ContactSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'context': {
            configuration = {
                render: value => (
                    <ContextTitle contextId={value} />
                ),
                input: props => (
                    <ContextSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'date': {
            const extended = options && options.extended === true;
            const dateFormat = options && options.dateFormat ? options.dateFormat : 'DD/MM/YYYY';

            configuration = {
                render: value => {
                    if (extended && Number.isInteger(value)) {
                        return value;
                    }

                    return value ? moment(value).format(dateFormat) : (<span>&nbsp;</span>);
                },
                input: props => {
                    if (extended) {
                        return (
                            <ExtendedDatePicker
                                onOpenChange={status => {
                                    if (props.onCommit && !status) {
                                        props.onCommit();
                                    }
                                }}
                                format={dateFormat}
                                {...removeExtraProps(props)} />
                        );
                    }

                    return (
                        <DatePicker
                            onOpenChange={status => {
                                if (props.onCommit && !status) {
                                    props.onCommit();
                                }
                            }}
                            format={dateFormat}
                            {...removeExtraProps(props)} />
                    );
                }
            };

            break;
        }
        case 'dateTime': {
            const extended = options && options.extended === true;
            const dateFormat = options && options.dateFormat ? options.dateFormat : 'DD/MM/YYYY';
            const timeFormat = options && options.timeFormat ? options.timeFormat : 'HH:mm';

            configuration = {
                render: value => {
                    if (extended && Number.isInteger(value)) {
                        return value;
                    }

                    return value ? moment(value).format(`${dateFormat} ${timeFormat}`) : (<span>&nbsp;</span>);
                },
                input: props => {
                    if (extended) {
                        return (
                            <ExtendedDatePicker
                                onOpenChange={status => {
                                    if (props.onCommit && !status) {
                                        props.onCommit();
                                    }
                                }}
                                showTime={{ format: timeFormat }}
                                format={`${dateFormat} ${timeFormat}`}
                                {...removeExtraProps(props)} />
                        );
                    }

                    return (
                        <DatePicker
                            onOpenChange={status => {
                                if (props.onCommit && !status) {
                                    props.onCommit();
                                }
                            }}
                            showTime={{ format: timeFormat }}
                            format={`${dateFormat} ${timeFormat}`}
                            {...removeExtraProps(props)} />
                    );
                }
            };

            break;
        }
        case 'folder': {
            configuration = {
                render: value => (
                    <FolderTitle folderId={value} />
                ),
                input: props => (
                    <FolderSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'goal': {
            configuration = {
                render: value => (
                    <GoalTitle goalId={value} />
                ),
                input: props => (
                    <GoalSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'importance': {
            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber
                        onBlur={props.onCommit}
                        min={0}
                        max={12}
                        style={{ width: 60 }}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'length': {
            configuration = {
                render: value => (
                    <LengthField length={value} readOnly={true} />
                ),
                input: props => (
                    <LengthField
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'linkedContactLinks': {
            configuration = {
                render: value => (
                    <LinkedContactLinksTitle linkIds={value} />
                ),
                input: props => (
                    <LinkedContactLinksSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'linkedFileLinks': {
            configuration = {
                render: value => (
                    <LinkedFileLinksTitle linkIds={value} />
                ),
                input: props => (
                    <LinkedFileLinksSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'linkedTaskLinks': {
            configuration = {
                render: value => (
                    <LinkedTaskLinksTitle linkIds={value} />
                ),
                input: props => (
                    <LinkedTaskLinksSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'location': {
            configuration = {
                render: value => (
                    <LocationTitle locationId={value} />
                ),
                input: props => (
                    <LocationSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'money': {
            const currency = options && options.currency ? options.currency : '€';

            configuration = {
                render: value => value ? currency + ' ' + value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber
                        onBlur={props.onCommit}
                        formatter={value => `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace('/(' + escape(currency) + ')\\s?|(,*)/g', '')}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'note': {
            configuration = {
                render: value => (
                    <NoteTitle noteId={value} />
                ),
                input: props => (
                    <NoteSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'noteField': {
            configuration = {
                render: value => (
                    <NoteFieldTitle noteFieldId={value} />
                ),
                input: props => (
                    <NoteFieldSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'number': {
            const min = options && options.min ? options.min : -Infinity;
            const max = options && options.max ? options.max : Infinity;

            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber
                        onBlur={props.onCommit}
                        min={min}
                        max={max}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'password': {
            configuration = {
                render: value => value ? toStringPassword(value) : <span>&nbsp;</span>,
                input: props => (
                    <Input.Password
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'priority': {
            configuration = {
                render: value => (
                    <PriorityTitle priorityId={value} />
                ),
                input: props => (
                    <PrioritySelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'progress': {
            configuration = {
                render: value => Number.isInteger(value) ? <Progress percent={value} size="small" /> : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber
                        onBlur={props.onCommit}
                        min={0}
                        max={100}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'reminder': {
            configuration = {
                render: value => (
                    Number.isInteger(value) ? toStringReminder(value) : <span>&nbsp;</span>
                ),
                input: props => (
                    <ReminderField
                        onBlur={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'repeat': {
            configuration = {
                render: value => {
                    const result = formatRepeat(value);
                    return result ? result : <span>&nbsp;</span>;
                },
                input: props => (
                    <RepeatField
                        defaultOpened={props.fieldMode === 'table'}
                        onOpenChange={status => {
                            if (props.onCommit && !status) {
                                props.onCommit();
                            }
                        }}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'repeatFrom': {
            configuration = {
                render: value => toStringRepeatFrom(value),
                input: props => (
                    <RepeatFromField
                        onBlur={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'select': {
            let values = options && options.values ? options.values : [];
            values = Array.isArray(values) ? values : [values];

            configuration = {
                render: value => (
                    value ? value : <span>&nbsp;</span>
                ),
                input: props => (
                    <Select
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)}>
                        {values.map(value => {
                            value = typeof value === 'object' ? value : {
                                title: value,
                                value
                            };

                            return (
                                <Select.Option key={value.value} value={value.value}>
                                    {value.title}
                                </Select.Option>
                            );
                        })}
                    </Select>
                )
            };

            break;
        }
        case 'selectTags': {
            configuration = {
                render: values => (
                    values ? values.map(value => (<Tag key={value}>{value}</Tag>)) : <span>&nbsp;</span>
                ),
                input: props => (
                    <Select
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        mode="tags"
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'sortDirection': {
            configuration = {
                render: value => (
                    <SortDirectionTitle sortDirectionId={value} />
                ),
                input: props => (
                    <SortDirectionSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'star': {
            configuration = {
                render: value => <StarCheckbox checked={!!value} />,
                input: props => (
                    <StarCheckbox {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'status': {
            configuration = {
                render: value => (
                    <StatusTitle statusId={value} />
                ),
                input: props => (
                    <StatusSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'tags': {
            configuration = {
                render: value => (
                    <TagsTitle tagIds={value} />
                ),
                input: props => (
                    <TagsSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'task': {
            configuration = {
                render: value => (
                    <TaskTitle taskId={value} />
                ),
                input: props => (
                    <TaskSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'taskField': {
            configuration = {
                render: value => (
                    <TaskFieldTitle taskFieldId={value} />
                ),
                input: props => (
                    <TaskFieldSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'taskTemplate': {
            configuration = {
                render: value => (
                    <TaskTemplateTitle taskTemplateId={value} />
                ),
                input: props => (
                    <TaskTemplateSelect
                        onBlur={props.onCommit}
                        dropdownMatchSelectWidth={false}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'textarea': {
            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <Input.TextArea
                        onBlur={props.onCommit}
                        autosize={true}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'timer': {
            configuration = {
                render: (value, props) => {
                    /* eslint-disable react/prop-types */
                    return (
                        <TimerField
                            timer={value}
                            readOnly={true}
                            onChange={props ? props.onChange : null} />
                    );
                    /* eslint-enable react/prop-types */
                },
                input: props => (
                    <TimerField
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
        case 'text':
        default: {
            configuration = {
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <Input
                        onBlur={props.onCommit}
                        onPressEnter={props.onCommit}
                        {...removeExtraProps(props)} />
                )
            };

            break;
        }
    }

    configuration.select = () => (
        <Select dropdownMatchSelectWidth={false} placeholder="Condition">
            {getFieldType(type).map(condition => (
                <Select.Option key={condition.type} value={condition.type}>
                    {condition.title}
                </Select.Option>
            ))}
        </Select>
    );

    return configuration;
}