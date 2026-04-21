import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const[username,setUsername] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[role,setRole] = useState("");
  const[error,setError] = useState("");
  const navigate = useNavigate();

  const submitRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try{
      const response = await fetch('http://localhost:8080/api/users/registered',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({username,email,password,role}),
      });
      if(response.ok){
        navigate("/");
      } else{
        throw new Error("Something went wrong during Registration");
      }
    }catch(err){
      setError(err.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl px-10 py-10">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>
        {error && <p className="text-red-700">{error}</p>}
        <form className="space-y-4" onSubmit={submitRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
          id = 'role'
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?
          <Link
            to="/"
            className="text-blue-600 ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
