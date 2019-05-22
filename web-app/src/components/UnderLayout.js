import React, { Component } from 'react'
import { Segment, Grid, Image, Divider } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less';
import Mappoint from './Mappoint'
import Task from './Task'


// https://www.youtube.com/watch?v=qu-AkdJ5ED4&list=PLRx0vPvlEmdCED62ZIWCbI-6G_jcwmuFB&index=21
// 변경되는 data 값에 따라 rendering하는 방법

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

export default class MainSection extends Component {
    render() {
        return (
            <Grid columns={16} padded>
                <Grid.Column width={12}>
                    <Grid.Row stretched centered>
                        <Mappoint />
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
            </Grid>
        )
    }

}