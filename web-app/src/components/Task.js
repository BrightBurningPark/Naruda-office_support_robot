import React, {Component} from 'react'
import {Segment, Header} from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

export default class Task extends Component{
    render(){
        return(
            <Segment>
                <Header size='medium'> Task ID : {this.props.id}</Header>
                <p>Task Start Point : {this.props.start}</p>
                <p>Task Goal Point : {this.props.goal}</p>
                <p>Task Estimated time : {this.props.time}</p>
            </Segment>
        )
    }
}