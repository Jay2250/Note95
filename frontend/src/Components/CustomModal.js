import React from 'react'

export default function CustomModal(props) {
    const CustomModalStyle = {
        'visibility': 'hidden',
        'opacity': '0',
        'position': 'fixed',
        'top': '0',
        'bottom': '0',
        'left': '0',
        'right': '0',
        'background': 'rgba(0, 0, 0, 0.7)',
        'visibility': props.show ? "visible" : "hidden",
        'opacity': props.show ? "1" : "0",
        'zIndex': '999'
    }
    return (
        <>
            <div style={CustomModalStyle} className='d-flex align-items-center justify-content-center'>
                {props.content}
            </div>
        </>
    )
}