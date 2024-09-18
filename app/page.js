'use client';

import Image from 'next/image';

import './homepage.css';
import styles from './page.module.css';
import Navigation from "@/app/components/website/Navigation";
import DashboardFooter from "@/app/layouts/DashboardFooter";
import React from "react";

export default function Home() {
    return (
        <main className={`${styles.main} pr-8 pl-8 md:pr-24 md:pl-24`}
              style={{
                  paddingTop: "50px"
              }}
        >
            <Navigation />
            <div className={"back-container"}>

                {/*  gradient elements  */}
                <div className={"grad-1"}/>
                {/* l - u */}
                <div className={"grad-2"}/>
                {/* l - m */}
                <div className={"grad-4"}/>
                {/* l - d */}
                <div className={"grad-5"}/>
                {/* r - u */}
                <div className={"grad-3"}/>
                {/* r - m */}
                <div className={"grad-6"}/>
                {/* r - d */}

                <div className={"grad-8"}/>
                {/* u - l */}
                <div className={"grad-7"}/>
                {/* u - r */}

            </div>

            {/*<div className={styles.description}>*/}
            {/*    <div>*/}
            {/*        <a*/}
            {/*            href="/"*/}
            {/*            target="_blank"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-40 pt-12 md:pt-0"}
                 style={{
                     zIndex: 0,
                     height: "80vh"
                 }}
            >
                <div className={"con-mid"} style={{
                    alignItems: "start"
                }}>
                    <h1
                        style={{
                            fontWeight: "bold",
                            lineHeight: "1",
                            fontSize: "5rem",
                            zIndex: 1
                        }}
                    >
                        CSSE
                    </h1>

                    <p
                        className={"text-lightSecondary mt-2"}
                        style={{
                            zIndex: 1
                        }}
                    >
                        Software Verification Technology
                    </p>

                </div>
                <div className={"con-mid"}
                     style={{maxWidth: "100vw", overflow: "hidden"}}
                >
                    <div className={`launchpad ${styles.center} overflow-hidden`}>
                        <div className={"wave ai-wave-1-1 hidden md:block"}/>
                        <div className={"wave ai-wave-1-2 hidden md:block"}/>
                        <div className={"wave ai-wave-2 hidden md:block"}/>
                        <div className={"wave ai-wave-3 hidden md:block"}/>
                        <div className={`${styles.center}`}>
                            <Image src="/images/logos/csse-icon-black-120.png"
                                   className={"fade-in main-img-overwrites wave ai-wave-2-2"}
                                   alt="CSSE Logo"
                                   width={120}
                                   height={120}
                                   priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className={"section-2 mt-12 md:mt-0 pt-36 pb-16 pl-8 pr-8 md:pl-48 md:pr-48"}>
                <div className={"container mb-0"} style={{lineHeight: "1"}}>
                    <h1 className={"p-3 md:p-0"} style={{fontSize: "36px"}}>
                        CSSE
                    </h1>
                    <h1 className={"p-3 md:p-0"} style={{fontSize: "64px"}}>data</h1>
                </div>
                <div className={`diagram ${styles.grid}`}>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Static Data
                            <p className={"text-xs text-darkSecondary pt-3"}>
                                CSSE manages and delivers static data in a distributed under ultra low latency.
                            </p>
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Personalized Data
                            <p className={"text-xs text-darkSecondary pt-3"}>
                                CSSE provides personalization data for an enhanced user experience.
                            </p>
                        </div>
                    </div>
                    <div className={"con-mid"}>
                        <div className={"flow-block"}>
                            Data Crawling
                            <p className={"text-xs text-darkSecondary pt-3"}>
                                CSSE provides updated data for search engine crawlers through CSSE API.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <div className={"section-4 pt-4 md:pt-12 pb-14 pl-8 pr-8 md:pl-48 md:pr-48"}>
                <div className={"container"} style={{lineHeight: "1"}}>
                    <h1 style={{fontSize: "36px"}}>
                        CSSE integrates
                    </h1>
                    <h1 style={{fontSize: "64px"}}> all web needs</h1>
                </div>
                <p className={"mt-12 text-darkSecondary"}>
                    CSSE introduces the world&apos;s first distributed static data technology, revolutionizing web data
                    delivery. Moreover, CSSE offers an all-in-one web addons platform for web developers, encompassing
                    web chat services, web analytics, and more in the forthcoming updates. With this integrated
                    platform, managing all your web requirements becomes effortless.
                </p>
            </div>

            <div className={"section-4 pt-24 pb-36 pl-8 pr-8 md:pl-48 md:pr-48"}>
                <h1 style={{fontSize: "36px", textAlign: "center"}}>
                    CSSE enhances your web...
                </h1>
            </div>

            <div
                style={{
                    width: "100vw",
                }}
            >
                <DashboardFooter />
            </div>
        </main>
    );

}