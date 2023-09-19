import React, { useState } from 'react'
import axios from "axios"
import { BiBookmarkPlus, BiUpload, BiTrash } from "react-icons/bi"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

const PhotosUploader = ({ addedPhotos, onChange }) => {

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
    async function removePhoto(link) {
        onChange([...addedPhotos.filter(photo => photo !== link)])
    }
    function selectAsMainPhoto(ev, filename) {
        ev.preventDefault();
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }

    return (
        <div>
            <h2 className=' text-xl mt-4 mb-1'>Photos</h2>
            <div className='flex gap-2'>
                <input type="text" placeholder='or add a link for photo here...' value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                <button className='flex items-center justify-center mx-2 px-4'><BiBookmarkPlus className=' text-2xl' onClick={addPhotoByLink} /></button>
            </div>
            <div className='flex items-center gap-2 -mb-4'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div key={link} className='shrink-0'>
                        <img className='w-[100px] h-[100px] rounded-2xl ' src={"http://localhost:4000/uploads/" + link} alt="to upload" />
                        <button onClick={() => removePhoto(link)} className=' cursor-pointer bg-black rounded-lg opacity-70 relative bottom-6'>
                            <BiTrash className='text-2xl text-rose-600' />
                        </button>
                        <button onClick={ev => selectAsMainPhoto(ev, link)} className=' cursor-pointer bg-black rounded-lg opacity-70 relative bottom-6 left-12'>
                            {link === addedPhotos[0] && (
                                <AiFillStar className='text-2xl text-rose-600'/>
                            )}
                            {link !== addedPhotos[0] && (
                                <AiOutlineStar className='text-2xl text-rose-600'/>
                            )}
                        </button>
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