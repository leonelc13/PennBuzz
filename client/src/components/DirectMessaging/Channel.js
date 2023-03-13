import React, { Component } from 'react';
/**
 * React Component for individual message
 **/

class Channel extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.handleChannelClick = this.handleChannelClick.bind(this);
        console.log(this.props);
    }

    handleChannelClick(channel_id) {
        this.props.handleClick(channel_id);
    }

    render() {
        return (
            <div className={`channel-container ${this.props.is_selected_channel ? 'selected-channel' : ''}`} onClick={() => this.handleChannelClick(this.props.id)}>
                <span className="channel-img-wrapper">
                    <img src={this.props.image_src} alt="channel"></img>
                </span>
                <span className="channel-name">{this.props.name}</span>
                <i className="channel-icon fa-regular fa-ellipsis-vertical" alt="menu-icon"></i>
            </div >
        );
    }
}

export default Channel