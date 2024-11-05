import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"
export default function AStudent(){
    const navigate=useNavigate()
    const [data,setdata]=useState(null)
    const[loading,setLoading]=useState(true)
    let name=useRef('')
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
        setdata(response.data)
      }
      catch(err){
        console.log(err)
      }
    }
    return (
        <><form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Search Student</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Student " ref={name} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br />
      {loading? <div>Loading...</div>: 
      data?.map((value)=>(
        <div key={value.id}  className="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{value.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{value.rollno}</h6>
    <p class="card-text">{value.NGO}</p>
    <p class="card-text">{value.Department}</p>
    <MdDelete onClick={()=>handleDelete(value.id)}/>
  </div>
</div>
      ))}</>
    )
}