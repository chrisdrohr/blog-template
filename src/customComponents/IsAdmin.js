import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
const IsAdmin = props => (
    <React.Fragment>
        {props.isAdmin && props.children}
    </React.Fragment>
);
function mapStateToProps(state) {
    return {
        isAdmin: state.admin,
    }
}
export default withRouter(connect(mapStateToProps, null)(IsAdmin))