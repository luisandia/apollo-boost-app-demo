import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
}

class Signup extends React.Component {

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


    handleSubmit = (e, signupUser) => {
        e.preventDefault();
        signupUser().then(({ data: { signinUser } }) => {
            localStorage.setItem('token', signinUser.token)
            this.clearState();
        });
    }

    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state;
        const isInvalid = !username || !email || !password || password !== passwordConfirmation;
        return isInvalid;
    }


    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <div className="App">
                <h2 className="App">sinup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                    {(signupUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={e => this.handleSubmit(e, signupUser)}>
                                <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={username} />
                                <input type="email" name="email" placeholder="email" onChange={this.handleChange} value={email} />
                                <input type="password" name="password" placeholder="password" onChange={this.handleChange} value={password} />
                                <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation} />
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
export default Signup;