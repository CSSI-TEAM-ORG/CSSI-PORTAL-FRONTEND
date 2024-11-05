import {useEffect, useState,useRef} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { MdDelete } from "react-icons/md";
export default function AFaculty(){
    const navigate=useNavigate()
    const [data,setData]=useState(null)
    const[loading,setLoading]=useState(true)
    let name=useRef('')
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
        setData(response.data)
        }
        catch(err){
          console.log(err)
        }
      }
    return(
      <><form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="exampleInputEmail1">Search Faculty</label>
        <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Faculty " ref={name} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <br />
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
    ))}</>
    );
}