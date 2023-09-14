import React, {useState} from 'react'
import axios from "axios"
import { BiBookmarkPlus, BiUpload } from "react-icons/bi"

const PhotosUploader = ({addedPhotos, onChange}) => {

    const [photoLink, setPhotoLink] = useState("")

    async function addPhotoByLink(e) {
        e.preventDefault()
        try {
            const { data: filename } = await axios.post("/upload-by-link", { link: photoLink })
            onChange(prev => {
                return [...prev, filename]
            })
            setPhotoLink("")
            console.log(addedPhotos.length)
        } catch (error) {
            console.log(error)
        }
    }
    async function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i])
        }
        axios.post("/upload", data, {
            headers: { "Content-type": "multipart/form-data" }
        }).then(res => {
            const { data: filenames } = res
            onChange(prev => {
                return [...prev, ...filenames]
            })
        })
    }

    return (
        <div>
            <h2 className=' text-xl mt-4 mb-1'>Photos</h2>
            <div className='flex gap-2'>
                <input type="text" placeholder='or add a link for photo here...' value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                <button className='flex items-center justify-center mx-2 px-4'><BiBookmarkPlus className=' text-2xl' onClick={addPhotoByLink} /></button>
            </div>
            <div className='flex items-center gap-2'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div key={link}>
                        <img className='w-[100px] h-[100px] rounded-2xl' src={"http://localhost:4000/uploads/" + link} alt="to upload" />
                    </div>
                ))}
                <label className='flex items-center justify-center w-[60px] mt-2 p-4 bg-rose-600 text-white rounded-full cursor-pointer'>
                    <BiUpload className=' text-2xl' />
                    <input type="file" className='hidden' onChange={uploadPhoto} multiple />
                </label>
                <span>or upload a Photo from your device</span>
            </div>
        </div>
    )
}

export default PhotosUploader