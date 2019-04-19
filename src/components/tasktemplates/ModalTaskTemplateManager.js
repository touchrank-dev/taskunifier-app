import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import withApp from '../../containers/WithApp';
import Icon from '../common/Icon';
import TaskTemplateManager from './TaskTemplateManager';

function ModalTaskTemplateManager(props) {
    const onCloseTaskTemplateManager = () => {
        props.setTaskTemplateManagerOptions({ visible: false });
    };

    const onTaskTemplateSelection = taskTemplateId => {
        props.setTaskTemplateManagerOptions({ taskTemplateId })
    };

    return (
        <Modal
            title={<Icon icon="tasks" text="Task Template Manager" />}
            visible={props.taskTemplateManager.visible}
            width="80%"
            closable={false}
            footer={
                <Button onClick={onCloseTaskTemplateManager}>
                    Close
                </Button>
            }>
            <TaskTemplateManager
                taskTemplateId={props.taskTemplateManager.taskTemplateId}
                onTaskTemplateSelection={onTaskTemplateSelection} />
        </Modal>
    );
}

ModalTaskTemplateManager.propTypes = {
    setTaskTemplateManagerOptions: PropTypes.func.isRequired,
    taskTemplateManager: PropTypes.object.isRequired
};

export default withApp(ModalTaskTemplateManager);