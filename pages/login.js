import { Alert } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"
import { useEffect, useState } from "react"
import NavBar from "../layout/globalComponents/NavBar"
import Loading from "../layout/globalComponents/Loading"
import Link from "next/link"
import { login } from "../layout/API/add"
import { useRouter } from "next/router"

export default () => {
    const router = useRouter()

    const [loadingState, setLoadingState] = useState(true)

    const [bodyData, setBodyData] = useState({
        username: '',
        password: '',
    })

    const [alertState, setAlertState] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('pos-system-token')) {
                router.push('/')
            } else {
                setLoadingState(false)
            }
        }, 1000)
    }, [])

    const onLogin = () => {
        if (username === '' || password === '') {
            setAlertState(true)
            setAlertMessage('Please fill in all fields')
            setTimeout(() => {
                setAlertState(false)
            }, 1500)
        } else {
            login(bodyData).then((res) => {
                // console.log(res.data)
                localStorage.setItem('pos-system-token', res.data.token)
                localStorage.setItem('pos-system-user', res.data.user)
                router.push('/')
            }).catch((err) => {
                console.log(err)
                setAlertState(true)
                setAlertMessage(err.response.data.message)
                setTimeout(() => {
                    setAlertState(false)
                }, 1500)
            })
        }
    }

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center h-[90vh] md:p-0 p-3">

                <Loading LoadingState={loadingState} />

                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center w-full md:px-12 px-6 h-[70px] bg-black rounded-sm rounded-b-none">
                        <div className="text-xl text-white font-bold text-center">
                            Login
                        </div>
                    </div>
                    <div className="bg-secondary text-white shadow-md md:px-12 px-6 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>

                            <input
                                className="bg-[#2a2d36] appearance-none rounded-sm w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border border-gray-500"
                                id="username"
                                type="text"
                                placeholder="Enter Username"
                                value={bodyData.username}
                                onChange={(e) => setBodyData({ ...bodyData, username: e.target.value })}
                            />

                        </div>
                        <div className="mb-6">
                            <label className="block  text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="bg-[#2a2d36] appearance-none border border-gray-200  rounded-sm w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                value={bodyData.password}
                                onChange={(e) => setBodyData({ ...bodyData, password: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') { onLogin() }
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-black hover:bg-gray-800 transition-all text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={onLogin}
                            >
                                Login
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm hover:text-[#59a5db] transition-all" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="text-xs">
                            &copy;2022 aliraza.vercel.app. All rights reserved.
                        </div>
                        <div className="text-xs flex">
                            <div className="md:w-auto w-32">Dont have an account?</div>&nbsp;
                            <Link href="/register">
                                <div className="hover:text-[#1215b4] transition-all font-semibold md:w-auto w-12">
                                    Sign Up
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md transition-all mt-2">
                    {
                        alertState && <Alert icon={<IconAlertCircle size={16} />} title="Sorry!" color="red">
                            {alertMessage}
                        </Alert>
                    }
                </div>
            </div>
        </>
    )
}