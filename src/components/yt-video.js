import React from 'react'

import data from '../data'

export class Video extends React.Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        const { id } = this.props
        return (
            <div>
                <iframe
                    width="560"
                    height="315"
                    src={'https://www.youtube.com/embed/' + id}
                    frameBorder="0"
                    allowFullScreen="true"
                />
            </div>
        )
    }
}
