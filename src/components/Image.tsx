interface ImageProps{
    url: string;
    link: string;
    alt: string;
}

export const Image = (props: ImageProps) =>{
    return (
        <a href={props.link}>
            <img src={props.url} width="400px" alt={props.alt}/>
        </a>
    )
}