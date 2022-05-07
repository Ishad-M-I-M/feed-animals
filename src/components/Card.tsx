import {Image} from "./Image";

import { IAnimal } from "../models/IAnimal";
import { useState } from "react";
import { StyledCard } from "./StyledCard";
import { StyledNotice } from "./StyledNotice";
import { FeedNotice } from "./FeedNotice";
import { FeedButton } from "./FeedButton";

interface ICardProps{
    animal: IAnimal;
}

export const Card = (props: ICardProps) => {
    let updateAnimal = () => {
        props.animal.lastFed = new Date().toISOString();
    }

    return (<StyledCard>
        <Image url={props.animal.imageUrl} link={"/animal/"+ props.animal.id.toString()} alt={props.animal.name}/>
        <h3>{props.animal.name}</h3>
        <p>{(props.animal.shortDescription)}</p>
        <FeedNotice animal={props.animal}/>
        <FeedButton animal={props.animal} updateAnimal={updateAnimal} />
        </StyledCard>);
}