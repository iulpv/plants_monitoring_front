import React, {ChangeEvent, useEffect, useState} from 'react';
import './SidePage.css';
import {getCameraPhoto, predictPhoto, ResponseModel} from "../../apiClient";
import {Errors} from "../../App";

enum TabName {
    Auto = 'Автонаблюдение',
    Upload = 'Загрузить изображение'
}

function SidePage(props: {
    plantsInfo: ResponseModel | undefined,
    setPlantsInfo: (value: ResponseModel | undefined) => void,
    setError: (value: string | undefined) => void
}) {
    const [tab, setTab] = useState<TabName>(TabName.Auto);

    const getPredictFromCamera = () => getCameraPhoto()
        .then(r => {
        props.setError(undefined)
        props.setPlantsInfo(r)
        })
        .catch(_ => props.setError(Errors.AutoError))


    useEffect(() => {
        if (tab === TabName.Auto) {
            const interval = setInterval(() => {
                void getPredictFromCamera()
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [getPredictFromCamera, props, tab]);
    const handleSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData()
        const file = event.target.files![0];
        formData.append('file', file)

        predictPhoto(formData).then(data => {
            props.setError(undefined)
            props.setPlantsInfo(data)
        }).catch(_ =>
            props.setError(Errors.UploadError))
    }
    return (
        <div className="sidePage">
            <span className="logo">Plants monitoring</span>
            <hr className="menuSep"/>
            <div className="tabBlock">
                <div className={tab === TabName.Auto ? "tab tabSelected" : "tab"}
                     onClick={async () => {
                         setTab(TabName.Auto)
                         await getPredictFromCamera()
                     }}>
                    {TabName.Auto}
                </div>
                <label className={tab === TabName.Upload ? "tab tabSelected" : "tab"}>
                    {TabName.Upload}
                    <input id="fileUploadd" type="file" accept=".jpg, .jpeg" onChange={async (e) => {
                        setTab(TabName.Upload)
                        await handleSetImage(e)
                    }}/>
                </label>
            </div>
        </div>
    );
}

export default SidePage;
