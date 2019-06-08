import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Divider, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import SignUpForm from './SignUpForm'

@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: '',
            emailError: '', passwordError: '',
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
        /* todo: input 값 valid 한지 client에서 먼저 확인하는 함수
         * State의 Error 값에 따라 맞는 modal rendering
         */
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.auth(this.state.email, this.state.password).then((res) => {
            if (res)
                ;
        });
    }

    render() {
        const { session, socket } = this.props
        const { email, password } = this.state
        if (!session.newcomer) {
            return (
                <div>
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h1' color='teal' textAlign='center'>Naruda</Header>
                            <Header as='h2'>Take part in New Move of Autonomous Office</Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Email Address' name='email' value={email} onChange={this.handleChange} />
                                    <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} onChange={this.handleChange} />
                                    <Form.Button color='teal' fluid size='large' onClick={this.handleSubmit} >Log In</Form.Button>
                                </Segment>
                            </Form>
                            <Divider horizontal>Or</Divider>
                            <Button color='teal' fluid size='large' onClick={socket.setNewcomer}>Sign Up</Button>
                        </Grid.Column>
                    </Grid>

                    {/* to be removed */}
                    <strong>onChange:</strong>
                    <pre>{JSON.stringify({ email, password }, null, 2)}</pre>
                </div>
            )
        } else {
            return (
                <SignUpForm socket={socket} signUp={(email, password, xcoord, ycoord) => socket.signUp(email, password, xcoord, ycoord)} ></SignUpForm>
            )
        }

    }
}