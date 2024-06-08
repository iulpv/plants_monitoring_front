import React from 'react';
import './PlantsInfo.css';
import {ResponseModel} from "../../apiClient";

function PlantsInfo(props: ResponseModel) {
    const getHealthyState = () => {
        if (props.plant_disease !== undefined) {
            if (props.plant_disease !== 'healthy') {
                return 'disease'
            }
            return props.plant_disease
        }
    }

    const getPlantDisease = () => {
        if (props.plant_disease !== undefined) {
            if (props.plant_disease === 'healthy') {
                return 'none'
            }
            return props.plant_disease
        }
    }

    return (
        <div className="infoBlock">
            {
                Number(props.probability) < 0 ? <span className="info">Изображение не распознано</span> :
                    <div className="plantsInfoBlock">
                        <div className='plantsInfo'>
                            <span className='plantsInfoLabel'>Вид:</span>
                            <span className='plantsInfoContent'>{props.plant_type}</span>
                        </div>
                        <div className='plantsInfo'>
                            <span className='plantsInfoLabel'>Состояние здоровья:</span>
                            <span className='plantsInfoContent'>{getHealthyState()}</span>
                        </div>
                        <div className='plantsInfo'>
                            <span className='plantsInfoLabel'>Возможное заболевание: </span>
                            <span className='plantsInfoContent'>{getPlantDisease()}</span>
                        </div>
                    </div>
            }
            <div className='imageBlock'>
                {props.photo !== undefined &&
                    <img className='image' src={'data:image/png;base64,' + props.photo}
                         alt={''}/>}
            </div>
        </div>

    );
}

export default PlantsInfo;
