import {View, Text, StyleSheet, Image} from "react-native";

import {useDeletePokemonMutation, useGetPokemonByNameQuery} from "@/store/redux/pokemon/pokemonApi";

export default function Home() {
   //https://redux-toolkit.js.org/rtk-query/usage/queries#query-hook-options
   const {
      data,
      isLoading,
      error,
      isFetching,
      isError,
      isSuccess,
      refetch, //функція для повторного запиту
      isUninitialized //якщо true, то запит не відбувався
   } = useGetPokemonByNameQuery('pikachu', {
      skip: false, //якщо true, то запит не відбудеться, можна робити провірку на наявність даних (name !== undefined)
      pollingInterval: 0, //якщо 0, то запит відбудеться тільки один раз , якщо 1000, то кожну секунду
      refetchOnMountOrArgChange: false, //якщо true, то при зміні аргументів запит відбудеться
      refetchOnFocus: false, //якщо true, то при фокусі на екрані запит відбудеться (потрібно щоб був setupListeners(store.dispatch) в store)
      refetchOnReconnect: false, //якщо true, то при перепідключенні до інтернету запит відбудеться

      // selectFromResult: ({ data }) => ({ //якщо задати, то відбудеться вибірка даних з результату запиту
      //    post: data?.find((post) => post.id === id),
      // }),
   });

   // повертає tuple (first: trigger function, second: object with {status, error}, and data etc.)
   //deletePokemon - promise, можем робити то що Репета робив ))
   const [deletePokemon, results] = useDeletePokemonMutation();

   //якщо не задати Image source={{uri:****} розміри, то вони не відобразяться

   return (
      <View style={styles.container}>
         <Text>{data?.species?.name}</Text>
         {isLoading
            ? <Text>Loading...</Text>
            : <Image source={{uri: data?.sprites?.front_shiny}} style={{width: 200, height: 200}}/>
         }
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
   },
});

