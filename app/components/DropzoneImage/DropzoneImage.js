'use client'

import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import {useCallback, useEffect, useState} from "react";

import styles from "./Dropzone.module.css";
import {Image, Progress} from "@nextui-org/react";
import {UploadTemplate, UploadTemplateImg} from "@/services/MarketplaceService";

const API_URL = "";

export default function DropzoneImage({SetTemplateThumbName, uploadPercentageData}) {

    const [initUpload, setInitUpload] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [image, setImage] = useState([]);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);






    const onDrop = useCallback((acceptedFiles) => {
        setUploadPercentage(0);

        // append each selected file to the FormData object
        acceptedFiles.forEach((file) => {
            //formData.append('file', file);

            // make a POST request to the server to upload the files
            UploadTemplateImg(file).then((response) => {
                SetTemplateThumbName(response.fileName);
            }).catch((error) => {
                setError(true);
                //setErrorMessage(error.response.data.error);
                console.log(error.response);
            });
        });


    }, []);

    useEffect(() => {
        uploadPercentageData(uploadPercentage);
    }, [uploadPercentage]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div>
            <div {...getRootProps()}
                 className={`${styles.uploadInput} ${styles.conMid} mt-5 mb-3 bg-gray-100 border-2 border-zinc-400 border-dashed`}
                 style={{width: "100%"}}>

                <div className={`${styles.imgContainer}`}>
                    {
                        image.length !== 0 && uploadPercentage === 100 ?
                            image.map(((singleImage, index) => (
                                    <div className={"w-full"} key={index}>
                                        <Image
                                            // isBlurred
                                            isZoomed
                                            src={`${API_URL}/view/${singleImage}`} alt={"upload"}
                                            style={{margin: "12px 30px 0", height: "calc(300px - 68px)"}}
                                        />
                                        <button
                                            className={"text-gray-500 text-sm mt-3 mb-5"}
                                        >Change upload
                                        </button>
                                    </div>
                                )
                            ))
                            :
                            <>
                                {initUpload && uploadPercentage === 0 ?
                                    <>
                                        <input {...getInputProps()} />

                                        <div className={"mb-5"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="h-8 w-full">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                                            </svg>
                                        </div>
                                        <p>Drag and drop some files here,<br/>or click to select files</p>
                                        <p className={"text-xs text-gray-500 mt-3"}>
                                            (Maximum File Size: 5MB)
                                        </p>
                                    </> :
                                    <>
                                        <p>Uploading...</p>
                                        {/*<progress value={uploadPercentage} max="100"/>*/}
                                        <Progress
                                            aria-label="Uploading..."
                                            size="md"
                                            value={uploadPercentage}
                                            color="primary"
                                            showValueLabel={true}
                                            className="w-full"
                                        />
                                    </>}
                            </>
                    }
                    {error &&
                        <span className={"text-red text-sm"}>
                            {errorMessage}
                        </span>
                    }
                </div>

            </div>
        </div>
    )
}