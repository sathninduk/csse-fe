'use client';

import React from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Image} from "@nextui-org/react";

export default function CardBox({...props}) {

    let gridColumnClass = "sm:grid-cols-1";

    if (props.buttons) {
        switch (props.buttons.length) {
            case 1:
                gridColumnClass = "sm:grid-cols-1";
                break;
            case 2:
                gridColumnClass = "sm:grid-cols-2";
                break;
            case 3:
                gridColumnClass = "sm:grid-cols-3";
                break;
        }
    }

    return (
        <Card {...props}
              className={"text-light bg-light dark:text-dark dark:bg-dark shadow-none overflow-hidden " + (props.className || "")}>

            {props.image &&
                <div className={"grid justify-center items-center w-full"}
                    style={{backgroundImage: "url(" + props.image + ")", backgroundSize: "cover", backgroundPosition: "center", height: "200px"}}
                />
            }

            <div className={"p-4 pt-0"}>
                <div className="flex justify-between">
                    {(props.title || props.secondary) &&
                        <div className="flex flex-col m-2">
                            {props.title &&
                                <p className="text-md text-lightSecondary dark:text-darkSecondary font-bold">{props.title}</p>}
                            {props.secondary &&
                                <p className="text-xs text-lightSecondary dark:text-darkSecondary">{props.secondary}</p>}
                        </div>
                    }
                    {(props.title2 || props.secondary2) &&
                        <div className="flex flex-col m-2">
                            {props.title2 &&
                                <p className="text-sm text-lightSecondary dark:text-darkSecondary font-bold">{props.title2}$</p>}
                            {props.secondary2 &&
                                <p className="text-xs text-lightSecondary dark:text-darkSecondary">{props.secondary2}</p>}
                        </div>
                    }
                </div>
                {props.description &&
                    <div className={"p-3 pt-4 pb-0"}>
                        <CardBody className={"p-5 bg-secondaryLight dark:bg-secondaryDark rounded-2xl"}>
                            <p className="flex-wrap text-sm">{props.description}</p>
                        </CardBody>
                    </div>
                }
                {(props.buttons && props.buttons.length > 0 && props.buttons.length < 4) &&
                    <>
                        <CardFooter className={`grid gap-2 ${gridColumnClass} grid-cols-1 pt-5 pb-3`}>
                            {
                                props.buttons.length > 0 && props.buttons.map((button, index) => {
                                    return (
                                        <Button className="p-1" key={index} onPress={button.onClick} color={button.color}
                                                size="small" disabled={button.disabled}>
                                            {button.name}
                                        </Button>
                                    )
                                })
                            }
                        </CardFooter>
                    </>
                }
            </div>
        </Card>
    );
}
