import axios from "axios"
import {nanoid} from "nanoid"
import moment from 'moment';
import 'moment/locale/es';
//data inicial
const data_inicial = {
    name: "",
    actor: [],
    movies: []
}


//types
const PERFIL_ACTOR_EXITO = "PERFIL_ACTOR_EXITO"
const MOVIES_EXITO = "MOVIES_EXITO"
const NOMBRE_RECIVIDO = "NOMBRE_RECIVIDO"


//reducer
export default function peliculaDuck (state = data_inicial , action)  {
    switch (action.type) {
        case PERFIL_ACTOR_EXITO :
            return {...state, actor: action.payload}
        case NOMBRE_RECIVIDO :
            return {...state, name: action.payload}
        case MOVIES_EXITO :
            return {...state, movies: action.payload}  
        default:
            return state
    }
}

//acciones
export const actorPerfilAccion = (nombreActor) => async(dispatch) => {
    const url = `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&query=${nombreActor}`
    if (localStorage.getItem(url+"perfil")){
        console.log("desde storage")
        dispatch({
            type: PERFIL_ACTOR_EXITO,
            payload: JSON.parse(localStorage.getItem(url+"perfil"))
        })
        return
    }
    try {
        const response = await axios.get(url)
        dispatch({
            type: PERFIL_ACTOR_EXITO,
            payload: {
                name: response.data.results[0].name,
                popularity: response.data.results[0].popularity,
                image: "https://image.tmdb.org/t/p/w500/"+response.data.results[0].profile_path,
                gender: response.data.results[0].gender === 2 ? "Hombre" : "Mujer"
            }
        })
        localStorage.setItem(url+"perfil",JSON.stringify({
            name: response.data.results[0].name,
            popularity: response.data.results[0].popularity,
            image: "https://image.tmdb.org/t/p/w500/"+response.data.results[0].profile_path,
            gender: response.data.results[0].gender === 2 ? "Hombre" : "Mujer"
        }))
    } catch (error) {
        console.log(error)
    }
}

export const moviesAccion = (nombreActor) => async(dispatch) => {
    const url = `https://api.themoviedb.org/3/search/person?api_key=30db1237b9167f8afaf9e065b90d16b8&query=${nombreActor}`
    if (localStorage.getItem(url)){
        console.log("desde storage")
        dispatch({
            type: MOVIES_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    try {
        const response = await axios.get(url)
        const movies =   response.data.results[0].known_for.map( movie =>(
            movie.media_type === "movie" && (
                {   
                    id: nanoid(),
                    title: movie.title,
                    calif: movie.vote_average+"/10",
                    overview: movie.overview,
                    image: "https://image.tmdb.org/t/p/w500/"+movie.poster_path,
                    date: moment(movie.release_date).format('LL')
                }
            )

        ))
        dispatch({
            type: MOVIES_EXITO,
            payload: movies,
        })
        localStorage.setItem(url,JSON.stringify(movies))
    } catch (error) {
        console.log(error.message)
    }
}

export const setNombreAction = (nombreActor = "") => (dispatch) => {
    dispatch({
        type: NOMBRE_RECIVIDO,
        payload: nombreActor
    })
}