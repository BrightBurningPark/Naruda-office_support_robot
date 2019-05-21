import _ from 'lodash'
import React, { Component } from 'react'
import { Container, Button, Menu, Visibility, Grid } from 'semantic-ui-react'
import MainHeader from '../components/MainLayout'

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const Paragraph = () => (
    <p>
        {[
            'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ',
            'tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ',
            'semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ',
            'ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ',
            'fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
            'Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ',
            'neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ',
            'accumsan porttitor, facilisis luctus, metus',
        ].join('')}
    </p>
)

export default class Main extends Component {
    state = { menuFixed: false }

    stickTopMenu = () => this.setState({ menuFixed: true })
    unStickTopMenu = () => this.setState({ menuFixed: false })

    render() {
        const { menuFixed } = this.state

        return (
            <div>
                <Container text style={{ marginTop: '2em' }} />
                {/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
                gone beyond the scope of visibility */}
                <Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false} >
                    <Menu fixed={menuFixed ? 'top' : undefined} style={menuFixed ? fixedMenuStyle : menuStyle} >
                        <Container text>
                            <Menu.Item header>Naruda</Menu.Item>
                            <Menu.Menu position='right'>
                                <Button color='teal' fluid to="/">My Info</Button>
                                <Button color='teal' fluid to="/">Sign Out</Button>
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Visibility>
                <Container>
                    <Grid >
                        <Grid.Row>
                            <MainHeader />
                        </Grid.Row>
                        {/* 
                        <Grid.Row>
                            {<Mapbar />}
                        </Grid.Row>
                        */}
                    </Grid>
                    <Container text>
                        <Paragraph />
                        <Paragraph />
                        <Paragraph />
                        <Paragraph />
                        <Paragraph />
                        <Paragraph />
                    </Container>
                </Container>

            </div>
        );
    }
}