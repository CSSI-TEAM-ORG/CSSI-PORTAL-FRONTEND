import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"
import LoadingComponent from "../Loading/LoadingComponent"
export default function AStudent(){
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
      setdata(response.data)
      name.current.value=''
    }
    async function handleDelete(id){
      try{
      const response=await axios.post("http://localhost:5000/admin/deleteUser",{user_id:id,user_type:"student"},{withCredentials:true})
      console.log(response)
      const response1=await axios.get("http://localhost:5000/admin/getStudent",{withCredentials:true})
        setdata(response1.data)
      }
      catch(err){
        console.log(err)
      }
    }
    function handleClick(){
      setAdd(true)
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
      if(err.response.status===400){
        alert(err.response.data.message)
      }
    }
    }
    return (
        <>{addS ?<><form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name:</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Name:  " ref={Name} />
          <label htmlFor="exampleInputEmail1">Email:</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email:  " ref={email} />
          <label htmlFor="exampleInputEmail1">rollno:</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your rollNo:  " ref={rollno} />
          <label htmlFor="exampleInputEmail1">Department:</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Department:  " ref={department} />
          <label htmlFor="exampleInputEmail1">Password:</label>
          <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Password:  " ref={password} />
          <label htmlFor="exampleInputEmail1">Confirm Password: </label>
          <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm your password " ref={confirm_password} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button  style={{marginLeft:'20px'}} onClick={()=>setAdd(false)} className="btn btn-warning">Go Back</button>
      </form></>
       : <>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Search Student</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Student " ref={name} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br />
      <button onClick={handleClick} className="btn btn-secondary">Add Student</button>
      {
      loading? <LoadingComponent />:
      <div className="card-grid">{
      data?.map((value)=>(
        <div key={value.id}  className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{value.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{value.rollno}</h6>
    <p className="card-text">{value.NGO}</p>
    <p className="card-text">{value.Department}</p>
    <MdDelete onClick={()=>handleDelete(value.id)}/>
  </div>
</div>
      ))
      }</div>
      }</>}</>
    )
}
