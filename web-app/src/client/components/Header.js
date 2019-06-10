import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Container, Button, Menu, Visibility } from 'semantic-ui-react'

/*
const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}
*/

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

@observer
export default class Header extends Component {
    /*
    state = { menuFixed: false }
    stickTopMenu = () => this.setState({ menuFixed: true })
    unStickTopMenu = () => this.setState({ menuFixed: false })
    */
    signout = (e) => {
        e.preventDefault();
        this.props.signout();
    }

    render() {
        const { session, socket } = this.props;
        // const { menuFixed } = this.state

        return (
            <div>
                <Container text style={{ marginTop: '1em' }} />
                {/* {<Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false} >
                    <Menu fixed={menuFixed ? 'top' : undefined} style={menuFixed ? fixedMenuStyle : menuStyle} > */}
                <Menu text style={fixedMenuStyle}>
                    <Menu.Item header>Naruda</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item header>{session.email}</Menu.Item>
                        <Button color='teal' fluid  >My Info</Button>
                        <Button color='teal' fluid to="/" onClick={socket.signout} >Sign Out</Button>
                    </Menu.Menu>
                </Menu>
                {/*  </Menu>
               </Visibility>} */}
            </div>
        );
    }
}