"use client"
import { Input } from 'antd';
const { TextArea } = Input;


export default function Textarea({ ...props }) {
    return (

        <>
            {props.label &&
                <label className={"text-xs text-light dark:text-dark"}>{props.label}</label>
            }

            <TextArea rows={4} {...props}
                className={"mt-2" + (props.className ? " " + props.className : "")}
                {...props}
            />

            {props.error &&
                <span className={"mt-2 text-danger text-xs"}>{props.error}</span>
            }

        </>

    );
}