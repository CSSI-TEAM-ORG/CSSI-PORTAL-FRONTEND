import Footer from "../footer";
import Navbar from "../Navbar";
import AFaculty from "./adminfaculty";
import ANgo from "./adminngo";
import AStudent from "./adminStudent";
import { Link } from "react-router-dom";
import "../../Styles/admin.css"
import { useState } from "react";
export default function Admin(){
    const [role,setRole]=useState('student');
    function giveRole(){
        if(role==="student"){
            return(
                <AStudent />
            );
        }
        if(role==="faculty"){
            return(
            <AFaculty />
            );
        }
        else{
            return(
                <ANgo />
            );
        }
    }
    return(
        <div className="d-block">
        <Navbar />
        <div className="d-flex content">
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '210px',height:'100vh'}}>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="#" onClick={()=>setRole("student")} className={role==="student"? "nav-link active" : "nav-link dark"} aria-current="page">
          Student
        </Link>
      </li>
      <li>
        <Link to="#" onClick={()=>setRole('ngo')} className={role==="ngo"? "nav-link active" : "nav-link dark"} >
          NGO
        </Link>
      </li>
      <li>
        <Link to="#" onClick={()=>setRole('faculty')} className={role==="faculty"? "nav-link active" : "nav-link dark"} >
          Faculty
        </Link>
      </li>
    </ul>
  </div>
        <div className="acontent" style={{height:'100%',width:'100%'}}>
              {giveRole()}
        </div>
        </div>
        <Footer />
        </div>
    );
}