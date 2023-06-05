<script>
export default {
    name: "Home",
    data: () => ({
        cards: [
            {
                img: 'https://media.tycsports.com/files/2021/10/20/348055/god-of-war-ragnarok_862x485.jpg' ,
                title: 'Un futuro sin horizontes',
                description: 'Atreus busca conocimiento que lo ayude a entender la profecía de "Loki" y establecer su rol en Ragnarök. Kratos debe decidir entre quedarse atado al miedo de repetir sus errores o librarse del pasado para ser el padre que Atreus necesita.',
                id: 1
            },
            {
                img: 'https://www.gamecored.com/wp-content/uploads/2021/09/god-of-war-ragnarok-de4-1620x800.jpg' ,
                title: 'Instrumentos de guerra',
                description: 'El hacha Leviatán, las Espadas del Caos y el Escudo de guardián regresan junto con una amplia variedad de nuevas habilidades para Kratos y Atreus.',
                id: 2
            },
            {
                img: 'https://ministeriodelgamer.com/wp-content/uploads/2022/10/La-version-de-God-of-War-Ragnarok-para-PS4-sera.jpg' ,
                title: 'Explora inmensos reinos',
                description: 'Viaja a través de peligrosos e increíbles paisajes a la vez que te enfrentas a una variedad de criaturas enemigas, monstruos y dioses nórdicos mientras que Kratos y Atreus buscan respuestas.',
                id: 3
            }
        ]
    })
};
</script>

<template>
    <!--Hero Image-->
    <section class="container-fluid w-100 hero">
        <h2 class="mt-5 row">Embárcate en un épico viaje mientras Kratos y Atreus luchan por aferrarse y soltar.</h2>

        <p class="w-50">Atreus busca conocimiento que lo ayude a entender la 
            profecía de "Loki" y establecer su rol en Ragnarök. 
            Kratos debe decidir entre quedarse atado al miedo de repetir
            sus errores o librarse del pasado para ser el padre que 
            Atreus necesita.</p>
        <router-link class="link" to="/descargas">Descargas</router-link>
   </section>
   <!--Hero image 2-->
   <section class="container-fluid show">
        <div class="row w-50 me-4">
        <h2>Embárcate en un épico y cordial viaje mientras Kratos y Atreus luchan por aferrarse y soltar</h2>
        <p>Desde Santa Monica Studio llega la secuela del aclamado por la crítica God of War (2018). Fimbulvetr ya está en camino. Kratos y Atreus deben viajar a cada uno de los nueve reinos en búsqueda de respuestas, mientras que las fuerzas asgardianas se preparan para una batalla profetizada que terminará con el mundo. En el camino explorarán paisajes increíbles y míticos, y se enfrentarán a aterradores enemigos en la forma de dioses nórdicos y monstruos. La amenaza del Ragnarök cada vez está más cerca. Kratos y Atreus deben elegir entre su propia seguridad y la seguridad de los reinos.</p>
        </div>
   </section>
   <section class="container-fluid section__cards">
        <h2>LA SAGA NÓRDICA CONTINÚA</h2>
        <div class="cards">
            <article v-for="card in cards" :key="card.id">
                <figure>
                    <img class="rounded" :src="card.img" :alt="card.title" />
                        <figcaption>
                            <h3>{{card.title}}</h3>
                            <p>{{card.description}}</p>
                        </figcaption>
                </figure>
        </article>
        </div>
   </section>
</template>

<style scoped>
    .hero{
        height: 80vh;
        background-image: url('../assests/portada.jpg');
        background-repeat: no-repeat;
        background-position:center top;
        background-size:cover;
        background-color: rgba(0, 0, 0, 0.46);
        background-blend-mode: multiply;
        color: white;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 1rem;
    }
    .link{
        text-decoration: none;
        background-color: rgb(0, 0, 96);
        padding-block: 1rem;
        padding-inline: 1rem;
        color: white;
        border-radius: .9rem;
    }
    .show{
        min-height: 100vh;
        background-image: url('../assests/image_1.jpg');
        background-repeat: no-repeat;
        background-position:center;
        background-size: cover;
        background-color: rgba(0, 0, 0, 0.664);
        background-blend-mode: multiply;
        display: flex;
        align-items: center;
        clip-path: polygon(0 0, 100% 0%, 100% 80%, 0 96%);
        color: white;
        margin-block-end: -15rem;
    }
    .show div{
       display: flex;
       row-gap: 3rem;
       margin-inline-start: 2.7rem;
    }
    .section__cards{
        min-height: 100vh;
        background-image: url('../assests/background_cards.jpg');
        background-repeat: no-repeat;
        background-position:center top;
        background-size:cover;
        background-color: rgba(0, 0, 0, 0.723);
        background-blend-mode: multiply;
        margin-block-start: -2rem;
        padding-block-start: 17rem;
        padding-block-end: 7rem;
        padding-inline: 5rem;
        color: white;
    }
    .section__cards h2{
        width: 100%;
        text-align: center;
        padding-block-end: 3rem;
    }
    .cards{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(300px, 1fr));
        justify-content: center;
        gap: 3rem;
        margin: auto;
    }
    .cards article figure{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 1 400px;
        row-gap: 2rem;
    }
    .cards figure img{
        max-width: 400px;
        min-height: 300px;
        object-fit: cover;
        height: auto;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }
    .cards figure img:hover{
        transform: scale(1.1);
    }
</style>