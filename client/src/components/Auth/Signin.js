import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';

const initialState = {
    username: "",
    password: "",
}

class Signin extends React.Component {

    state = { ...initialState };
    handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value)
        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    clearState = () => {
        this.setState({ ...initialState });
    }


    handleSubmit = (e, signinUser) => {
        e.preventDefault();
        signinUser().then(async ({ data: { signinUser } }) => {
            localStorage.setItem('token', signinUser.token)
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        });
    }

    validateForm = () => {
        const { username, password } = this.state;
        const isInvalid = !username || !password;
        return isInvalid;
    }


    render() {
        const { username, password } = this.state;
        return (
            <div className="App">
                <h2 className="App">SignIn</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={e => this.handleSubmit(e, signinUser)}>
                                <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={username} />
                                <input type="password" name="password" placeholder="password" onChange={this.handleChange} value={password} />
                                <button type="submit"
                                    disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        )
                    }}
                </Mutation>

            </div>
        );
    }
}
export default withRouter(Signin);