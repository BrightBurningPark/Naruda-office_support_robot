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
            emailError: false, passwordError: false, formError: false
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        let error = false;

        if (!this.state.email) {
            this.setState({ emailError: true })
            error = true
        } else {
            this.setState({ emailError: false })
            error = false
        }
        if (!this.state.password) {
            this.setState({ passwordError: true })
            error = true
        } else {
            this.setState({ passwordError: false })
            error = false
        }
        if (error == false)
            this.props.auth(this.state.email, this.state.password, (res) => {
                if (res == false)
                    alert('E-mail 혹은 password가 확인되지 않습니다.')
            })
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
                            <Header as='h2'>New Move of Autonomous Office</Header>
                            <Form error={this.state.formError} size='large'>
                                <Segment stacked>
                                    <Form.Input fluid required={true} icon='mail' iconPosition='left' placeholder='Email Address' type='email' name='email' value={email} onChange={this.handleChange} />
                                    <Form.Input fluid required={true} icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} onChange={this.handleChange} />
                                    <Form.Button color='teal' fluid size='large' onClick={this.handleSubmit} >Log In</Form.Button>
                                </Segment>
                            </Form>
                            <Divider horizontal>Or</Divider>
                            <Button color='teal' fluid size='large' onClick={socket.setNewcomer}>Sign Up</Button>
                        </Grid.Column>
                    </Grid>

                    {/* to be removed */}
                    {/* <strong>onChange:</strong>
                    <pre>{JSON.stringify({ email, password }, null, 2)}</pre> */}
                </div>
            )
        } else {
            return (
                <SignUpForm socket={socket} signUp={(email, name, password) => socket.signUp(email, name, password)} ></SignUpForm>
            )
        }

    }
}