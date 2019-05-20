import React, { Component } from 'react'
import { Button, Header, Icon, Menu, Sidebar, Grid, Image, Segment } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';


export default class SidebarExampleSidebar extends Component {
  state = { visible: false }

  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (

        <Grid columns = {16} celled centered> 
          <Grid.Column floated='left' width={1}>
            <Button icon disabled={visible} onClick={this.handleShowClick}>
              <Icon clolr = 'black' name = "align justify"/>
            </Button>

            <Sidebar
              as={Menu}
              animation='overlay'
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

          <Grid.Column width = {11} >
            <Grid centered>
              <Grid.Row>
                <Header size = 'huge'> Narumi</Header>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column floated='right' width = {4}>
            <Header size = 'large'>TASK LIST</Header>
          </Grid.Column>
        </Grid>
    )
  }
}