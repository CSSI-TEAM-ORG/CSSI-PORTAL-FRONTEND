import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"
export default function ANgo(){
    const [data,setData]=useState(null);
    const[loading,setLoading]=useState(true);
    const navigate=useNavigate()
    let name=useRef('');
    useEffect(() => {
        fetch('http://localhost:5000/admin/getNGO', {//To search and retrieve data of NGOS
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
            setLoading(false);
            console.log(error.stack)
          });
      }, [navigate]);
      async function handleSubmit(event){
        event.preventDefault();
        try{
          // setLoading(true)
        const response=await axios.get("http://localhost:5000/admin/searchNGO",{withCredentials:true,params:{
          data:name.current.value,
        }})
        // setLoading(false)
        console.log(response.data)
        setData(response.data)
        name.current.value=''
        }
        catch(err){
          console.log(err)
        }
      } 
      async function handleDelete(id){
        try{
        const response=await axios.post("http://localhost:5000/admin/deleteUser",{user_id:id,user_type:"NGO"},{withCredentials:true})
        console.log(response)
        const response1=await axios.get("http://localhost:5000/admin/getNGO",{withCredentials:true})
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
          <label for="exampleInputEmail1">Search NGO</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search NGO " ref={name}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br />
      {loading? <div>Loading...</div>: 
      data?.map((value)=>(
        <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{value.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{value.capacity}</h6>
    <p class="card-text">{value.address}</p>
    <p class="card-text">{value.state}</p>
    <p class="card-text">{value.city}</p>
    <p class="card-text">{value.email}</p>
    <MdDelete onClick={()=>handleDelete(value.id)}/>
  </div>
</div>
      ))}
      </>
    )
}