import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: rgb(12, 170, 12);
    border: none;
    padding: 10px 30px;
    border-radius: 5px;
    &:hover{
        background-color: rgb(5, 82, 5);
        color: rgb(255, 255, 255);
    }
    &:disabled{
        background-color: rgb(147, 239, 147) ;
        cursor: not-allowed;
    }
`;