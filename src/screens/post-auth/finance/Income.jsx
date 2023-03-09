import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import BackgroundGradient from "../../../hoc/BackgroundGradient";
import { LinearGradient } from "expo-linear-gradient";
import {
  mainBlue,
  mainGreen,
  mainPurple,
  mainButton,
} from "../../../styles/AppStyles";
import { Octicons } from "@expo/vector-icons";
import {
  Portal,
  Modal,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { cashPattern } from "../../../../utils/validation.utils";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Income = () => {
  const { control, handleSubmit, reset, watch } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(true);
  const [incomes, setIncomes] = useState([]);
  const [summary, setSummary] = useState();
  const [latestDate, setLatestDate] = useState();

  const hideModal = () => setModalVisible(false);
  const nextButton1Ref = useRef();

  let incomeFiltered = watch("income")
    ? watch("income").replace(",", ".")
    : null;
  let incomeName = watch("name");


  const addIncome = async () => {
    const docRef = await addDoc(collection(db, "income"), {
      incomeName: incomeName,
      incomeValue: incomeFiltered,
      userId: auth.currentUser.uid,
      date: new Date().toLocaleString(["pl"], {day:'2-digit', month:'2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(/AM|PM/, ""),
      sortDate: new Date(),
    });
  };

  const getIncomes = async () => {
    const q = query(
      collection(db, "income"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let incomes = [];
    let incomesTable = [];
    querySnapshot.forEach((doc) => {
      let income = doc.data();
      income.id = doc.id;
      incomes.push(income);
    });
    incomes.forEach((singleincome) => {
      let income = singleincome.incomeValue;
      incomesTable.push(Number(income));
    });
    let sum = 0;
    for (var i = 0; i < incomesTable.length; i++) {
      sum = sum + incomesTable[i];
      setSummary(sum);
    }
    setIncomes(incomes);
    setActiveIndicator(false);
  };

  useEffect(() => {
    getIncomes()
  }, []);

  useEffect(() => {
    getLatestDate()
  }, [incomes]);

  const confirmAddIncome = () => {
    addIncome();
    setActiveIndicator(true);
    getIncomes();
    reset("", {
      keepValues: false,
      keepDefaultValues: false,
    });
    setModalVisible(false);
  };

  let datedate = ""

  const getLatestDate = () => {
    if (incomes > 0) {
    let length = incomes.length - 1
    let latestDate = incomes[length].date
    let datedate = latestDate
    }
}

  return (
    <BackgroundGradient marginHorizontal={0} justifyContent={"center"} flex={1}>
      <LinearGradient
        colors={[mainBlue, mainPurple]}
        style={{
          width: "100%",
          height: "20%",
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
            <Text
              style={{
                fontFamily: "Open-Sans-Bold",
                color: "white",
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              {incomes.length > 0
                ? `Data ostatniego przychodu: `
                : "Brak przychodów"}
            </Text>
            {incomes.length > 0 ? (
              <>
                <Text
                  style={{
                    fontFamily: "Open-Sans-Bold",
                    color: "white",
                    fontSize: 15,
                    marginBottom: 10,
                  }}
                >
                  {incomes[incomes.length - 1].date}
                </Text>
                <Text
                  style={{
                    fontFamily: "Open-Sans-Bold",
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Suma przychodów: <Text style={{color: mainGreen, fontSize: 18}}>{summary} zł</Text>
                </Text>
              </>
            ) : null}
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
      ) : (
        <>
          {incomes.length > 0 ? (
            <FlatList
              style={{ width: "100%", paddingTop: 3 }}
              contentContainerStyle={{
                justifyContent: "flex-start",
              }}
              data={incomes.sort((a, b) => a.sortDate - b.sortDate)}
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
                    marginTop: index === 0 ? 10 : 0,
                    marginBottom: index === incomes.length - 1 ? 20 : 5,
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
                        color: "white",
                        fontFamily: "Open-Sans-Bold",
                        fontSize: 14,
                        marginBottom: 10,
                      }}
                    >
                      {item.incomeName}
                    </Text>
                    <Text
                      style={{
                        color: "lightgreen",
                        fontFamily: "Open-Sans-Bold",
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      +{item.incomeValue} zł
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Open-Sans-Bold",
                        fontSize: 11,
                        marginTop: 2,
                      }}
                    >
                      Data przychodu: {item.date}
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
                    <TouchableOpacity
                      onPress={async () => {
                        await deleteDoc(doc(db, "income", item.id));
                        setActiveIndicator(true);
                        getIncomes();
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
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Open-Sans-Bold",
                  fontSize: 20,
                }}
              >
                Dodaj przychód
              </Text>
            </View>
          )}
        </>
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
            Tytuł przychodu
          </Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Pole wymagane",
              minLength: {
                value: 2,
                message: "Pole musi zawierać minimum 2 znaki",
              },
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
                      icon={"format-title"}
                      iconColor={mainButton}
                    />
                  }
                  placeholder="Tytuł"
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
            }}
          >
            Kwota przychodu
          </Text>
          <Controller
            control={control}
            name="income"
            rules={{
              required: "Pole wymagane",
              minLength: {
                value: 1,
                message: "Pole musi zawierać minimum 1 znak",
              },
              pattern: {
                value: cashPattern,
                message:
                  "Pole może zawierać tylko cyfry (w tym dwie po przecinku).",
              },
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
                  ref={nextButton1Ref}
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    nextButton1Ref.current.focus();
                  }}
                  blurOnSubmit={false}
                  left={
                    <TextInput.Icon icon={"cash-plus"} iconColor={mainButton} />
                  }
                  placeholder="Kwota"
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
          <Button
            onPress={handleSubmit(confirmAddIncome)}
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

export default Income;
