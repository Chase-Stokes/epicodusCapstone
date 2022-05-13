import React from 'react';
import Header from './../components/Header';

const HomeLayout = props => {
    return (
        <div className="fullHeight">
            <Header />
            {props.children}
        </div>
    );
};

export default HomeLayout;