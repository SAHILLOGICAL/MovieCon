import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const SearchNavigator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = 'fc6b0f8734f6d710fed11de93fc496cc'; // Replace 'YOUR_API_KEY' with your actual movie API key

  const searchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <Button title="Search" onPress={searchMovies} />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Release Date: {item.release_date}</Text>
              <Text>Rating: {item.vote_average}</Text>
              {/* You can display more details about each movie */}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  movieItem: {
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SearchNavigator;
