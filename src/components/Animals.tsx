import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IAnimal } from "../models/IAnimal";
import { Card } from "./Card";

import '../styles/Layout.css';

export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    useEffect(()=>{
        if(localStorage.getItem('animals') !== null) {
            setAnimals(JSON.parse(localStorage.getItem('animals')!));
            return;
        }

        axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
            .then((response) => {
                // changing the imageUrl of bear
                let animalsAltered = response.data.map((animal)=> {
                    if(animal.id == 2) {
                        let altered = {... animal}
                        altered.imageUrl = "https://www.hdnicewallpapers.com/Walls/Big/Bear/Animal_Bear_Wallpaper.jpg";
                        return altered;
                    }
                    else return animal;
                });

                localStorage.setItem('animals', JSON.stringify(animalsAltered));
                setAnimals(animalsAltered);
            });
            
    },[]);

    return (<div className="animals-wrapper">
        <h1>Animals in Zoo</h1>
        {animals.map((animal:IAnimal)=>{
            return <Card animal={animal} key={animal.id.toString()} />
        })}
    </div>)
}