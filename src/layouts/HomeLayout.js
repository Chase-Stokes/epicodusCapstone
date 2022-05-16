import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

const HomeLayout = props => {
    return (
        <div className="fullHeight">
            <Header {...props}/>
            {props.children}
            <Footer />
        </div>
    );
};

export default HomeLayout;