import styled from 'styled-components';

interface IStyledCardProps{
    width?:string;
    background?:string;
}

export const StyledCard = styled.div`
    width: ${(props:IStyledCardProps)=> props.width || "600px"};
    background-color: ${(props:IStyledCardProps)=> props.background || "white"}
    border: 1px solid rgb(100, 100, 100);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 5px 10px rgba(100, 100, 100,0.5);
    padding: 10px;
`;