import React from 'react';
import Logo from '../common/Logo';
import Spacer from '../common/Spacer';

function Footer(props) {
    return (
        <React.Fragment>
            <span><Logo size={12} /><Spacer size={3} />TaskUnifier <span style={{color: "#008c4b"}}>2</span> ©2019 Created by BL-IT</span>
        </React.Fragment>
    );
}

export default Footer;