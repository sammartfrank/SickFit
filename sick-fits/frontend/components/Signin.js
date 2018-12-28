import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage.js';
const SIGNIN_MUTATION = gql`
 mutation SIGNIN_MUTATION($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
   id
   email
   name
  }
 }
`;

class Signin extends Component {
 state = {
  email: '',
  name: '',
  password: '',
 };
 saveToState = (e) => {
  this.setState({
   [e.target.name]: e.target.value });
  console.log(this.state)
 };
 render() {
  return (
   <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
    {(signin, { error, loading }) => (
     <Form method="post" onSubmit={async e => {
       e.preventDefault();
       await signin();
       this.setState({
        email:'', name:'', password:''
       })
      }}>
       <Error error={error} />
       <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account</h2>
        <label htmlFor="email">
         Email:
         <input
          type="email"
          name="email"
          placeholder="email"
          value={this.state.email}
          required
          onChange={this.saveToState}
         />
        </label>
        <label>
        Password
         <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.saveToState}
         />
        </label>
        <button type="submit">Submit</button>
       </fieldset>
      </Form>
      )}
   </Mutation>
   )}
}

export default Signin;
