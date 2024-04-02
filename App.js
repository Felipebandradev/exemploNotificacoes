import { Button, StatusBar, StyleSheet, Text, View } from "react-native";

export default function App() {
  const enviarMenssagem = () => {};

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Exemplo de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMenssagem} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
