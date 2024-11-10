import Footer from "../footer";
import Navbar from "../Navbar";
import AFaculty from "./adminfaculty";
import ANgo from "./adminngo";
import AStudent from "./adminStudent";
import { Link } from "react-router-dom";
import "../../Styles/admin.css"
import { useState } from "react";

export default function Admin() {
    const [role, setRole] = useState('student');

    function giveRole() {
        if (role === "student") {
            return <AStudent />;
        }
        if (role === "faculty") {
            return <AFaculty />;
        }
        return <ANgo />;
    }

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="sidebar">
                   
                    <ul>
                        <li>
                           Manage Users
                        </li>
                        <li>
                            <Link to="#" onClick={() => setRole("student")} className={role === "student" ? "active" : ""}>
                                Student
                            </Link>
                        </li>
                        <li>
                            <Link to="#" onClick={() => setRole('ngo')} className={role === "ngo" ? "active" : ""}>
                                NGO
                            </Link>
                        </li>
                        <li>
                            <Link to="#" onClick={() => setRole('faculty')} className={role === "faculty" ? "active" : ""}>
                                Faculty
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="main-content">
                    {giveRole()}
                </div>
            </div>
            <Footer />
        </>
    );
}