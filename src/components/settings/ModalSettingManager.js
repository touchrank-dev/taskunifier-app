import React from 'react';
import { Button, Modal } from 'antd';
import Icon from 'components/common/Icon';
import SettingManager from 'components/settings/SettingManager';
import { useApp } from 'hooks/UseApp';

function ModalSettingManager() {
    const appApi = useApp();

    const onClose = () => {
        appApi.setSettingManagerOptions({ visible: false });
    };

    return (
        <Modal
            title={<Icon icon="cog" text="Settings" />}
            visible={appApi.settingManager.visible}
            width="80%"
            closable={false}
            onOk={onClose}
            onCancel={onClose}
            footer={(
                <Button onClick={onClose}>
                    Close
                </Button>
            )}>
            <SettingManager />
        </Modal>
    );
}

export default ModalSettingManager;