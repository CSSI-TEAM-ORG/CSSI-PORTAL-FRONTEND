import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"
export default function ANgo(){
    const [data,setData]=useState(null);
    const[loading,setLoading]=useState(true);
    const[searchBy,setSearchBy]=useState('');
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
        const response=await axios.get("http://localhost:5000/admin/getNGO",{withCredentials:true,params:{
          data:name.current.value,
          searchBy:searchBy
        }})
        // setLoading(false)
        console.log(response.data)
        setData(response.data)
        name.current.value=''
        setSearchBy('')
        }
        catch(err){
          console.log(err)
        }
      } 
      async function handleDelete(id){
        try{
        const response=await axios.post("http://localhost:5000/deleteSFN",{id:id,role:"NGO"},{withCredentials:true})
        console.log(response)
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
          <br></br>
          <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" onClick={()=>{setSearchBy('area')}}>Area</button>
          <button type="button" class="btn btn-secondary" onClick={()=>{setSearchBy('name')}}>Name</button>
          <button type="button" class="btn btn-secondary" onClick={()=>{setSearchBy('state');console.log(searchBy)}}>State</button>
          </div>
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