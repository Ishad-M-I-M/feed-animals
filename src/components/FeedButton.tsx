import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { StyledButton } from "./StyledButton";

interface IButtonProps{
    animal: IAnimal;
    updateAnimal(animal: IAnimal):void;
}

export const FeedButton = (props: IButtonProps) => {
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

    const feed = () => {
        console.log("called feed");
        
        let updatedAnimal:IAnimal = {... props.animal}
        updatedAnimal.lastFed = new Date().toISOString();
        props.updateAnimal(updatedAnimal);
        setHoursElapsed(0);
        props.animal.lastFed = new Date().toISOString();

        //updating the animals in localstorage
        let animals = JSON.parse(localStorage.getItem('animals')!) as IAnimal[];
        let updateAnimals = [... animals.filter(x => x.id !== props.animal.id)];
        updateAnimals.push(updatedAnimal);
        updateAnimals.sort((a,b)=> a.id-b.id)
        localStorage.setItem('animals', JSON.stringify(updateAnimals));
    }

    return <StyledButton onClick={feed} disabled={hoursElapsed < 3} >Feed </StyledButton>
}