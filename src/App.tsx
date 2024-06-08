import React, {useEffect, useState} from 'react';
import './App.css';
import SidePage from "./components/side-page/SidePage";
import {getCameraPhoto, ResponseModel} from "./apiClient";
import PlantsInfo from "./components/plants-info/PlantsInfo";

export enum Errors {
    AutoError = 'Проверьте подключение к камере',
    UploadError = 'Сервис недоступен'
}
function App() {
    const [plantsInfo, setPlantsInfo] =
        useState<ResponseModel | undefined>(undefined)

    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        getCameraPhoto().then(r => setPlantsInfo(r))
            .catch(_ => setError(Errors.AutoError))
    }, []);

    return (
        <div className="mainBlock">
            <SidePage plantsInfo={plantsInfo} setPlantsInfo={setPlantsInfo} setError={setError}/>
            <div className="contentBlock">
                {error !== undefined ?
                    <span className='info'>{error}</span> :
                    plantsInfo !== undefined &&
                    <PlantsInfo plant_type={plantsInfo.plant_type}
                                                            plant_disease={plantsInfo.plant_disease}
                                                            probability={plantsInfo.probability}
                                                            photo={plantsInfo.photo}/>
                }
            </div>
        </div>
    );
}

export default App;
