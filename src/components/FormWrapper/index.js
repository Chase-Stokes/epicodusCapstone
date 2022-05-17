import React from "react";
import './styles.scss';

const FormWrapper = ({ head, children }) => {
    return (
        <div className="formWrapper">
            <div className="wrap">
                {head && <h2>{head}</h2>}
                <div className="children">
                    {children && children}
                </div>
            </div>
        </div>
    )
}

export default FormWrapper;
