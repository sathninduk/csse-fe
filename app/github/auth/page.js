"use client";

import {useEffect} from "react";
import { useSearchParams } from "next/navigation";
import {Spin} from "antd";
import {authorizeGithub} from "@/services/GitHubService";

export default function GitHubAuthPage() {
    const searchParams = useSearchParams();

    // get code from query params
    const code = searchParams.get('code');

    useEffect(() => {
        if (code) {
            authorizeGithub(code).then((response) => {
                window.location.href = '/u';
            });
        }
    }, []);

    return (
        <div className={"w-full con-mid"} style={{height: "100vh"}}>
            <Spin />
            <h1 className={"m-5"}>Authorizing</h1>
        </div>
    )
}