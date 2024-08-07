import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const CheckPasswordPage = () => {
    {/* 비밀번호 체크 로직 생성 */}
    const navigate = useNavigate()
    const location = useLocation()
    const [data,setData] = useState({
        password: "",
        userId: ""
    })
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve)=>{
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`
        try {
            const response = await axios({
                method: 'post',
                url: URL,
                data: {
                    userId: location?.state?._id,
                    password: data.password
                },
                withCredentials: true
            })
            toast.success(response.data.message)
            navigate('/') //채팅창으로 이동
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return(
        <div className='mt-5'>
            <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
                <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
                    로그인한 내 아바타표시
                    <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
                </div>
                <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='password'>비밀번호 :</label>
                        <input 
                            type="text"
                            id='password'
                            name="password"
                            placeholder="비밀번호를 입력하시오."
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={data.password}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CheckPasswordPage