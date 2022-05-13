import React from 'react';
import Header from './../components/Header';

const MainLayout = props => {
    return (
        <>
            <Header />
            <div className="main">
                {props.children}
            </div>
        </>

    );
};

export default MainLayout;
