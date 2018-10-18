import React, {Component} from 'react';
import Confetti from 'react-dom-confetti';

const config = {
    angle: 90,
    spread: 60,
    startVelocity: 20,
    elementCount: 40,
    decay: 0.95
};
export default class ConfettiCR extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {active} = this.props;
        return (
            <Confetti active={active} config={config}/>
        )
    }
}
