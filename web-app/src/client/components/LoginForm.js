import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'

@observer
class LoginForm extends Component {

    submit = (e) => {
        e.preventDefault();
        this.props.login();
    }

    render() {
        return (
            <div>
                <Button onClick={this.submit}>

                </Button>
            </div>
        )
    }
}

export default LoginForm;