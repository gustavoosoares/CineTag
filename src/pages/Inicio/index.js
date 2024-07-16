import Banner from "components/Banner";
import Titulo from "components/Titulo";
import Card from "components/Card";
import styles from './Inicio.module.css';
import { useEffect, useState } from "react";

function Inicio() {
    const [videos, setVideos] = useState([]);
    const [bannerIndex, setBannerIndex] = useState(0);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/gustavoosoares/cinetag-api/videos`)
            .then(resposta => resposta.json())
            .then(dados => {
                setVideos(dados)
            })
    }, [])

      // Lógica para alternar automaticamente entre os banners a cada 5 segundos
      useEffect(() => {
        const interval = setInterval(() => {
            setBannerIndex((prevIndex) => (prevIndex + 1) % 3); // Assumindo que há 3 banners
        }, 3000); // Intervalo de 5 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    }, []);

    return(
        <>
            <Banner imagem={`home${bannerIndex + 1}`} /> 
            <Titulo >
                <h1>O Melhor lugar para se qualificar!</h1>
            </Titulo>
            <section className={styles.container}>
                {videos.map((video) => {
                    return <Card {...video} key={video.id} />
                })}
            </section>
        </>
    )
}

export default Inicio;