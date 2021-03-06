const API_TOKEN = "";
const API_END_POINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?api_key=";
const LANG_QUERY = "&language=fr&query="

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = `${API_END_POINT}${SEARCH_URL}${API_TOKEN}${LANG_QUERY}${text}&page=${page}`
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function getImageFromApi(name){
  return `https://image.tmdb.org/t/p/w300${name}`
}