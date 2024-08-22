import React from 'react';
import { useParams } from 'react-router-dom';

const ConfirmImage = () => {

    const { id } = useParams();
    const { password } = useParams();

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='col-md-8 offset-2'>
                <h1>Thank you for uploading an image! Here is your link to send around:</h1>
                <a href={`http://localhost:3000/view/{id}`}>C:\\Users\\D\\source\\repos\\PasswordPicsReact\\PasswordPicsReact.Web\\view?id=${id}</a>
                <h3>Remember, the password is {password}</h3>
            </div>
        </div>
    )

};

export default ConfirmImage;