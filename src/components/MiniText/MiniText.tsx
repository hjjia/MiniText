import React from 'react';

export default class MiniText extends React.Component {

    render() {
        return (
            <div className="mini-text-root">
                <div className="mini-text-wrap">
                    <div className="mini-text-opts"></div>
                    <div className="mini-text-content" contentEditable={true}>
                        <p> </p>
                    </div>
                </div>
            </div>
        )
    }
}