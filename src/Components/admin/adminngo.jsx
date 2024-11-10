import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import axios from "axios"

export default function ANgo() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [addN, setAdd] = useState(false)
    let name = useRef('');
    let Name = useRef('');
    let email = useRef('');
    let password = useRef('');
    let confirm_password = useRef('');
    let state = useRef('');
    let city = useRef('');
    let address = useRef('');
    let capacity = useRef(0);

    useEffect(() => {
        fetch('http://localhost:5000/admin/getNGO', {
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

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.get("http://localhost:5000/admin/searchNGO", {
                withCredentials: true,
                params: {
                    data: name.current.value,
                }
            })
            console.log(response.data)
            setData(response.data)
            name.current.value = ''
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDelete(id) {
        try {
            const response = await axios.post("http://localhost:5000/admin/deleteUser", { user_id: id, user_type: "NGO" }, { withCredentials: true })
            console.log(response)
            const response1 = await axios.get("http://localhost:5000/admin/getNGO", { withCredentials: true })
            console.log(response1.data)
            setData(response1.data)
        } catch (err) {
            console.log(err)
        }
    }

    function handleClick() {
        setAdd(true);
    }

    async function handlesubmit(event) {
        event.preventDefault()
        const data = {
            name: Name.current.value,
            email: email.current.value,
            capacity: capacity.current.value,
            city: city.current.value,
            state: state.current.value,
            address: address.current.value,
            password: password.current.value,
            confirm_password: confirm_password.current.value
        }
        try {
            const response = await axios.post("http://localhost:5000/admin/addNGO", { data: data }, { withCredentials: true });
            if (response.status === 201) {
                Name.current.value = ''
                email.current.value = ''
                capacity.current.value = ''
                city.current.value = ''
                state.current.value = ''
                address.current.value = ''
                password.current.value = ''
                confirm_password.current.value = ''
                try {
                    const response = await axios.get("http://localhost:5000/admin/getNGO", { withCredentials: true })
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
            console.log(err.stack)
            alert(err.response.data.message)
        }
    }

    return (
        <>
            {addN ? (
                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter NGO Name" ref={Name} />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter NGO email" ref={email} />
                        <label htmlFor="capacity">Capacity:</label>
                        <input type="number" id="capacity" placeholder="Enter NGO Capacity" ref={capacity} />
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" placeholder="Enter NGO city" ref={city} />
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" placeholder="Enter NGO state" ref={state} />
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" placeholder="Enter NGO address" ref={address} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter Password" ref={password} />
                        <label htmlFor="confirm_password">Confirm Password:</label>
                        <input type="password" id="confirm_password" placeholder="Confirm password" ref={confirm_password} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button  style={{marginLeft:'20px'}} onClick={()=>setAdd(false)} className="btn btn-warning">Go Back</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="form-group">
                            <label htmlFor="searchNGO">Search NGO</label>
                            <input type="text" id="searchNGO" placeholder="Search NGO" ref={name} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <button onClick={handleClick} className="btn btn-secondary">Add NGO</button>
                    <div className="card-grid">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            data?.map((value) => (
                                <div key={value.id} className="card">
                                    <h5 className="card-title">{value.name}</h5>
                                    <h6 className="card-subtitle">{value.capacity}</h6>
                                    <p className="card-text">{value.address}</p>
                                    <p className="card-text">{value.state}</p>
                                    <p className="card-text">{value.city}</p>
                                    <p className="card-text">{value.email}</p>
                                    <MdDelete className="delete-icon" onClick={() => handleDelete(value.id)} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    )
}