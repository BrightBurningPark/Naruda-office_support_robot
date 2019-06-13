import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Divider, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

@observer
export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', name: '', password: '', xcoord: '', ycoord: '',
            emailError: '', nameError: '', passwordError: '', formError: false
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        this.props.signUp(this.state.email, this.state.name, this.state.password, this.state.xcoord, this.state.ycoord)
    }

    render() {
        const { socket } = this.props
        const { email, name, password } = this.state
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' color='teal' textAlign='center'>Naruda</Header>
                        <Header as='h2'>Create a New Account</Header>
                        <Form error={this.state.formError} size='large'>
                            <Segment stacked>
                                <Form.Input fluid required={true} icon='mail' iconPosition='left' placeholder='Email Address' type='email' name='email' value={email} onChange={this.handleChange} />
                                <Form.Input fluid required={true} icon='user' iconPosition='left' placeholder='Name' name='name' value={name} onChange={this.handleChange} />
                                <Form.Input fluid required={true} icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} onChange={this.handleChange} />
                                <Form.Input fluid required={true} icon='arrows alternate horizontal' iconPosition='left' placeholder='X Coordinate' name='xcoord' value={xcoord} onChange={this.handleChange} />
                                <Form.Input fluid required={true} icon='arrows alternate vertical' iconPosition='left' placeholder='Y Coordinate' name='ycoord' value={ycoord} onChange={this.handleChange} />
                                <Form.Button color='teal' fluid size='large' onClick={this.handleSubmit} >Sign Up</Form.Button>
                            </Segment>
                        </Form>
                        <Divider horizontal>Already Have Account?</Divider>
                        <Button color='teal' fluid size='large' onClick={socket.resetNewcomer}>Log In</Button>
                    </Grid.Column>
                </Grid>
                {/* <strong>onChange:</strong>
                <pre>{JSON.stringify({ email, name, password }, null, 3)}</pre> */}
            </div>
        )
    }
}