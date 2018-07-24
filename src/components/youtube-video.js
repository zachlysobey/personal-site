import React from 'react'

export class Video extends React.Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        const { id } = this.props
        return (
            <div>
                <iframe
                    width="100%"
                    height="250"
                    src={'https://www.youtube.com/embed/' + id}
                    frameBorder="0"
                    allowFullScreen="true"
                />
            </div>
        )
    }
}
