import { Alert, Select } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"
import { useEffect, useState } from "react"
import NavBar from "../layout/globalComponents/NavBar"
import Loading from "../layout/globalComponents/Loading"
import Link from "next/link"
import { getAllRoles, register } from "../layout/API/add"
import { useRouter } from "next/router"

export default () => {
    const router = useRouter()

    const [loadingState, setLoadingState] = useState(true)
    const [roles, setRoles] = useState([])

    const [bodyData, setBodyData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        role: '',
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

        getAllRoles().then((res) => {
            setRoles(res.data.roles)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const onRegister = () => {
        if (bodyData.firstName === '' || bodyData.lastName === '' || bodyData.username === '' || bodyData.password === '' || bodyData.role === '') {
            setAlertState(true)
            setAlertMessage('Please fill in all fields')
            setTimeout(() => {
                setAlertState(false)
            }, 1500)
        } else {
            // console.log(bodyData)
            register(bodyData).then((res) => {
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
                            Register
                        </div>
                    </div>
                    <div className="bg-secondary text-white shadow-md md:px-12 px-6 pt-6 pb-8 mb-4">
                        <div className="mb-4 flex justify-between items-center">
                            <div className="mr-2">
                                <label className="block text-sm font-bold mb-2" htmlFor="username">
                                    First Name
                                </label>

                                <input
                                    className="shadow appearance-none rounded-sm w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-secondary border border-gray-500"
                                    id="fname"
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={bodyData.firstName}
                                    onChange={(e) => setBodyData({ ...bodyData, firstName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2" htmlFor="username">
                                    Last Name
                                </label>

                                <input
                                    className="shadow appearance-none rounded-sm w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-secondary border border-gray-500"
                                    id="lname"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={bodyData.lastName}
                                    onChange={(e) => setBodyData({ ...bodyData, lastName: e.target.value })}
                                />
                            </div>
                        </div>
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
                        <div className="mb-2">
                            <label className="block  text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="bg-[#2a2d36] appearance-none border border-gray-500  rounded-sm w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                        <div>
                            <label className="block  text-sm font-bold mb-2" htmlFor="password">
                                Select your Role
                            </label>
                            <Select
                                placeholder="Select Role"
                                searchable
                                nothingFound="No options"
                                data={roles.map((role) => {
                                    return { value: role.id, label: role.role }
                                })}
                                className="mb-6"
                                styles={(theme) => ({
                                    item: {
                                        // applies styles to selected item
                                        '&[data-selected]': {
                                            '&, &:hover': {
                                                backgroundColor: theme.colors.dark,
                                                color: theme.white
                                            },
                                        },

                                        // applies styles to hovered item (with mouse or keyboard)
                                        '&[data-hovered]': {
                                            backgroundColor: theme.colors.gray,
                                        },
                                    },
                                })}
                                clearable
                                onChange={(e) => setBodyData({ ...bodyData, role: e })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={onRegister} className="bg-black hover:bg-gray-800 transition-all text-white font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline" type="button">
                                Register
                            </button>
                            <div className="align-baseline font-bold md:text-sm text-xs text-white hover:text-white flex">
                                Already have an account? &nbsp;
                                <Link href="/login">
                                    <div className="text-tertiary hover:text-[#59a5db] transition-all">Login</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="text-xs">
                            &copy;2022 aliraza.vercel.app. All rights reserved.
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