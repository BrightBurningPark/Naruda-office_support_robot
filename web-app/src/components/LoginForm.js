import React from 'react'
import 'semantic-ui-less/semantic.less';
import { Divider, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const LoginForm = () => (
    <div className='login-form'>
        <style>
            {`body > div,body > div > div,body > div > div > div.login-form {height: 100%;}`}
        </style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>Naruda</Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Email address' />
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                        <Button color='teal' fluid size='large' to="/Main">
                        </Button>
                    </Segment>
                </Form>
                <Divider horizontal>Or</Divider>
                <Button color='teal' fluid size='large'>Sign Up</Button>
            </Grid.Column>
        </Grid>
    </div>
)

export default LoginForm