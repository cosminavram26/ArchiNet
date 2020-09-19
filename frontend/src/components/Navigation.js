import React from 'react';
import PropTypes from 'prop-types';
import FirstPage from '../pages/FirstPage';

function Navigation(props) {
    const logged_out_nav = (
        <ul>
            <li onClick={() => props.display_form('login')}>Login</li>
            <li onClick={() => props.display_form('signup')}>Sign Up</li>
        </ul>
    );

    const logged_in_nav = (
        <ul>
            <li onClick={props.handle_logout}>Logout</li>
            <div>
                <FirstPage users = {props.users} generate = {props.generate} />
            </div>
        </ul>
    );
    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Navigation;

Navigation.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};