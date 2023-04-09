import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./photo.css"
const Photos = () => {
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState([]);
    const handleAPI = async() => {
        try{
            const res = await axios.get(
                `https://picsum.photos/v2/list?page=${page}&limit=8`
                )
            return res.data;
        }catch(err) {
            console.error(err);
        }
    }

    const handleLoadingPhotos = async() => {
        try{
            const resPhotos = await handleAPI();
            setPage(page+1);
            setPhotos([...photos, ...resPhotos]);
        }catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleLoadingPhotos();
    },[]);

    return (
        <div className="contain">
            <div className="listPhoto">
                {
                    photos.length > 0 && photos.map(photo => {
                        return (
                            <div key={photo.id} 
                                >
                                <img className='w-full' src={photo.download_url} alt="" />
                            </div>
                        )
                    })
                }
            </div>
            <div >
                <button onClick={handleLoadingPhotos} 
                >Load more</button>
            </div>
        </div>
    );
};

export default Photos;