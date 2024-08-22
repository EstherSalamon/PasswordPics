import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [password, setPassword] = useState('');
    const fileRef = useRef();
    const navigate = useNavigate();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onButtonClick = async () => {
        if (!fileRef.current.files.length) {
            return;
        }
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        const { data } = await axios.post('/api/images/add', { base64, password });
        navigate(`/confirm/${data}/${password}`);
    };

    return (
        <div className="container" style={{marginTop: 80} }>
            <div className="col-md-6 offset-3">
                <h1>Welcome to the most awesome picture share!</h1>
                <br/>
                <input type='password' name='password' placeholder='Password' className='form-control mt-2' value={password} onChange={e => setPassword(e.target.value)} />
                <input type='file' className='form-control mt-2' ref={fileRef} />
                <button onClick={onButtonClick} className="btn btn-primary mb-3 w-100 mt-2">Upload</button>
            </div>
        </div>
    );
};

export default Home;