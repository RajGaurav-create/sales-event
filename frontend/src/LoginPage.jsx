import { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
function LoginPage() {
   const[username,setUsername] = useState("");
   const[password,setPassword] = useState("");
   const[error,setError] = useState(null);
   const navigate = useNavigate();

   const handleSign = async (e) => {
    e.preventDefault();
    setError(null);
    try{
      const response = await fetch('http://localhost:8080/api/auth/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        credentials:'include',
        body: JSON.stringify({username,password}),
      });

      const data = await response.json();
      console.log(data.role);

      if(response.ok){
        console.log("User logged in successfully:",data);

        if(data.role === 'CUSTOMER'){
          navigate('/customerhome');
        } else if(data.role == 'ADMIN'){
          navigate('/admindashboard');
        } else {
          throw new Error('Invalid user role');
        }
      }else{
        throw new Error(data.error || 'Login failed');
      }
    }catch(err){
      console.log("its not working:",err);
      setError(err.message);
    }
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl px-10 py-10">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
       {error && <p className="text-red-600 bg-white" >{error}</p>}
        <form className="space-y-4" onSubmit={handleSign}>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 ml-1 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
