import React, { Component } from 'react'
import { Button, Header, Icon, Menu, Sidebar, Grid, GridColumn } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';


export default class SidebarExampleSidebar extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <Grid columns={2}>
        <Grid.Column>
          <Button icon disabled={visible} onClick={this.handleShowClick}>
            <Icon name = "align justify"/>
        </Button>
          <Sidebar
            as={Menu}
            animation='uncover'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
        >
          <Menu.Item as='a'>
            function 1
          </Menu.Item>
            <Menu.Item as='a'>
              function 2
            </Menu.Item>
            <Menu.Item as='a'>
              function 3
            </Menu.Item>
            <Menu.Item as='a'>
              function 4
            </Menu.Item>
            <Menu.Item as='a'>
              function 5
            </Menu.Item>
            <Menu.Item as='a'>
              function 6
            </Menu.Item>
            <Menu.Item as='a'>
              function 7
            </Menu.Item>
        </Sidebar>
        </Grid.Column>
        <Grid.Column>
          <Header size = "huge"> Narumi <Header>
        </Grid.Column>
      </Grid>
    )
  }
}