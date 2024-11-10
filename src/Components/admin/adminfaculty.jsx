import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { MdDelete } from "react-icons/md";

export default function AFaculty() {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    let name = useRef('')
    let Name = useRef('')
    let email = useRef('')
    let department = useRef('')
    let password = useRef('')
    let confirm_password = useRef('')
    const [addF, setAdd] = useState(false)

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

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await axios.get("http://localhost:5000/admin/searchFaculty", {
            withCredentials: true,
            params: {
                data: name.current.value
            }
        })
        console.log(response.data)
        setData(response.data)
        name.current.value = ''
    }

    async function handleDelete(id) {
        try {
            const response = await axios.post("http://localhost:5000/admin/deleteUser", { user_id: id, user_type: "faculty" }, { withCredentials: true })
            console.log(response)
            const response1 = await axios.get("http://localhost:5000/admin/getFaculty", { withCredentials: true })
            console.log(response1.data)
            setData(response1.data)
        } catch (err) {
            console.log(err)
        }
    }

    function handleClick() {
        setAdd(true)
    }

    async function handlesubmit(event) {
        event.preventDefault()
        const data = {
            name: Name.current.value,
            email: email.current.value,
            department: department.current.value,
            password: password.current.value,
            confirm_password: confirm_password.current.value
        }
        try {
            const response = await axios.post("http://localhost:5000/admin/addFaculty", { data: data }, { withCredentials: true });
            if (response.status === 201) {
                Name.current.value = ''
                email.current.value = ''
                department.current.value = ''
                password.current.value = ''
                confirm_password.current.value = ''
                try {
                    const response = await axios.get("http://localhost:5000/admin/getFaculty", { withCredentials: true })
                    if (response.status === 200) {
                        setData(response.data)
                    } else {
                        console.log("error")
                    }
                } catch (err) {
                    console.log(err.stack)
                }
                setAdd(false)
            } else {
                console.log("error")
            }
        } catch (err) {
            alert(err.response.data.message)
            console.log(err.stack)
        }
    }

    return (
        <>
            {addF ? (
                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your Name" ref={Name} />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" ref={email} />
                        <label htmlFor="department">Department:</label>
                        <input type="text" id="department" placeholder="Enter your Department" ref={department} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your Password" ref={password} />
                        <label htmlFor="confirm_password">Confirm Password:</label>
                        <input type="password" id="confirm_password" placeholder="Confirm your password" ref={confirm_password} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-group">
                            <label htmlFor="searchFaculty">Search Faculty</label>
                            <input type="text" id="searchFaculty" placeholder="Search Faculty" ref={name} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <button onClick={handleClick} className="btn btn-secondary">Add Faculty</button>
                    <div className="card-grid">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            data?.map((value) => (
                                <div key={value.id} className="card">
                                    <h5 className="card-title">{value.name}</h5>
                                    <h6 className="card-subtitle">{value.email}</h6>
                                    <p className="card-text">{value.Department}</p>
                                    <MdDelete className="delete-icon" onClick={() => handleDelete(value.id)} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    );
}