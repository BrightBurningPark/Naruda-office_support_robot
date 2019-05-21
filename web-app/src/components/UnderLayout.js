import React, {Component} from 'react'
import { Segment , Grid , Image , Divider } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';
import Mappoint from './Mappoint'
import Task from './Task'

const task = {
    'id' : 1,
    'start' : 'a',
    'goal' : 'b',
    'time' : '10 min'
}







export default class UnderLayout extends Component{
    render(){
        return(
            <Grid columns = {16} padded>
                <Grid.Column width = {12}>
                    <Grid.Row stretched centered>
                        <Mappoint/>
                    </Grid.Row>
                </Grid.Column>
                
                
                
                <Grid.Column width = {4}>
                    <Task
                        id = {task.id}
                        start = {task.start}
                        goal = {task.goal}
                        time = {task.time}
                    />
                </Grid.Column>
            </Grid>   
        )
    }
    
}