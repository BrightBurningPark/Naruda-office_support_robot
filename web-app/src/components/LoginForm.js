import React, { Component } from 'react'
import 'semantic-ui-less/semantic.less';
import { Divider, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import axios from 'axios'


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', redirect: false }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        axios.post('http://localhost:3000/signin', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            if (res == 'true') {
                console.log('true')
                e.preventDefault()
                this.setState({ email: '', password: '', redirect: true })
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        const { email, password, redirect } = this.state

        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>Naruda</Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Email Address' name='email' value={email} onChange={this.handleChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} onChange={this.handleChange} />
                                <Form.Button color='teal' fluid size='large' content='Submit' />
                            </Segment>
                        </Form>
                        <Divider horizontal>Or</Divider>
                        <Button color='teal' fluid size='large'>Sign Up</Button>
                    </Grid.Column>
                </Grid>

                {/* to be removed */}
                <strong>onChange:</strong>
                <pre>{JSON.stringify({ email, password }, null, 2)}</pre>
                {redirect && (
                    <Redirect to={'/main'} />
                )}
            </div>
        )
    }
}

export default LoginForm;