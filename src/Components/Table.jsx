import axios from 'axios'
import React, { useEffect, useState} from 'react'

function Table() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [uname, usetName] = useState('');
    const [uemail, usetEmail] = useState('');
    const [uphone, usetPhone] = useState('');
    const [editId, setEditId] = useState(-1);
    useEffect(() => {
        axios.get(' http://localhost:8000/posts')
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); const id = data.length + 1;
        axios.post('http://localhost:8000/posts/', { id: id, name: name, email: email, phone: phone })
            .then(res => {
                location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id) => {
        axios.get('http://localhost:8000/posts/' + id)
            .then(res => {
                console.log(res.data);
                usetName(res.data.name);
                usetEmail(res.data.email);
                usetPhone(res.data.phone);
            })
            .catch(err => console.log(err));
        setEditId(id)
    }
    const handleUpdate = () => {
        axios.put('http://localhost:8000/posts/' + editId, { id: editId, name: uname, email: uemail, phone: uphone })
            .then(res => {
                console.log(res);
                location.reload();
                setEditId(-1);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/posts/' + id)
            .then(res => {
                location.reload();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className='container'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                    <input type='text' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                    <input type='text' placeholder='Enter Phone' onChange={(e => setPhone(e.target.value))} />
                    <button>Add</button>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user, index) => (
                            user.id === editId ?
                                <tr>
                                    <td>{user.id}</td>
                                    <td><input type='text' value={uname} onChange={e => usetName(e.target.value)} /></td>
                                    <td><input type='text' value={uemail} onChange={e => usetEmail(e.target.value)} /></td>
                                    <td><input type='text' value={uphone} onChange={e => usetPhone(e.target.value)} /></td>
                                    <td><button onClick={handleUpdate}>Update</button></td>
                                </tr>
                                :
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user.id)}>Edit</button>
                                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                                    </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Table;
