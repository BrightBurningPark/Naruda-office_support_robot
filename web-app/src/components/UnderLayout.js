import React, {Component} from 'react'
import { Segment , Grid , Image , Divider } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';
import Mappoint from './Mappoint'

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
                    <Segment>task</Segment>
                </Grid.Column>
            </Grid>   
        )
    }
    
}