import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function registerUser (event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers: {
        'Content-Type': "application/json",
        Accept: "application/json"
      }
    })

    const data = await response.json();

    if(data.status === 'ok'){
      navigate('/login');
    }
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit = {registerUser}>
        <input value = {name} onChange= {(e) => setName(e.target.value)} type="text" placeholder= "Name" />
        <br />
        <input value = {email} onChange= {(e) => setEmail(e.target.value)} type="email" placeholder= "Email" />
        <br />
        <input value = {password} onChange= {(e) => setPassword(e.target.value)} type="password" placeholder= "Password" />
        <br />
        <input type="button" value="Register" onClick={registerUser}  />
      </form>
    </div>
  );
}

export default Register;
