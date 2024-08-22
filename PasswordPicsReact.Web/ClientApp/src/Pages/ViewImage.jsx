import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const ViewImage = () => {

    const { id } = useParams();
    const [image, setImage] = useState({});
    const navigate = useNavigate();
    const [allowPass, setAllowPass] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('Please enter the password.');

    useEffect(() => {

        const loadImage = async () => {
            const { data } = await axios.get(`/api/images/byid?id=${id}`);
            if (!data) {
                navigate('/');
            }
            setImage(data.image);
            setAllowPass(data.allowIn);
        };

        loadImage();

    }, []);

    const onButtonClick = async () => {
        const { data } = await axios.post('/api/images/check', {ImageId: image.id, password});
        setAllowPass(data);
        if (!data) {
            setMessage('Invalid password. Please try again.')
            setPassword('');
        }
    };

    if (!allowPass) {

        return (
            <form onClick={onButtonClick}>
            <div className="app-container">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1>{message}</h1>
                    <input type='password' name='password' placeholder='Password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="btn btn-primary mt-2 w-100">Enter</button>
                </div>
                </div>
            </form>
        )

    } else {
        return (
            <div className='container' style={{ marginTop: 80 }}>
                <div className='col-md-6 offset-3'>
                    <div className='card text-white bg-primary' style={{ width: 540 }}>
                        <img src={`/api/images/viewimage?imageFileName=${image.guidName}`} style={{ margin: 10 }} />
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <h1>Views: {image.views}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default ViewImage;