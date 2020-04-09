import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, FlatList, Text } from "react-native";
import films from "../helpers/filmsData";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../Api/TMDBApi"

class Search extends Component {

  state = {
    films: [],
    searchText: ""
  }

  _loadFilms(){
    getFilmsFromApiWithSearchedText("star").then(data => this.setState({
      films: data.results
    }))
  }  

  render() {
    const { films } = this.state;
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textInput} placeholder="Titre du film..." />
        <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._loadFilms()} />
        <FlatList 
            data={films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem film={item}/>}
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 25,
    flex: 1
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  }
});

export default Search;
