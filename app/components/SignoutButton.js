// components/LogoutButton.js

import {useRouter} from 'next/navigation';
import {Button} from "antd";

const SignOutButton = () => {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <button onClick={handleLogout}>
            <span className={"bg-secondaryDark p-2 pr-3 pl-3 rounded-2xl"} style={{fontSize: "11px"}}>
                <div className={"inline-block pr-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"/>
                    </svg>
                </div>
                <div className={"inline-block"}>
                    Sign out
                </div>
            </span>
        </button>
    );
};

export default SignOutButton;
