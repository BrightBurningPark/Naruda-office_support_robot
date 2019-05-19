import React, { Component } from 'react'
import { Button, Header, Icon, Menu, Sidebar, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';


export default class SidebarExampleSidebar extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <Grid Rows = {2} columns={3}>
        <Grid.Row>
          <Grid.Column floated='left' width = {3}>
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
              나르미 호출 
            </Menu.Item>
          </Sidebar>
          </Grid.Column>
          <Grid.Column>
            <Header size = 'huge'>나르다</Header>
          </Grid.Column>
          <Grid.Column floated='right' width = {3}>
            Task list position
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Image src='/images/wireframe/image.png' />
        </Grid.Row>
      </Grid>
    )
  }
}