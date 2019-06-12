import React, { Component } from 'react'
import { Segment, Container } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

export default class App extends Component {


    /*
 * taskQueue의 object는 {
     xcoord: '',
     yoord: '',
     type: 'A or B'
 * }
 * TaskManager 초기화 시점에 Queue는 null 상태
 */


    render() {
        return(
            <div>
                <Segment.Group>
                    <Segment>{this.props.taskQueue.type}</Segment>
                    <Segment>{this.props.taskQueue.xcoord}</Segment>
                    <Segment>{this.props.taskQueue.ycoord}</Segment>
                </Segment.Group>
            </div>
        )
    }

}