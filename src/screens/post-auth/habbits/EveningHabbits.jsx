import { FlatList, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import BackgroundGradient from "../../../hoc/BackgroundGradient";
import { Controller, useForm } from "react-hook-form";
import {
  TextInput,
  Button,
  Modal,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import {
  mainBlue,
  mainButton,
  mainGreen,
  mainPurple,
} from "../../../styles/AppStyles";
import { db, auth } from "../../../firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CircularProgress from "react-native-circular-progress-indicator";
import { numberPattern } from "../../../../utils/validation.utils";
import { Octicons } from "@expo/vector-icons";

const EveningHabbits = () => {
  const [habbits, setHabbits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(true);
  const [numberError, setNumberError] = useState("");

  const hideModal = () => setModalVisible(false);

  const { control, handleSubmit, reset, watch } = useForm();

  const task = watch("task");
  const hour = watch("hour");
  const minute = watch("minute");

  const nextButton1Ref = useRef();
  const nextButton2Ref = useRef();

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
    const docRef = await addDoc(collection(db, "eveningTasks"), {
      task: task,
      time: `${hour.length === 1 ? 0 + hour : hour}:${
        minute.length === 1 ? 0 + minute : minute
      }`,
      isDone: false,
      userId: auth.currentUser.uid,
      sortDate: new Date(),
      date: new Date().toLocaleString(["pl"], {day:'2-digit', month:'2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(/AM|PM/, ""),
      activityDate: null,
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
      collection(db, "eveningTasks"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let habbits = [];
    querySnapshot.forEach((doc) => {
      let habbit = doc.data();
      habbit.id = doc.id;
      habbits.push(habbit);
    });
    setHabbits(habbits);
    setActiveIndicator(false);
  };

  useEffect(() => {
    getHabbits();
  }, []);

  const confirmAddHabbit = () => {
    addHabbit();
    setActiveIndicator(true);
    getHabbits();
    reset("", {
      keepValues: false,
      keepDefaultValues: false,
    });
    setModalVisible(false);
    setNumberError("");
  };

  return (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <LinearGradient
        colors={[mainBlue, mainPurple]}
        style={{
          width: "100%",
          height: "25%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30,
          borderBottomColor: mainGreen,
          borderBottomWidth: 2,
        }}
        locations={[0.5, 0.99]}
      >
        {activeIndicator ? (
          <ActivityIndicator
            animating={activeIndicator}
            color={mainButton}
            size="large"
          />
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: habbits.length > 0 ? "space-between" : "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Open-Sans-Bold",
                  color: "white",
                  fontSize: 13,
                  marginBottom: 3,
                }}
              >
                {habbits.length > 0
                  ? `Zadania do wykonania: ${habbitsToDo.length}`
                  : "Brak zadań do wykonania"}
              </Text>
              {habbits.length > 0 ? (
                <CircularProgress
                  radius={25}
                  activeStrokeWidth={5}
                  inActiveStrokeWidth={3}
                  value={restProgress}
                  valueSuffix={"%"}
                  strokeColorConfig={[
                    { color: mainGreen, value: 0 },
                    { color: "red", value: 100 },
                  ]}
                  progressValueColor={"white"}
                />
              ) : null}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: habbits.length > 0 ? "space-between" : "center",
                width: "100%",
              }}
            >
              {habbits.length > 0 ? (
                <Text
                  style={{
                    fontFamily: "Open-Sans-Bold",
                    color: "white",
                    fontSize: 13,
                  }}
                >
                  Zadania wykonane: {habbitsDone.length}
                </Text>
              ) : null}
              {habbits.length > 0 ? (
                <CircularProgress
                  radius={25}
                  activeStrokeWidth={5}
                  inActiveStrokeWidth={3}
                  value={progressBarDone}
                  valueSuffixStyle={{ color: "white" }}
                  valueSuffix={"%"}
                  strokeColorConfig={[
                    { color: "red", value: 0 },
                    { color: mainGreen, value: 100 },
                  ]}
                  progressValueColor={"white"}
                />
              ) : null}
            </View>
          </>
        )}
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
            data={habbits.sort((a, b) => a.sortDate - b.sortDate)}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <LinearGradient
                start={[1.4, 0]}
                end={[0, 1]}
                colors={["#3B2B5F", "#2D609A"]}
                style={{
                  paddingVertical: 10,
                  flexDirection: "row",
                  marginHorizontal: 10,
                  marginTop: index === 0 ? 10: 0,
                  marginBottom: index === habbits.length - 1 ? 20 : 5,
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
                      marginBottom: 10,
                      textDecorationLine: item.isDone ? "line-through" : "none",
                      textDecorationStyle: item.isDone ? "solid" : null,
                    }}
                  >
                    {item.task}
                  </Text>
                  <Text
                    style={{
                      color: item.isDone ? "lightgray" : "white",
                      fontFamily: "Open-Sans-Bold",
                      fontSize: 12,
                      textDecorationLine: item.isDone ? "line-through" : "none",
                      textDecorationStyle: item.isDone ? "solid" : null,
                    }}
                  >
                    Godzina: {item.time}
                  </Text>
                  <Text
                    style={{
                      color: item.isDone ? "lightgray" : "white",
                      fontFamily: "Open-Sans-Bold",
                      fontSize: 11,
                      textDecorationLine: item.isDone ? "line-through" : "none",
                      textDecorationStyle: item.isDone ? "solid" : null,
                      marginTop: 2,
                    }}
                  >
                    {item.activityDate
                      ? `Ostatnia aktywność: ${item.activityDate}`
                      : `Data utworzenia: ${item.date}`}
                  </Text>
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
                  {item.isDone ? (
                    <TouchableOpacity
                      onPress={async () => {
                        const task = doc(db, "eveningTasks", item.id);
                        await updateDoc(task, {
                          isDone: false,
                          activityDate: new Date()
                          .toLocaleString(["pl"], {day:'2-digit', month:'2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(/AM|PM/, ""),
                        });
                        setActiveIndicator(true);
                        getHabbits();
                      }}
                      style={{
                        width: "50%",
                        height: 35,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name="close" size={30} color="red" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={async () => {
                        const task = doc(db, "eveningTasks", item.id);
                        await updateDoc(task, {
                          isDone: true,
                          activityDate: new Date()
                          .toLocaleString(["pl"], {day:'2-digit', month:'2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(/AM|PM/, ""),
                        });
                        setActiveIndicator(true);
                        getHabbits();
                      }}
                      style={{
                        width: "50%",
                        height: 35,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons name="done" size={30} color={mainGreen} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={async () => {
                      await deleteDoc(doc(db, "eveningTasks", item.id));
                      setActiveIndicator(true);
                      getHabbits();
                    }}
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
            Dodaj zadanie
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          borderTopColor: mainGreen,
          borderTopWidth: 2,
          width: "100%",
          justifyContent: "space-evenly",
          height: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: mainBlue,
          }}
        >
          <Octicons name="diff-added" size={34} color={mainGreen} />
        </TouchableOpacity>
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
                  }}
                  outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                  mode="outlined"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    nextButton1Ref.current.focus();
                  }}
                  blurOnSubmit={false}
                  left={
                    <TextInput.Icon
                      icon={"calendar-check"}
                      iconColor={mainButton}
                    />
                  }
                  placeholder="Zadanie"
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
                    {error.message || "Wystąpił błąd, spróbuj ponownie"}
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
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Godzina wykonania zadania (w przybliżeniu)
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Controller
              control={control}
              name="hour"
              rules={{
                maxLength: {
                  value: 2,
                  message: "Pola mogą zawierać maximum 2 znaki",
                },
                required: "Pola wymagane",
                pattern: {
                  value: numberPattern,
                  message: "Pola mogą zawierać tylko cyfry",
                },
              }}
              render={({
                field: { value = "", onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  style={{
                    backgroundColor: mainBlue,
                    width: "30%",
                    fontSize: 16,
                  }}
                  outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                  mode="outlined"
                  ref={nextButton1Ref}
                  returnKeyType="next"
                  keyboardType="number-pad"
                  onSubmitEditing={() => {
                    nextButton2Ref.current.focus();
                  }}
                  blurOnSubmit={false}
                  placeholder="Godz"
                  placeholderTextColor={"white"}
                  textColor={"white"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error ? setNumberError(error.message) : null}
                />
              )}
            />
            <Text style={{ fontSize: 40, color: "white" }}> : </Text>
            <Controller
              control={control}
              name="minute"
              rules={{
                maxLength: {
                  value: 2,
                  message: "Pola mogą zawierać maximum 2 znaki",
                },

                required: "Pola wymagane",
                pattern: {
                  value: numberPattern,
                  message: "Pola mogą zawierać tylko cyfry",
                },
              }}
              render={({
                field: { value = "", onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  style={{
                    backgroundColor: mainBlue,
                    width: "30%",
                    fontSize: 16,
                  }}
                  outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                  ref={nextButton2Ref}
                  keyboardType="number-pad"
                  blurOnSubmit={false}
                  mode="outlined"
                  placeholder="Min"
                  placeholderTextColor={"white"}
                  textColor={"white"}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error ? setNumberError(error.message) : null}
                />
              )}
            />
          </View>
          {numberError ? (
            <Text style={{ color: "red", marginVertical: 5 }}>
              {numberError}
            </Text>
          ) : null}
          <Button
            onPress={handleSubmit(confirmAddHabbit)}
            labelStyle={{
              fontFamily: "Open-Sans-Bold",
              fontSize: 14,
              flex: 1,
            }}
            style={{ width: "100%", marginTop: 60 }}
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

export default EveningHabbits;
