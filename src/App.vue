<script setup>
import { logout} from "./services/auth.js";
import {useRouter} from "vue-router";
import useAuth from "./composition/useAuth";

const router = useRouter();
const {user} = useAuth();

function handleLogout() {
  logout();
  router.push('/iniciar-sesion');
}
</script>

<template>
    <header class="navbar navbar-expand-lg navbar-light bg-light">
        <section class="container-fluid">
            <h1 class="navbar-brand">God Nordic</h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Abrir/cerrar menú de navegación">
                <span class="navbar-toggler-icon"></span>
            </button>
            <nav class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/descargas">Descargas</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chat">Chat</router-link>
                    </li>
                    <template v-if="user.id === null">
                        <li class="nav-item">
                        <router-link class="nav-link" to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/registro">Crear Cuenta</router-link>
                    </li>

                </template>
                <template v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/perfil">Perfil</router-link>
                    </li>
                    <li class="nav-item">
                            <form action="#" method="post" @submit.prevent="handleLogout">
                                <button class="btn nav-link bg-info text-dark">Cerrar Sesión {{user.email}}</button>
                            </form>
                        </li>
                </template>
                </ul>
            </nav>
        </section>
    </header>
    <main class="container-fluid">
        <router-view />
    </main>
    <footer class="container-fluid text-center mt-5">
        <section class="row pt-4 pb-1">
            <div class="col-md logo-footer py-3">
                <h1 class="navbar-brand">God Nordic</h1>
            </div>
            <details class="col-md py-3">
                <summary>Todos los derecheos reservados</summary>
                <p>Diaz Jose | Carrasco Sofi | Fiorito Ariel</p>
            </details>
                <ul class="col-md d-flex justify-content-center gap-3 list-unstyled">
                    <li class="color-icono">
                        <a href="http://www.facebook.com"><i class="bi bi-facebook"></i></a>
                    </li>
                    <li class="color-icono"> 
                        <a href="http://www.instagram.com"><i class="bi bi-twitter"></i></a>
                    </li>
                    <li class="color-icono">
                        <a href="http://www.pinterest.com"><i class="bi bi-pinterest"></i></a>
                    </li>
                    <li class="color-icono">
                        <a href="http://www.youtube.com"><i class="bi bi-youtube"></i></a>
                    </li>
                </ul>
        </section>
    </footer>

</template>
<style scoped>
    .color-icono a{
        font-size: 1.4rem;
        color: rgba(19, 19, 69, 0.668);
        transition: all 0.3s ease-in-out;
    }
    .color-icono a:hover{
        color: rgb(0, 83, 83);
    }
</style>