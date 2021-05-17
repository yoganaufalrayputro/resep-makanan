import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

const API = "masak-apa-tomorisakura.vercel.app";
const endpoint = "api/search/";

const SearchItem = () => {
  const [search, setSearch] = useState();
  const [result, setResult] = useState();

  const updateSearch = (search) => {
    setSearch({ search });
  };

  useEffect(() => {
    if (search !== "") {
      fetch(`${API}${endpoint}/api/search/?q=${search}`)
        .then((respone) => respone.json())
        .then((json) => {
          setResult(json.results);
          // console.log(resep);
        })
        .catch((error) => console.error(error));
    }
  });

  return (
    <View>
      <SearchBar
        round
        placeholder="mau masak apa hari ini?"
        onChangeText={updateSearch}
        value={search}
        lightTheme
      />

      <View>
        {/* <FlatList
          data={result}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View>
                <Text>{item.result}</Text>
              </View>
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // numColumns={5}
        /> */}
        {/* <Text>{search}</Text> */}
      </View>
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({});
