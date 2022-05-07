import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { StyledNotice } from "./StyledNotice";

interface INoticeProps{
    animal: IAnimal;
}

export const FeedNotice = (props:INoticeProps) => {
    const millisInHour: number = 60*60*1000;
    const [hoursElapsed, setHoursElapsed] = useState<Number>((new Date().getTime() - new Date(props.animal.lastFed).getTime())/ (millisInHour));

    useEffect(()=>{
        const interval = setInterval(() => {
            setHoursElapsed((new Date().getTime() - new Date(props.animal.lastFed).getTime())/ (millisInHour))
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    },[]);
    

    if (hoursElapsed > 4) return <StyledNotice>Need to be fed</StyledNotice>;
    else return <></>;
}