'use client';

import React from "react";
import {Input as AntInput} from "antd";

export default function Input({...props}) {
    return (
        <>
            {props.label &&
                <label className={"text-small text-light dark:text-dark"}>{props.label}</label>
            }
            <AntInput
                className={"mt-2" + (props.className ? " " + props.className : "")}
                {...props}
            />
            {props.error &&
                <span className={"mt-2 text-danger text-xs"}>{props.error} <br /> </span>
            }
        </>
    );
}
