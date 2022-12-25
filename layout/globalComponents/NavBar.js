import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default () => {
    const router = useRouter()
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem('pos-system-token'))
    }, [])


    return (
        <div className="h-12 bg-black text-white font-semibold flex justify-between items-center px-4">
            <div className="text-xl cursor-pointer select-none" onClick={() => router.push('/')}>POS SYSTEM</div>
            <div className={`flex ${token ? 'justify-end' : 'justify-between'} w-32`}>
                {
                    !token ?
                        <>
                            <div className="cursor-pointer select-none" onClick={() => router.push('/login')}>Login</div>
                            <div className="cursor-pointer select-none" onClick={() => router.push('/register')}>Register</div>
                        </>
                        :
                        <div className="cursor-pointer select-none" onClick={() => {
                            localStorage.removeItem('pos-system-token')
                            localStorage.removeItem('pos-system-user')
                            router.push('/login')
                        }}>Logout</div>
                }
            </div>
        </div>
    )
}