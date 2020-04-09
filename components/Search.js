import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../Api/TMDBApi";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false
    };
    this.page = 0;
    this.totalPages = 0;
    this.searchText = "";
  }

  _loadFilms() {
    this.setState({
      isLoading: true
    });

    if (this.searchText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        }
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => {
        console.log(
          `Page: ${this.page} TotalPages: ${this.totalPages} Nombre de films: ${this.state.films.length}`
        );
        this._loadFilms();
      }
    );
  }

  _searchTextInputChange(text) {
    this.searchText = text;
  }

  render() {
    console.log(this.state.isLoading);
    const { films } = this.state;
    return (
      <View style={styles.main_container}>
        <TextInput
          onSubmitEditing={() => this._searchFilms()}
          onChangeText={text => this._searchTextInputChange(text)}
          style={styles.textInput}
          placeholder="Titre du film..."
        />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._searchFilms()}
        />
        <FlatList
          data={films}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (films.length > 0 && this.page < this.totalPages) {
              this._loadFilms();
            }
          }}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
        {this._displayLoading()}
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
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Search;
