import {Spin} from "antd";

export default function LoadingScreen() {
    return (
        <div className={"w-full con-mid bg-dark"} style={{height: "100vh"}}>
            <div className="loading-screen">
                <div className="loading-screen__inner">
                    <div className="loading-screen__icon">
                        <Spin />
                    </div>
                </div>
            </div>
        </div>
    )
}