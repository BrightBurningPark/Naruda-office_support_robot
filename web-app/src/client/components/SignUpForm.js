import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Divider, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

@observer
export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: '',
            emailError: '', nameError: '', passwordError: ''
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
        this.props.signUp(this.state.email, this.state.password).then((res) => {
            if (res)
                ;
        });
    }

    render() {
        const { socket } = this.props
        const { email, password } = this.state
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' color='teal' textAlign='center'>Naruda</Header>
                        <Header as='h2' textAlign='left'>Create a New Account</Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Email Address' type='email' name='email' value={email} onChange={this.handleChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} onChange={this.handleChange} />
                                <Form.Button color='teal' fluid size='large' onClick={this.handleSubmit} >Sign Up</Form.Button>
                            </Segment>
                        </Form>
                        <Divider horizontal>Already Have Account?</Divider>
                        <Button color='teal' fluid size='large' onClick={socket.resetNewcomer}>Log In</Button>
                    </Grid.Column>
                </Grid>
                <strong>onChange:</strong>
                <pre>{JSON.stringify({ email, password }, null, 2)}</pre>
            </div>
        )
    }
}