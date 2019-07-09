import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

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
        signinUser().then(({ data: { signinUser } }) => {
            localStorage.setItem('token', signinUser.token)
            this.clearState();
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
                        console.log(error)
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
export default Signin;