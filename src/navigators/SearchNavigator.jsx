import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

// Define a color palette
const colors = {
  primary: '#d24dff',   // Purple
  background: 'black',
  text: 'white',
  inputBorder: 'gray',
  inputBackground: '#202020',
  buttonBackground: '#202020',
  buttonTextColor: 'white',
  movieItemBorder: 'white',
};

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.inputBorder, backgroundColor: colors.inputBackground }]}
        placeholder="Search for a movie..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <Button
        title="Search"
        onPress={searchMovies}
        color={colors.buttonBackground}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.movieItem, { borderColor: colors.movieItemBorder }]}>
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={{ color: colors.text }}>Release Date: {item.release_date}</Text>
              <Text style={{ color: colors.text }}>Rating: {item.vote_average}</Text>
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
  },
  input: {
    height: 100,
    width: '80%', // Adjust the width as needed
    borderWidth: 10,
    borderColor: 'purple',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  movieItem: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchNavigator;
