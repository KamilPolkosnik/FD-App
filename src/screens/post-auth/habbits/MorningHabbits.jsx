import { FlatList, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import BackgroundGradient from "../../../hoc/BackgroundGradient";
import { Controller, useForm } from "react-hook-form";
import {
  TextInput,
  Button,
  Modal,
  Portal,
  ActivityIndicator,
  FAB,
} from "react-native-paper";
import {
  mainBlue,
  mainButton,
  mainGreen,
  mainPurple,
} from "../../../styles/AppStyles";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CircularProgress from "react-native-circular-progress-indicator";

const MorningHabbits = () => {
  const [habbits, setHabbits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(true);

  const hideModal = () => setModalVisible(false);

  const { control, handleSubmit, reset, watch } = useForm();

  const task = watch("task");
  const time = watch("time") ? watch("time") : null;

  let habbitsToDo = [];
  habbits.map((habbit) => {
    if (habbit.isDone === false) {
      habbitsToDo.push(habbit);
    }
  });
  let habbitsDone = [];
  habbits.map((habbit) => {
    if (habbit.isDone === true) {
      habbitsDone.push(habbit);
    }
  });

  const addHabbit = async () => {
    const docRef = await addDoc(collection(db, "morningTasks"), {
      task: task,
      time: time,
      isDone: true,
      userId: auth.currentUser.uid,
      taskId: uuidv4(),
    });
  };

  let getPercent = (x, y) => {
    const percent = (y / x) * 100;
    return percent;
  };

  let habbitsSummary = habbitsDone.length + habbitsToDo.length;
  let progressBarDone = getPercent(habbitsSummary, habbitsDone.length);
  let restProgress = 100 - progressBarDone;

  const getHabbits = async () => {
    const q = query(
      collection(db, "morningTasks"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let habbits = [];
    querySnapshot.forEach((doc) => {
      let habbit = doc.data();
      habbit.id = doc.id;
      habbits.push(doc.data());
      setHabbits(habbits);
    });
    setActiveIndicator(false);
  };

  useEffect(() => {
    getHabbits();
  }, []);

  return (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <LinearGradient
        colors={[mainBlue, mainPurple]}
        style={{
          width: "100%",
          height: "30%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30,
          borderBottomColor: mainGreen,
          borderBottomWidth: 2,
        }}
        locations={[0.5, 0.99]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: habbits.length > 0 ? "space-between" : 'center',
            width: "100%",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Open-Sans-Bold",
              color: "white",
              fontSize: 16,
              marginBottom: 3,
            }}
          >
            Zadania do wykonania: {habbitsToDo.length}
          </Text>
          {habbits.length > 0 ? (
            <CircularProgress
              radius={30}
              activeStrokeWidth={5}
              inActiveStrokeWidth={3}
              value={restProgress}
              valueSuffix={"%"}
              strokeColorConfig={[
                { color: "red", value: 0 },
                { color: mainGreen, value: 100 },
              ]}
              progressValueColor={mainGreen}
            />
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: habbits.length > 0 ? "space-between" : 'center',
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Open-Sans-Bold",
              color: "white",
              fontSize: 16,
            }}
          >
            Zadania wykonane: {habbitsDone.length}
          </Text>
          {habbits.length > 0 ? (
            <CircularProgress
              radius={30}
              activeStrokeWidth={5}
              inActiveStrokeWidth={3}
              value={progressBarDone}
              valueSuffix={"%"}
              strokeColorConfig={[
                { color: "red", value: 0 },
                { color: mainGreen, value: 100 },
              ]}
              progressValueColor={mainGreen}
            />
          ) : null}
        </View>
      </LinearGradient>
      {activeIndicator ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            animating={activeIndicator}
            color={mainButton}
            size="large"
          />
        </View>
      ) : habbits.length > 0 ? (
        <>
          <FlatList
            style={{ width: "100%", paddingTop: 3 }}
            contentContainerStyle={{
              justifyContent: "flex-start",
            }}
            data={habbits}
            keyExtractor={(item) => item.taskId}
            renderItem={({ item }) => (
              <LinearGradient
                start={[1.4, 0]}
                end={[0, 1]}
                colors={["#3B2B5F", "#2D609A"]}
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  backgroundColor: item.isDone ? "green" : "#F17B7B",
                  marginHorizontal: 10,
                  marginBottom: 5,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    flexDirection: "column",
                    width: "75%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: item.isDone ? "lightgray" : "white",
                      fontFamily: "Open-Sans-Bold",
                      fontSize: 14,
                      marginBottom: item.time ? 7 : 0,
                      textDecorationLine: item.isDone ? "line-through" : "none",
                      textDecorationStyle: item.isDone ? "solid" : null,
                      textDecorationThickness: 10,
                    }}
                  >
                    {item.task}
                  </Text>
                  {item.time ? (
                    <Text
                      style={{
                        color: item.isDone ? "lightgray" : "white",
                        fontFamily: "Open-Sans-Bold",
                        fontSize: 13,
                        textDecorationLine: item.isDone
                          ? "line-through"
                          : "none",
                        textDecorationStyle: item.isDone ? "solid" : null,
                      }}
                    >
                      Godzina: {item.time}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "25%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => console.log("dadss")}
                    style={{
                      width: "50%",
                      height: 35,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.isDone ? (
                      <AntDesign name="close" size={30} color="red" />
                    ) : (
                      <MaterialIcons name="done" size={30} color={mainGreen} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log("dadss")}
                    style={{
                      width: "50%",
                      height: 30,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={30}
                      color={mainButton}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Open-Sans-Bold",
              fontSize: 20,
            }}
          >
            Dodaj swoje pierwsze zadanie
          </Text>
        </View>
      )}
      <View
        style={{
          paddingTop: 10,
          borderTopColor: mainGreen,
          borderTopWidth: 2,
          width: "100%",
          alignItems: "center",
        }}
      >
        <FAB
          icon="plus"
          style={{ marginBottom: 10, backgroundColor: mainButton }}
          customSize={60}
          onPress={() => setModalVisible(true)}
        />
      </View>
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
              textAlign: "center",
            }}
          >
            Godzina wykonania zadania (opcjonalnie)
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
              setActiveIndicator(true);
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
