import axios from "axios";
import {useRef} from "react";
export default function ProfileStudent(props){
  const firstname=useRef('');
  const lastname=useRef('');
  const email=useRef('');
  const rollno=useRef('');
  const department=useRef('');
  const internshipAt=useRef('');
  const facultyCoordinator=useRef('');
  const evaluator=useRef('');

  async function handleSubmit(event){
    // console.log(event.firstname.value)
    event.preventDefault();
    try{
    const formData={
      name:firstname.current.value+" "+lastname.current.value,
      email:email.current.value,
      rollno:rollno.current.value,
      department:department.current.value,
      internshipAt:internshipAt.current.value,
      facultyCoordinator:facultyCoordinator.current.value,
      evaluator:evaluator.current.value
    }

    const response =await axios.post("http://localhost:5000/auth/updateprofile",formData,{withCredentials:true});
    console.log(await response.data.message)
    // console.log(event);
    firstname.current.value='';
    lastname.current.value='';
    email.current.value='';
    rollno.current.value='';
    department.current.value='';
    internshipAt.current.value='';
    facultyCoordinator.current.value='';
    evaluator.current.value='';
    props.updateprof();
  }
  catch(error){
    console.log(error)
  }
}

    return(
        <> 
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label">First Name</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={firstname} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Last Name</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={lastname} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={email} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Rollno</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={rollno} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Department</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={department} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Internship At</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={internshipAt} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Faculty Coordinator</label>
    <input type="textbox" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={facultyCoordinator} required/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Evaluator</label>
    <input type="textbox" className="form-control" id="exampleInputPassword1" ref={evaluator} required/>
  </div>
  {/* <input type="hidden" className="form-control" name="role" value="student" /> */}
  <input type="submit" value="Submit" className="btn btn-primary"/>
</form>
        </>
    );
}