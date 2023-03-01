import { FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import BackgroundGradient from "../../../hoc/BackgroundGradient";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button, Modal, Portal } from "react-native-paper";
import { mainBlue, mainButton } from "../../../styles/AppStyles";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

const MorningHabbits = () => {
  const [habbits, setHabbits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => setModalVisible(false);

  const { control, handleSubmit, reset, watch } = useForm();

  const task = watch("task");
  const time = watch("time");

  const addHabbit = async () => {
    const docRef = await addDoc(collection(db, "morningTasks"), {
      task: task,
      time: time,
      isDone: false,
      userId: auth.currentUser.uid,
      taskId: uuidv4(),
    });
  };

  useEffect(() => {
    getHabbits();
  }, []);

  const getHabbits = async () => {
    const q = query(
      collection(db, "morningTasks"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let habbits = [];
    querySnapshot.forEach((doc) => {
      habbits.push(doc.data());
      setHabbits(habbits);
      console.log(habbits);
    });
  };

  return (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      {habbits.length > 0 ? (
        <FlatList
          data={habbits}
          keyExtractor={(item) => item.taskId}
          renderItem={({ item }) => <Text>{item.task}</Text>}
        />
      ) : (
        <Text style={{color: 'white', fontFamily: 'Open-Sans-Bold', fontSize: 20}}>Dodaj swoje pierwsze zadanie</Text>
      )}
      <Button
        onPress={() => setModalVisible(true)}
        labelStyle={{
          fontFamily: "Open-Sans-Bold",
          fontSize: 14,
          flex: 1,
        }}
        style={{ width: "80%", marginBottom: 20 }}
        buttonColor={mainButton}
        textColor="black"
        mode="contained"
      >
        Dodaj rutynę
      </Button>
      <Portal>
        <Modal
          theme={{
            colors: {
              backdrop: "rgba(54, 178, 235, 0.6)",
            },
          }}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "#36B2EB",
            paddingVertical: 30,
            paddingHorizontal: 25,
            marginHorizontal: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Open-Sans-Bold",
              marginBottom: 10,
            }}
          >
            Zadanie do wykonania
          </Text>
          <Controller
            control={control}
            name="task"
            rules={{
              required: "Pole wymagane",
            }}
            render={({
              field: { value = "", onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  style={{
                    backgroundColor: mainBlue,
                    width: "100%",
                    fontSize: 16,
                    marginBottom: 20,
                  }}
                  outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                  mode="outlined"
                  autoCapitalize={false}
                  left={
                    <TextInput.Icon
                      icon={"calendar-check"}
                      iconColor={mainButton}
                    />
                  }
                  placeholder="Wpisz zadanie"
                  placeholderTextColor={"white"}
                  textColor={"white"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error && (
                  <Text
                    style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}
                  >
                    {error.message || "Błąd, spróbuj ponownie"}
                  </Text>
                )}
              </>
            )}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Open-Sans-Bold",
              marginBottom: 10,
            }}
          >
            Godzina wykonania zadania
          </Text>
          <Controller
            control={control}
            name="time"
            render={({
              field: { value = "", onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  style={{
                    backgroundColor: mainBlue,
                    width: "100%",
                    fontSize: 16,
                    marginBottom: 30,
                  }}
                  outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    nextButtonRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  mode="outlined"
                  autoCapitalize={false}
                  left={
                    <TextInput.Icon
                      icon={"clock-digital"}
                      iconColor={mainButton}
                    />
                  }
                  placeholder="Godzina"
                  placeholderTextColor={"white"}
                  textColor={"white"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
                {error && (
                  <Text
                    style={{ color: "red", alignSelf: "stretch", marginTop: 3 }}
                  >
                    {error.message || "Błąd, spróbuj ponownie"}
                  </Text>
                )}
              </>
            )}
          />
          <Button
            onPress={() => {
              handleSubmit();
              addHabbit();
              getHabbits();
              reset("", {
                keepValues: false,
                keepDefaultValues: false,
              });
              setModalVisible(false);
            }}
            labelStyle={{
              fontFamily: "Open-Sans-Bold",
              fontSize: 14,
              flex: 1,
            }}
            style={{ width: "100%" }}
            buttonColor={mainButton}
            textColor="black"
            mode="contained"
          >
            Dodaj
          </Button>
        </Modal>
      </Portal>
    </BackgroundGradient>
  );
};

export default MorningHabbits;
