import React, { Component } from 'react'
import { Button, Header, Icon, Menu, Sidebar, Grid , Image } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';
import Mappoint from './Mappoint'
import MapNormal from './Mapnormal'
import Task from './Task'

const task = [
  {
      'id' : 1,
      'start' : 'a',
      'goal' : 'b',
      'time' : '10 min'
  },
  {
      'id' : 2,
      'start' : 'c',
      'goal' : 'd',
      'time' : '20 min'
  }
]





export default class MainHeader extends Component {
  
  state = { visible: false }
  state = { function1 : false }

  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  handleToTrue = () => this.setState({function1 : true})
  handleToFalse = () => this.setState({function1 : false})
  MainCallback = (dataFromMap) => this.setState({function1 : dataFromMap})



  render() {
    const { visible } = this.state
    const { function1 } = this.state
    const function11 = this.state.function1
    const data = this.state.function1

    let functionButton = null;
    let functionMap = null;

    if(function11){
      functionButton = 
      <Header inverted color='grey' onClick={this.handleToFalse}>
        {this.state.function1 ? 'function1 on' : 'function1 off'}
      </Header>
    } else{
      functionButton = 
      <Header inverted color='grey' onClick={this.handleToTrue}>
        {this.state.function1 ? 'function1 on' : 'function1 off'}
      </Header>
    }

    if(function11){
      functionMap = <Mappoint CallbackFromMain = {this.MainCallback}/>
    } else{
      functionMap = <MapNormal/>
    }




    return (

        <Grid columns = {16} celled centered> 
          <Grid.Row>
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
                  {functionButton}
                </Menu.Item>
              </Sidebar>
            </Grid.Column>

            <Grid.Column width = {11} >
              <Grid centered>
                <Grid.Row>
                  <Header size = 'huge'> Naruda</Header>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column floated='right' width = {4}>
              <Header size = 'large'>TASK LIST</Header>
            </Grid.Column>
          
          </Grid.Row>

          <Grid.Row>
            <Grid.Column floated = 'left'>
               <Grid.Row centered>
               {functionMap}
               </Grid.Row>
            </Grid.Column>

            <Grid.Column width = {4}>
            <div>
                        {
                            task.map(c =>{
                                return(
                                    <Task
                                        key={c.id}
                                        id={c.id}
                                        start={c.start}
                                        goal={c.goal}
                                        time={c.time}
                                    />
                                )
                            })
                        }
                    </div>
            </Grid.Column>
        
          
          </Grid.Row>
        </Grid>
    )
  }
}