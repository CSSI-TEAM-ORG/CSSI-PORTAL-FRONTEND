import {useRef} from "react";
import axios from "axios"
export default function Profilengo(props){
    // <input type="hidden" class="form-control" name="role" value="ngo" />
    const name=useRef('');
    const location=useRef('');
    const address=useRef('');
    const capacity=useRef('');
    const description=useRef('');
    const email=useRef('');
    const contact=useRef('');
    async function handlesubmit(event){
        event.preventDefault();
        const data={
            name:name.current.value,
            location:location.current.value,
            address:address.current.value,
            capacity:capacity.current.value,
            description:description.current.value,
            email:email.current.value,
            contact:contact.current.value
        }
        try{
            const response=await axios.post("http://localhost:5000/auth/updateprofile",data,{withCredentials:true});
            console.log(response.data.message);
        }
        catch(error){
            console.log(error.stack);
        }
        name.current.value='';
        location.current.value='';
        address.current.value='';
        capacity.current.value='';
        description.current.value='';
        props.updateprof();
    }
    return(
        <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Name</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={name} required/>
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Location</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={location} required/>
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Address</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={address} required/>
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Capacity</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={capacity} required/>
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Description</label>
          <input type="textarea" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={description} required/>
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={description} required/>
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Contact</label>
          <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={description} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
}