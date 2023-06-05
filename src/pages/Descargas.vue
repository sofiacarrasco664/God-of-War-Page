<script>
import {getDocs , collection} from "firebase/firestore";
import {db} from '../services/firestore.js';
export default {
  name: "Descargas",
  data: () => ({
    datos: [],
    bandera: false
  }),
  async mounted(){
    this.bandera = true;
    const coleccion = collection(db, 'servicios');
    const query = await getDocs(coleccion);
    query.forEach(doc => {
      if(this.bandera){
        this.datos.push(doc);
      }
    });
    this.bandera = false;
  }
};

</script>

<template>
  <section>
    <h2>Aqui podrás descargar nuestro juego en sus tres versiones y comprar mejoras.</h2>
    <span v-if="bandera" class="lds-dual-ring"></span>

    <div class="articulos">
      <article v-for="dato in datos" :key="dato.id">
        <figure>
          <img :src="dato.data().portada" :alt="dato.data().nombre" />
          <figcaption>
            <h3>{{dato.data().nombre}}</h3>
            <h4>El precio es de: {{dato.data().precio}}</h4>
            <p>{{dato.data().descripcion}}</p>
            <button class="btn btn-primary">Reserva</button>
          </figcaption>
        </figure>
      </article>
    </div>
  </section>
</template>

<style scoped>
section{
  width: 100%;
}
section h2{
  text-align: center;
  font-size: 2rem;
  margin-block: 4rem;
}
.articulos{
  width: min(90%, 1800px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  place-content: center;
  align-items: center;
  margin: auto;
  color: white;
}
.articulos article{
  width: min(100%, 350px);
  background-color: rgb(0, 0, 95);
  border-radius: 14px;
  margin: auto;
}
.articulos article figure{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  row-gap: 4rem;
}
.articulos figure img{
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 14px 14px 0px 0px;
  -webkit-border-radius: 14px 14px 0px 0px;
  -moz-border-radius: 14px 14px 0px 0px;
}
.articulos article figure figcaption{
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding-inline: 0.3rem;
}
.lds-dual-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin:auto;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(1, 42, 63);
  border-color: rgb(2, 57, 85) transparent rgb(4, 68, 101);
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (min-width:1750px){
  .articulos{
    width: min(90%, 1800px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 2rem;
    place-content: center;
    align-items: center;
    margin: auto;
    color: white;
  }
}
</style>