import React from 'react'

const AlertError = props => {
    return (
        <div className="alert alert-danger mx-auto alert-dismissible fade show" role="alert" style={{width: '100%', maxWidth: '28rem'}}>
            {props.children}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default AlertError
