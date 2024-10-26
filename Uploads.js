import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Page.css';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const Uploads = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/verify');
                if (response.data.status) {
                    // User is verified, stay at dashboard
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);

    const [img, setImg] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", type === 'image' ? img : video);
        data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

        try {
            const cloudName = process.env.REACT_APP_CLOUD_NAME;
            const resourceType = type === 'image' ? 'image' : 'video';
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/uploads`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const imgUrl = await uploadFile("image");
            const videoUrl = await uploadFile("video");

            await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/videos`, { imgUrl, videoUrl });
            setImg(null);
            setVideo(null);

            console.log("File Uploaded Successfully");
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Uploads</div>
                <div>
                    <label htmlFor='video'>Video: </label>
                    <br />
                    <input 
                        type="file"
                        accept='video/*'
                        id="video"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                    <br />
                </div>
                <br />
                <div>
                    <label htmlFor='img'>Images: </label>
                    <br />
                    <input 
                        type="file"
                        accept='image/*'
                        id="img"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    <br />
                </div>
                <br />
                <button type="submit">Upload</button>
            </form>
            {loading && (
                <TailSpin
                    visible={true}
                    height={80}
                    width={80}
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius={1}
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            )}
        </>
    );
};

export default Uploads;
