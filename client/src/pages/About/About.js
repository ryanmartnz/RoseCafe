import React, { Fragment } from "react";

const About = () => {
    return (
        <Fragment>
            <h1>About</h1>
            <p>The Rose Cafe is a full-stack e-commerce web application for a cafe using the PERN stack.</p>
            <p>Users are able to create an account, log in, place food and drink orders, and track the status of their previous orders.</p>
            <p>The application frontend was created using JavaScript, React, and HTML/CSS.</p>
            <p>The application backend consists of a PostgreSQL database hosted through Neon and a RESTful API created using Espress.js and Node.js.</p>
            <p><strong>Developed by: Ryan Ciel Martinez</strong></p>
        </Fragment>
    );
};

export default About;