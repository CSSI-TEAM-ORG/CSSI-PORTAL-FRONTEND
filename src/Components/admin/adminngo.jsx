import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"
export default function ANgo(){
    const [data,setData]=useState(null);
    const[loading,setLoading]=useState(true);
    const navigate=useNavigate()
    const[addN,setAdd]=useState(false)
    let name=useRef('');
    let Name=useRef('');
    let email=useRef('');
    let password=useRef('');
    let confirm_password=useRef('');
    let state=useRef('');
    let city=useRef('');
    let address=useRef('');
    let capacity=useRef(0);
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
        }
        catch(err){
          console.log(err)
        }
        try{
          const response1=await axios.get("http://localhost:5000/admin/getNGO",{withCredentials:true})
          console.log(response1.data)
          setData(response1.data)
        }
        catch(err){
          console.log(err.stack)
        }
      }
      function handleClick(){
        setAdd(true);
      }
      async function handlesubmit(event){
        event.preventDefault()
        const data={
          name:Name.current.value,
          email:email.current.value,
          capacity:capacity.current.value,
          city:city.current.value,
          state:state.current.value,
          address:address.current.value,
          password:password.current.value,
          confirm_password:confirm_password.current.value
        }
        try{
          const response=await axios.post("http://localhost:5000/admin/addNGO",{data:data},{withCredentials:true});
          if(response.status===201){
          Name.current.value=''
          email.current.value=''
          capacity.current.value=''
          city.current.value=''
          state.current.value=''
          address.current.value=''
          password.current.value=''
          confirm_password.current.value=''
          try{
            const response =await axios.get("http://localhost:5000/admin/getNGO",{withCredentials:true})
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
          alert(err.response.data.message)
        }
      }
    return(
        <>{addN? <><form onSubmit={handlesubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Name:</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter NGO:  " ref={Name} />
          <label for="exampleInputEmail1">Email:</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter NGO email:  " ref={email} />
          <label for="exampleInputEmail1">Capacity:</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter NGO Caparity:  " ref={capacity} />
          <label for="exampleInputEmail1">City:</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter NGO city:  " ref={city} />
          <label for="exampleInputEmail1">State</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter NGO state:  " ref={state} />
          <label for="exampleInputEmail1">Address:</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter NGO address:  " ref={address} />
          <label for="exampleInputEmail1">Password:</label>
          <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your Password:  " ref={password} />
          <label for="exampleInputEmail1">Confirm Password: </label>
          <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm your password " ref={confirm_password} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form></>
        : <><form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Search NGO</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search NGO " ref={name}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br />
      <button onClick={handleClick} className="btn btn-secondary">Add NGO</button>
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
      ))}</>}
      </>
    )
}