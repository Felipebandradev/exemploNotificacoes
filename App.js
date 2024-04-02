import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
/* Importando o expo-notifications */
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

/* Manipulador de eventos de notificações */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    /* Verificações/configurações de permissão de notificação
    exclusiva para IOS     */
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
        },
      });
    }

    permissoesIos();

    /* Ouvinte de Evento para notificações recebidas, ou seja,
     quando a notificação aparece no topo do app */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas as notificações, ou seja,
     quando o usuário interage(toca) com a notificação */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta);
      setDados(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMenssagem = async () => {
    /* Montando a menssagem que será enviada
    via sistema de notificação local */
    const menssagem = {
      title: "Lembrete 📖",
      body: "Não se esqueça de estudar muito... senão, reprova! ☠",
      data: {
        usuario: "chapolin colorado 🤩",
        cidade: "São Paulo",
      },
    };

    /* Função de agendamento de notificações */
    await Notifications.scheduleNotificationAsync({
      // Conteudo da notificação
      content: menssagem,
      // Adicionar/disparador da notificação
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Exemplo de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMenssagem} />

        {dados && (
          <View
            style={{
              marginVertical: 8,
              backgroundColor: "yellow",
              padding: 18,
            }}
          >
            <Text>Usuário: {dados.usuario} </Text>
            <Text>Cidade: {dados.cidade} </Text>
          </View>
        )}
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
