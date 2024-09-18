"use client";

import Input from "@/app/components/Input";
import {Form, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import {Button} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {LoginService, StatusService} from "@/services/AuthService";
import {useRouter} from "next/navigation";
import schema from "@/app/validaitions/LoginValidation";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function LoginPage() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true); // loading state

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoading(false);
            router.push('/admin/users/manage-admins');
        } else {
            setLoading(false);
        }
    }, [router]);

    const Login = async () => {
        setError({});

        try {
            const data = {email, password};

            // validate
            await schema.validate(data, {abortEarly: false});

            LoginService(data).then(async (response) => {
                const data = await response;

                // check if the response is successful
                if (data.status === 1) {

                    // save the token to the local storage
                    localStorage.setItem("token", data.accessToken);

                    // redirect to the dashboard
                    router.push("/u");

                } else {
                    // show the error message
                    alert(data.message);
                }

            }).catch((error) => {
                if (error.response.data.message === "Bad credentials") {
                    setError({email: " ", password: "Invalid email or password"})
                    Message("error", "Authentication failed");
                } else {
                    Message("error", "Something went wrong");
                }
            });

        } catch (validationError) {
            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        }
    }

    useEffect(() => {
        StatusService().then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    if (loading) {
        return <LoadingScreen/>
    }

    return (
        <>
            {contextHolder}
            <div className={"w-full con-mid p-6 lg:p-0 overflow-hidden"} style={{minHeight: "100vh"}}>
                <div className={"dark:bg-secondaryDark w-full sm:w-3/4 lg:w-1/2 p-6 lg:p-12 rounded-2xl"}>
                    <div className={"md:grid md:grid-cols-3 md:gap-12"}>
                        <div className={"col-span-1 p-2"}>
                            <div className={"w-full text-left"}>
                                <div className={"md:grid grid-cols-1 md:gap-24"}>
                                    <div>
                                        <img src={"/images/logos/csse-logo-white.png"}
                                             className={"w-1/2 sm:w-1/2 md:w-3/4 lg:w-full xl:w-4/5"}
                                             alt={"CSSE Logo"}/>
                                        <h1 className={"dark:text-dark mt-3 text-md sm:text-lg mb-3 sm:mb-0"}>Admin Sign
                                            in</h1>
                                    </div>
                                    <div className={"hidden md:block"}>
                                        <p style={{fontSize: "10px"}} className={"mb-2"}>
                                            © {new Date().getFullYear()} CSSE. All rights reserved.
                                        </p>
                                        <p style={{fontSize: "9px"}} className={"dark:text-darkSecondary"}>
                                            Software Verification Technology.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-span-2 p-2"}>
                            <Form>
                                <FormItem>
                                    <Input
                                        name={"email"}
                                        id={"email"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label={"Email"}
                                        className={"w-full"}
                                        placeholder={"Email"}
                                        status={error.email ? "error" : ""}
                                        error={error.email}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Input
                                        name={"password"}
                                        id={"password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label={"Password"}
                                        className={"w-full"}
                                        placeholder={"Password"}
                                        type={"password"}
                                        status={error.password ? "error" : ""}
                                        error={error.password}
                                    />
                                </FormItem>
                                <Button variant={"flat"} color={"primary"} className={"w-full mt-2"} onClick={Login}>Sign
                                    in</Button>
                            </Form>
                        </div>
                        <div className={"block md:hidden text-center"}>
                            <p style={{fontSize: "10px"}} className={"mb-2 mt-3 dark:text-darkSecondary"}>
                                © {new Date().getFullYear()} CSSE. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}