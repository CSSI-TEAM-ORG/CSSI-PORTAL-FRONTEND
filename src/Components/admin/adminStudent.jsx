import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"
export default function AStudent(){
    const navigate=useNavigate()
    const [data,setdata]=useState(null)
    const[loading,setLoading]=useState(true)
    const[searchBy,setSearchBy]=useState('')
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
      const response=await axios.get("http://localhost:5000/getStudent",{withCredentials:true,params:{
        data:name.current.value,
        searchBy:searchBy
      }})
      console.log(response.json())
      name.current.value=''
      setSearchBy('')
    }
    async function handleDelete(id){
      try{
      const response=await axios.post("http://localhost:5000/deleteSFN",{id:id,role:"student"},{withCredentials:true})
      console.log(response)
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
          <br></br>
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" onClick={()=>{setSearchBy('name')}}>Name</button>
          <button type="button" class="btn btn-secondary" onClick={()=>{setSearchBy('email')}}>Email</button>
          </div>
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