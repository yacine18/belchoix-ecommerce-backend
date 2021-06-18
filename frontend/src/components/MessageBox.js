import React from 'react'

const MessageBox = props => {
    return (
        <div class={`alert alert-${props.variant || 'danger'}`} role="alert">
            {props.children}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default MessageBox
