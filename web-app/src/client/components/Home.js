import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Divider, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    submit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email);
    }

    render() {
        const { email, password } = this.state
        return (
            <div>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>Naruda</Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Email Address' name='email' value={email} onChange={this.handleChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} onChange={this.handleChange} />
                                <Form.Button color='teal' fluid size='large' onClick={this.submit} >Login</Form.Button>
                            </Segment>
                        </Form>
                        <Divider horizontal>Or</Divider>
                        <Button color='teal' fluid size='large'>Sign Up</Button>
                    </Grid.Column>
                </Grid>

                {/* to be removed */}
                <strong>onChange:</strong>
                <pre>{JSON.stringify({ email, password }, null, 2)}</pre>
            </div>
        )
    }
}