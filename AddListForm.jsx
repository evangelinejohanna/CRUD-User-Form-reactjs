import React, {useEffect, useRef, useState } from "react";
import Button from "../Components/Button"; 

function AddListForm() {
  const [inputs, setInputs] = useState({ name: "", age: "", contact: "", email: "" });
  const [prevValue, setPrevValue] = useState({ name: "", age: "", contact: "", email: "" });
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const nameRef = useRef();
  const ageRef = useRef();
  const contactRef = useRef();
  const emailRef = useRef();
  
  useEffect(() => {
    setPrevValue(inputs);
  },[inputs]);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.age || !inputs.contact || !inputs.email) {
      alert("Please fill out all fields");
      return;
    }
    if (isEditing) {
      
      const updatedUsers = [...users];
      updatedUsers[editIndex] = inputs;
      setUsers(updatedUsers);
      setIsEditing(false);
    } 
    else {
      setUsers((prevUsers) => [...prevUsers, inputs]);
    }

    setEditIndex(null);
    nameRef.current.focus();
  
  };

  const handleEdit = (index) => {
    const userEdit = users[index];
    setInputs(userEdit);
    setEditIndex(index);
    setIsEditing(true);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Enter your name:
          <input type="text" name="name" ref={nameRef} value={inputs.name} onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Enter your age:
          <input type="text" name="age" ref={ageRef} value={inputs.age} onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Enter your contact number:
          <input type="text" name="contact" ref={contactRef} value={inputs.contact} onChange={handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Enter your email:
          <input type="email" name="email" ref={emailRef} value={inputs.email} onChange={handleChange}/>
        </label>
      </div>
      <div>
        <br/>
        
        <Button label={isEditing ? "Update" : "Add"} type="submit" />
      </div>
      
    </form>

    <div>
      <h2>Added Users</h2>
        <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.age} - {user.contact} - {user.email}
                <button onClick={() => handleEdit(index)}>Edit</button>
              </li>
            ))}
        </ul>
    </div>
  </>
  );
}

export default AddListForm;

