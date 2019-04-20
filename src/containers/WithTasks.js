import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../actions/TaskActions';
import { getDefaultTaskFields } from '../data/DataTaskFields';
import { filterObjects } from '../utils/CategoryUtils';
import { applyTaskFilter } from '../utils/TaskFilterUtils';
import { setSelectedTaskIds } from '../actions/AppActions';

function withTasks(Component, options = { applySelectedTaskFilter: false, actionsOnly: false }) {
    function WithTasks(props) {
        return <Component {...props} />
    }

    const mapStateToProps = state => {
        if (options && options.actionsOnly === true) {
            return {};
        }

        let tasks = filterObjects(state.tasks);

        if (options && options.applySelectedTaskFilter === true) {
            const fields = getDefaultTaskFields(state.settings).concat(filterObjects(state.taskFields));

            tasks = tasks.filter(task => {
                if (!state.app.selectedTaskFilterDate ||
                    moment(task.creationDate).isAfter(moment(state.app.selectedTaskFilterDate))) {
                    return true;
                }

                return applyTaskFilter(state.app.selectedTaskFilter, task, fields);
            });
        }

        return {
            tasks: tasks
        };
    };

    const mapDispatchToProps = dispatch => ({
        addTask: task => dispatch(addTask(task)),
        updateTask: task => dispatch(updateTask(task)),
        deleteTask: taskId => dispatch(deleteTask(taskId)),
        setSelectedTaskIds: taskIds => dispatch(setSelectedTaskIds(taskIds))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithTasks);
}

export default withTasks;