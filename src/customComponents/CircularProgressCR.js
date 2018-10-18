import React, {Component} from 'react';
import {CircularProgress} from 'material-ui/Progress';

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 'auto'
    },
    innerContainer: {
        position: 'relative',
        top: '50%',
    },
    innerContainerPrimary: {
        position: 'relative',
        top: '45%',
        left: '45%',
        right: '45%',
        bottom: '45%',
    }
};
class CircularProgressCR extends Component {

    render() {
        const {primaryMode} = this.props;
        if (primaryMode) this.styles = styles.innerContainerPrimary;
        else this.styles = styles.innerContainer;
        return (
            <div style={styles.container}>
                <div style={this.styles}>
                    <CircularProgress/>
                </div>
            </div>
        )
    }
}

export default (CircularProgressCR)