import {useRef} from "react";
import axios from "axios"
export default function ProfileFaculty(props){
  const firstname=useRef('');
  const lastname=useRef('');
  const email=useRef('');
  const department=useRef('');
  async function handlesubmit(event){
    event.preventDefault();
    try{
    const data={
      name:firstname.current.value+" "+lastname.current.value,

      email:email.current.value,
      department:department.current.value
    }
    const response=await axios.post("http://localhost:5000/auth/updateprofile",data,{withCredentials:true});
    console.log(response.data.message);
    firstname.current.value='';
    lastname.current.value='';
    email.current.value='';
    department.current.value='';
    props.updateprof();
  }
  catch(error){
    console.log(error.stack);
  }
  }
    return(
        <> 
        <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">First Name</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={firstname} required/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Last Name</label>
    <input type="textbox" className="form-control" id="exampletextbox" aria-describedby="emailHelp" ref={lastname}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={email}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Department</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={department}/>
  </div>
  {/* <input type="hidden" className="form-control" name="role" value="faculty" /> This will be decided by the token sent. */}
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </>
    );
}