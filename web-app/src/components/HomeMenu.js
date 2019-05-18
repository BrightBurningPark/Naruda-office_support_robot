const React = require('react')
const { Link } = require('react-router-dom')

const HomeMenu = () => {
    return (
        <div>
            <ul>
                <li><Link to="/Signin">Signin</Link></li>
                <li><Link to="/Signup">Signup</Link></li>
            </ul>
            <hr />
        </div>
    );
};

export default HomeMenu;