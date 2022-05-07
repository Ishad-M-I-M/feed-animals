import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { NotFound } from "./NotFound";
import { Image } from "./Image";

import '../styles/Layout.css';
import { FeedButton } from "./FeedButton";

export const Animal = () => {
    const [animal, setAnimal] = useState<IAnimal>();
    const params = useParams();


    useEffect(()=>{
        let animals:IAnimal[];

        if(localStorage.getItem('animals') !== null) {
            animals = JSON.parse(localStorage.getItem('animals')!) as IAnimal[];

            if (animals.filter(x => x.id === parseInt(params.id!)).length !== 0){
                setAnimal(animals.filter(x => x.id === parseInt(params.id!))[0]);
            }
            
        }
        else{
            axios.get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
            .then((response) => {
                let animalsAltered = response.data.map((animal)=> {
                    if(animal.id == 2) {
                        let altered = {... animal}
                        altered.imageUrl = "https://www.hdnicewallpapers.com/Walls/Big/Bear/Animal_Bear_Wallpaper.jpg";
                        return altered;
                    }
                    else return animal;
                });

                localStorage.setItem('animals', JSON.stringify(animalsAltered));
                animals = animalsAltered;

                if (animals.filter(x => x.id === parseInt(params.id!)).length !== 0){
                    setAnimal(animals.filter(x => x.id === parseInt(params.id!))[0]);
                }
            });
        }       
            
    }, []);
   
    if (animal === undefined){
        return <NotFound/>;
    }
    else{
        return (
            <div className="animal-wrapper">
                <h1>{animal.name}</h1>
                <h2>({animal.latinName})</h2>
                <Image url={animal.imageUrl} link="#" alt={animal.name}/>
                <p>{animal.longDescription}</p>
                <FeedButton animal={animal} updateAnimal={setAnimal}></FeedButton>
            </div>);
    }
    
}