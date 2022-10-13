import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);

  const inputHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://first-deployment-test.herokuapp.com/users/register",
      input
    );

    try {
      console.log(res.data);
      alert("User registered successfully");
      setInput({ username: "", email: "", address: "", phone: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        "https://first-deployment-test.herokuapp.com/users/allUsers"
      );

      try {
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [users]);

  return (
    <div className="App">
      <h1>Register</h1>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="avishesh"
            id="username"
            name="username"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="avishesh@gmail.com"
            id="email"
            name="email"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Saraswotikhel"
            id="address"
            name="address"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            placeholder="98232323223"
            id="phone"
            name="phone"
            onChange={inputHandler}
          />
        </div>
        <button
          type="submit"
          style={{ display: "block", margin: "2em auto", marginBottom: "6em" }}
        >
          Register
        </button>
      </form>

      <h1>Registered Users</h1>

      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          gap: "2em",
          marginTop: "3em",
          marginBottom: "2em",
        }}
      >
        <li
          style={{
            display: "flex",
            gap: "2em",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          <span style={{ width: "10em" }}>Username</span>
          <span style={{ width: "10em" }}>Email</span>
          <span style={{ width: "10em" }}>Address</span>
          <span style={{ width: "10em" }}>Phone</span>
        </li>
      </ul>

      {users.length === 0 ? (
        <h2>Loading....</h2>
      ) : (
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            flexDirection: "column",
            gap: "2em",
          }}
        >
          {users.map((user) => {
            return (
              <li
                key={user._id}
                style={{
                  display: "flex",
                  gap: "2em",
                  justifyContent: "center",
                }}
              >
                <span style={{ width: "10em" }}>{user.username}</span>
                <span style={{ width: "10em" }}>{user.email}</span>
                <span style={{ width: "10em" }}>{user.address}</span>
                <span style={{ width: "10em" }}>{user.phone}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
