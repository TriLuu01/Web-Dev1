//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json
import axios from 'axios';
async function getUsers(){
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json')
    return data // this will be the array of user objects
  }
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
const getUserById = async (id) => {
    const users = await getUsers();
    await checkString(id)
    id = id.trim()
    for (let i = 0; i<users.length; i++){
        if (users[i].id === id){
            return users[i] 
        }
    }
    throw "User Not found"
};


const sameGenre = async (genre) => {
    const users = await getUsers();
    
    await checkString(genre)
    genre = genre.trim();
    let arr = []
    for (let i = 0; i<users.length; i++){
        if (users[i].favorite_genre.toLowerCase() === genre.toLowerCase()){
            arr.push(`${users[i].first_name} ${users[i].last_name}`)
        }
    }
    if (arr.length < 2) throw "Must have at least 2 users"
    if (arr.length > 50) arr.splice(50)
    return arr.sort((a,b) => a.split(' ')[1].localeCompare(b.split(' ')[1]));

};

const moviesReviewed = async (id) => {
    
    const userName = (await getUserById(id)).username
    const movies = await getMovies()
    await checkString(id)
    id = id.trim()
    let arr =[]
    for (let i =0;i <movies.length;i++){
        let obj = {}
        let reviews_arr = movies[i].reviews;
        for (let j = 0; j< reviews_arr.length; j++){
            if (reviews_arr[j].username === userName){
                obj[movies[i].title] = reviews_arr[j]
                arr.push(obj)
            }
        }
        
    }
    if (arr.length == 0) throw "user not found"
    return arr
};

const referMovies = async (id) => {
    
    const genre = (await getUserById(id)).favorite_genre
    const movies = await getMovies()
    await checkString(id)
    id = id.trim();
    const reviewed_movies = (await moviesReviewed(id)).flatMap(element => Object.keys(element))
    let arr =[]
    for (let i =0; i< movies.length;i++){
        if (movies[i].genre.includes(genre)){
            arr.push(movies[i].title)
        }
    }
    return arr.filter(element => !reviewed_movies.includes(element))
    
};

export{
    getUserById,
    sameGenre,
    moviesReviewed,
    referMovies
}

