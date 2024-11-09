import {useEffect, useState,useRef} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { MdDelete } from "react-icons/md";
export default function AFaculty(){
    const navigate=useNavigate()
    const [data,setData]=useState(null)
    const[loading,setLoading]=useState(true)
    let name=useRef('')
    let Name=useRef('')
    let email=useRef('')
    let department=useRef('')
    let password=useRef('')
    let confirm_password=useRef('')
    const [addF,setAdd]=useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/admin/getFaculty', {
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
            setData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.stack)
            setLoading(false);
          });
      }, [navigate]); 

      async function handleSubmit(event){
        event.preventDefault()
        const response=await axios.get("http://localhost:5000/admin/searchFaculty",{withCredentials:true,params:{
          data:name.current.value
        }})
        console.log(response.data)
        setData(response.data)
        name.current.value=''
      }
      async function handleDelete(id){
        try{
        const response=await axios.post("http://localhost:5000/admin/deleteUser",{user_id:id,user_type:"faculty"},{withCredentials:true})
        console.log(response)
        const response1=await axios.get("http://localhost:5000/admin/getFaculty",{withCredentials:true})
        console.log(response1.data)
        setData(response1.data)
        }
        catch(err){
          console.log(err)
        }
      }
      function handleClick(){
        // console.log(addF)
        setAdd(true)
        // console.log(addF)
      }
      async function handlesubmit(event){
        event.preventDefault()
        const data={
          name:Name.current.value,
          email:email.current.value,
          department:department.current.value,
          password:password.current.value,
          confirm_password:confirm_password.current.value
        }
        try{
          const response=await axios.post("http://localhost:5000/admin/addFaculty",{data:data},{withCredentials:true});
          if(response.status===201){
            Name.current.value=''
            email.current.value=''
            department.current.value=''
            password.current.value=''
            confirm_password.current.value=''
            try{
              const response =await axios.get("http://localhost:5000/admin/getFaculty",{withCredentials:true})
              if(response.status===200){
                setData(response.data)
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
          console.log(err.stack)
        }
      }
    return(
      <>{addF ? <><form onSubmit={handlesubmit}>
      <div className="form-group">
        <label for="exampleInputEmail1">Name:</label>
        <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Name:  " ref={Name} />
        <label for="exampleInputEmail1">Email:</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email:  " ref={email} />
        <label for="exampleInputEmail1">Department:</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Department:  " ref={department} />
        <label for="exampleInputEmail1">Password:</label>
        <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Password:  " ref={password} />
        <label for="exampleInputEmail1">Confirm Password: </label>
        <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm your password " ref={confirm_password} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form></>
      : <><form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="exampleInputEmail1">Search Faculty</label>
        <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Faculty " ref={name} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <br />
    <button onClick={handleClick} className="btn btn-secondary">Add Faculty</button>
    {loading? <div>Loading...</div>:
    data?.map((value)=>(
      <div class="card" style={{width: "18rem"}}>
<div class="card-body">
  <h5 class="card-title">{value.name}</h5>
  <h6 class="card-subtitle mb-2 text-muted">{value.email}</h6>
  <p class="card-text">{value.Department}</p>
  <MdDelete onClick={()=>handleDelete(value.id)}/>
</div>
</div>
    ))}
    </>}</>
    );
}