//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json
import axios from 'axios';
async function getMovies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data // this will be the array of user objects
  }  
  const checkString = async (string) =>{
    if (!string) throw "Input doesn't exist"
    if (typeof string !== "string") throw "Input must be a proper type of string"
    string = string.trim();
    if (string.length === 0) throw "Input must not be empty string"
}
const findMoviesByDirector = async (directorName) => {
    await checkString(directorName)
    directorName = directorName.trim()
    const movies = await getMovies()
    let arr = []
    for (let i = 0; i<movies.length;i++){
        if (movies[i].director.toLowerCase( )=== directorName.toLowerCase()){
            arr.push(movies[i])
        }
    }
    if (arr.length <1) throw "No Movies found"
    return arr
    
};

const findMoviesByCastMember = async (castMemberName) => {
    await checkString(castMemberName)
    castMemberName = castMemberName.trim()
    const movies = await getMovies()
    let arr = []
    for (let i = 0; i<movies.length;i++){
        movies[i].cast.forEach(element => {
            let temp = element.toLowerCase();
            if (temp == castMemberName.toLowerCase()){
                arr.push(movies[i])
            }
        })
        
    }
    if (arr.length <1) throw "No Movies found"
    return arr
};
//fix decimal

const getOverallRating = async (title) => {
    await checkString(title)
    title = title.trim()
    const movies = await getMovies()
    let arr = []
    for (let i = 0; i<movies.length;i++){
        
        if (movies[i].title.toLowerCase() === title.toLowerCase()){
            let reviews = movies[i].reviews
            if (reviews.length == 0) throw "Reviews not found"
            let total = reviews.reduce((result, element) => result + element.rating, 0)
            return Math.floor((total/reviews.length)*10)/10
        }
        
    }
    throw "No movies found"
};

const getMovieById = async (id) => {
    await checkString(id)
    const movies = await getMovies();
    id = id.trim();
    for (let i = 0; i<movies.length; i++){
        if (movies[i].id === id){
            return movies[i]
        }
    }
    throw "Not found"
};
export{
    findMoviesByDirector,
    findMoviesByCastMember,
    getOverallRating,
    getMovieById
}