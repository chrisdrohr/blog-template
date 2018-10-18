import React, {Component} from 'react';
import {connect} from 'react-redux';

class YouTubeSubscribeButton extends Component {

    render() {
        if (this.props.youTubeChannel.fetched) {
            if (window.gapi !== undefined) {
                const channel = this.props.youTubeChannel.data.id;
                const config = {'channelid': channel, 'layout': 'default'};
                window.gapi.ytsubscribe.render(document.getElementById('subscribeButton'), config);
            }
            return (
                <div
                    id={'subscribeButton'}
                    className="g-ytsubscribe"
                    data-layout="default"
                    data-count="hidden">
                </div>
            );
        } else {
            return null;
        }
    }

}

function mapStateToProps(state) {
    return {
        youTubeChannel: state.youTubeChannel,
    }
}
export default connect(mapStateToProps, null)(YouTubeSubscribeButton)
