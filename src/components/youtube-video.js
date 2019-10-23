import React from 'react'

export class Video extends React.Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        const { id, width = '100%', height = '100%' } = this.props
        if (!id) return null
        return (
            <>
                <iframe
                    width={width}
                    height={height}
                    src={'https://www.youtube.com/embed/' + id}
                    title={`yt-video-${id}`}
                    frameBorder="0"
                    allowFullScreen="true"
                />
            </>
        )
    }
}
