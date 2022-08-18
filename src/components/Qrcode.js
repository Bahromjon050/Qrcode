import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteQr, EditQr, SaveQr } from '../redux/action/action';
import QRCode from 'qrcode'
import Swal from 'sweetalert2'
import Flip from 'react-reveal/Flip';


export const Qrcode = () => {
    const { qrData } = useSelector(state => state.TodoReducers);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        id: null,
        name: '',
        qrcode: '',
        desc: ''
    });

    const inputFun = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const [result, setResult] = useState(true);

    const qrSubmit = (e) => {
        e.preventDefault()
        if (input.desc) {
            if (result) {
                QRCode.toDataURL(input.name)
                    .then(url => {
                        dispatch(SaveQr(({ ...input, qrcode: url })))
                        Swal.fire({
                            icon: 'success',
                            text: "Linkni qrcodega aylantirildi!"
                        })
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: err,
                        })
                        console.error(err)
                    })
            } else {
                QRCode.toDataURL(input.name)
                    .then(url => {
                        dispatch(EditQr(({ ...input, qrcode: url })))
                        Swal.fire({
                            icon: 'success',
                            text: "Link tahrirlandi!"
                        })
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: err,
                        })
                        console.error(err)
                    })
                setResult(true)
            }
        }
        setInput({
            id: null,
            name: '',
            qrcode: '',
            desc: ''
        });
    }

    const editFun = (val) => {
        setInput({
            id: val.id,
            name: val.name,
            qrcode: val.qrcode,
            desc: val.desc
        })
        setResult(false)
    }
    const delFun = (val) => {
        Swal.fire({
            title: "Link o'chirish",
            text: "Linkni o'chirishni hohlaysizmi ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "O'chirish"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DeleteQr(val.id))
                Swal.fire(
                    "Link o'chirildi!",
                    '',
                    'success'
                )
            }
        })
    }
    const show = (val) => {
        Swal.fire({
            title: "Ko'rish",
            text: val.desc,
            imageUrl: val.qrcode,
            imageWidth: 240,
            imageHeight: 240,
            imageAlt: 'qrCode',
        })
    }
    let array = ['...']
    return (
        <>
            <div className="form">
                <form onSubmit={qrSubmit}>
                    <h1 className='header_h1'>Linklarni Qrcode qilib chiqarish</h1>
                    <input type="text" name="name" value={input.name} onChange={inputFun} id="name" placeholder="link..." required />
                    <textarea name="desc" id="message" cols="30" value={input.desc} onChange={inputFun} rows="10" placeholder="link haqida" required></textarea>
                    <button type="submit" id="btn">{result ? "Jo'natish" : "Tahrirlash"}</button>
                </form>
                <div className="qrCards">
                    {
                        qrData.length !== 0 ? qrData.map((val, i) => (
                            <div className="qrcard" data-aos="zoom-in-left" key={i}>
                                <Flip>
                                    <img src={val.qrcode} alt="qrCode" />
                                </Flip>
                                <p>{val.desc.split("").length > 20 ? [...val.desc.split("").slice(0, 20), ...array].reduce((a, b) => a + b) : val.desc}</p>
                                <div className="qrFooter">
                                    <div className="actions">
                                        <a id="btn" onClick={() => show(val)}>Ko'rish</a>
                                        <a href={val.qrcode} download={val.qrcode} id="btn">Yuklash</a>
                                    </div>
                                    <div className="actions">
                                        <button type="button" id="btn" onClick={() => editFun(val)}>Tahrirlash</button>
                                        <button type="button" id="btn" onClick={() => delFun(val)}>O'chirish</button>
                                    </div>
                                </div>
                            </div>
                        )) : <h1 className='header_h1 error'>Linklar mavjud emas</h1>
                    }
                </div>
                <a className='links' href="https://t.me/SobitxanovBahromjon">Web site asoschisi: S.Bahromjon</a>
            </div>
        </>
    )
}
