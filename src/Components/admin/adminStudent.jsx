import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"

export default function AStudent() {
  const navigate=useNavigate()
  const [data,setdata]=useState(null)
  const[loading,setLoading]=useState(true)
  let name=useRef('')
  let Name=useRef('')
  let rollno=useRef('')
  let department=useRef('')
  let email=useRef('')
  let password=useRef('')
  let confirm_password=useRef('')
  const[addS,setAdd]=useState(false)
  useEffect(() => {
      fetch('http://localhost:5000/admin/getStudent', {
        method: 'GET',
        credentials: 'include',  
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401) {  
              navigate('/login');
            }
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          setdata(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.stack)
        });
    }, [navigate]); 
  async function handleSubmit(event){
    event.preventDefault()
    const response=await axios.get("http://localhost:5000/admin/searchStudent",{withCredentials:true,params:{
      data:name.current.value,
    }})
    console.log(response.data)
    setdata(response.data)
    name.current.value=''
  }
  async function handleDelete(id){
    try{
    const response=await axios.post("http://localhost:5000/admin/deleteUser",{user_id:id,user_type:"student"},{withCredentials:true})
    console.log(response)
    const response1=await axios.get("http://localhost:5000/admin/getStudent",{withCredentials:true})
      console.log(response1.data)
      setdata(response1.data)
    }
    catch(err){
      console.log(err)
    }
  }
  function handleClick(){
    // console.log(addS)
    setAdd(true)
    // console.log(addS)
  }
  async function handlesubmit(event){
    event.preventDefault();
    const data={
      name:Name.current.value,
      email:email.current.value,
      rollno:rollno.current.value,
      department:department.current.value,
      password:password.current.value,
      confirm_password:confirm_password.current.value
    }
    try{
    const response=await axios.post("http://localhost:5000/admin/addStudent",{data:data},{withCredentials:true})
    if(response.status===201){
      Name.current.value=''
      email.current.value=''
      rollno.current.value=''
      department.current.value=''
      password.current.value=''
      confirm_password.current.value=''
      try{
        const response =await axios.get("http://localhost:5000/admin/getStudent",{withCredentials:true})
        if(response.status===200){
          setdata(response.data)
        }
        else{
          console.log("error")
        }
      }
      catch(err){
          console.log(err.stack)
      }
      setAdd(false)
    }
    else{
      console.log("error")
    }
  }
  catch(err){
    console.log(err)
    alert(err.response.data.message)
  }
  }
    return (
        <>
            {addS ? (
                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your Name" ref={Name} />
                        {/* Add other form fields similarly */}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-group">
                            <label htmlFor="searchStudent">Search Student</label>
                            <input type="text" id="searchStudent" placeholder="Search Student" ref={name} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <button onClick={handleClick} className="btn btn-secondary">Add Student</button>
                    <div className="card-grid">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            data?.map((value) => (
                                <div key={value.id} className="card">
                                    <h5 className="card-title">{value.name}</h5>
                                    <h6 className="card-subtitle">{value.rollno}</h6>
                                    <p className="card-text">{value.NGO}</p>
                                    <p className="card-text">{value.Department}</p>
                                    <MdDelete className="delete-icon" onClick={() => handleDelete(value.id)} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    )
}




