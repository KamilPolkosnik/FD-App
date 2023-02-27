import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import BackgroundGradient from "../../hoc/BackgroundGradient";
import { signOut } from "firebase/auth";
import StyledButton from "../../components/StyledButton";
import { auth } from "../../firebase/FirebaseConfig";
import { Snackbar, Button, Provider, Modal, Portal } from "react-native-paper";
import { updatePassword, updateProfile } from "firebase/auth";
import { mainBlue, mainPurple } from "../../styles/AppStyles";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { mainButton } from "../../styles/AppStyles";
import { passwordPattern } from "../../../utils/validation.utils";
import { LinearGradient } from "expo-linear-gradient";

const Settings = ({ navigation }) => {
  const { control, handleSubmit, watch, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState(
    `Link do zmiany hasła został wysłany na adres email: ${auth.currentUser.email}`
  );
  const [color, setColor] = useState("black");
  const [modalVisible, setModalVisible] = useState(false);
  const [changeModalVisible, setChangeModalVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const onDismissSnackBar = () => setVisible(false);
  const hideModal = () => {
    setModalVisible(false);
    setChangeModalVisible(false);
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigation.navigate("Home");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const password = watch("password");
  const name = watch("displayName");

  const onRecoverPasswordClick = () => {
    setModalVisible(false);
    setChangeModalVisible(false);
    setLoading(true);
    updatePassword(auth.currentUser, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        reset("", {
          keepValues: false,
          keepDefaultValues: false,
        });
        setLoading(false);
        navigation.navigate("Redirect", {
          redirectText:
            "Dane konta są aktualizowane, za chwilę wrócisz do ustawień profilu.",
        });
      })
      .then(() => {
        setVisible(true);
        setSnackBarInfo(`Dane konta zostały zmienione`);
        setColor("green");
      })
      .catch(() => {
        setLoading(false);
        setVisible(true);
        setSnackBarInfo("Coś poszło nie tak, spróbuj ponownie");
        setColor("red");
      });
  };

  const changeAccountData = () => {
    setModalVisible(true);
    setChangeModalVisible(true);
  };

  return (
    <Provider>
      <BackgroundGradient
        marginHorizontal={0}
        justifyContent={"flex-start"}
        flex={0}
      >
        <LinearGradient
          colors={[mainBlue, mainPurple]}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 70,
            paddingBottom: 50,
            paddingHorizontal: 30,
          }}
          locations={[0, 1]}
        >
          <Image
            source={require("../../../assets/userLogo2.png")}
            style={{
              width: 50,
              height: 50,
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: "white", fontFamily: "Open-Sans-Bold" }}>
              {auth.currentUser.email}
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "Open-Sans-Bold",
                marginTop: 2,
              }}
            >
              {auth.currentUser.displayName}
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View style={{ paddingHorizontal: 40, marginTop: 10 }}>
            <Text
              style={{
                color: "white",
                fontFamily: "Open-Sans-Bold",
                textAlign: "center",
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              Aby zmienić dane, wprowadź nowe dane do pól tekstowych i wciśnij
              przycisk "Zaktualizuj dane".
            </Text>
            <Controller
              control={control}
              name="displayName"
              rules={{
                minLength: {
                  value: 5,
                  message: "Pole musi zawierać minimum 5 znaków",
                },
                maxLength: {
                  value: 35,
                  message: "Pole może zawierać maximum 35 znaków",
                }
              }}
              render={({
                field: {
                  value = auth.currentUser.displayName,
                  onChange,
                  onBlur,
                },
                fieldState: { error },
              }) => (
                <>
                  <TextInput
                    style={{
                      backgroundColor: "rgba(81, 91, 140, 0.9)",
                      width: "100%",
                      fontSize: 16,
                    }}
                    outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      nextButton1Ref.current.focus();
                    }}
                    blurOnSubmit={false}
                    mode="outlined"
                    autoCapitalize={true}
                    left={
                      <TextInput.Icon icon={"account"} iconColor={mainButton} />
                    }
                    placeholder="Imię i nazwisko"
                    placeholderTextColor={"white"}
                    textColor={"white"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {error && (
                    <Text
                      style={{
                        color: "red",
                        alignSelf: "stretch",
                        marginTop: 3,
                      }}
                    >
                      {error.message || "Błąd, spróbuj ponownie"}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                pattern: {
                  value: passwordPattern,
                  message:
                    "Hasło powinno zawierać minimum: 1 wielką literę, 1 małą literę, 1 cyfrę, 1 znak specjalny oraz nie może być krótsze niż 8 znaków",
                },
              }}
              render={({
                field: { value = "", onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <TextInput
                    style={{
                      backgroundColor: "rgba(81, 91, 140, 0.9)",
                      width: "100%",
                      fontSize: 16,
                    }}
                    outlineStyle={{ borderRadius: 15, borderWidth: 0 }}
                    mode="outlined"
                    autoCapitalize={false}
                    secureTextEntry={secureTextEntry}
                    left={
                      <TextInput.Icon icon={"lock"} iconColor={mainButton} />
                    }
                    right={
                      <TextInput.Icon
                        icon={"eye"}
                        iconColor={mainButton}
                        onPress={() => {
                          setSecureTextEntry(!secureTextEntry);
                        }}
                      />
                    }
                    placeholder="Zmień Hasło"
                    placeholderTextColor={"white"}
                    textColor={"white"}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {error && (
                    <Text
                      style={{
                        color: "red",
                        alignSelf: "stretch",
                        marginTop: 3,
                      }}
                    >
                      {error.message || "Błąd, spróbuj ponownie"}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
          <View
            style={{
              marginBottom: 10,
              marginHorizontal: 40,
              marginTop: 40,
              paddingHorizontal: 30,
            }}
          >
            <StyledButton
              text={"ZAKTUALIZUJ DANE"}
              onPress={handleSubmit(changeAccountData)}
              marginBottom={25}
            />
            <StyledButton
              text={"USUŃ KONTO"}
              onPress={() => setModalVisible(true)}
              marginBottom={25}
            />
            <StyledButton
              text={"WYLOGUJ SIĘ"}
              onPress={logOut}
              marginBottom={20}
            />
          </View>
        </View>
        <Snackbar
          onDismiss={onDismissSnackBar}
          duration={8000}
          style={{ alignSelf: "center", width: "100%", backgroundColor: color }}
          visible={visible}
        >
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {snackBarInfo}
          </Text>
        </Snackbar>
        <ActivityIndicator
        style={{ position: 'absolute', top: '50%' }}
        animating={loading}
        color={mainButton}
        size="large"
      />
      </BackgroundGradient>
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
            backgroundColor: "#36B2EB",
            paddingVertical: 30,
            paddingHorizontal: 25,
            marginHorizontal: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
          }}
        >
          {changeModalVisible ? null : (
            <Text
              style={{
                fontFamily: "Open-Sans-Bold",
                fontSize: 18,
                textAlign: "center",
                color: "red",
              }}
            >
              Proces usuwania jest nieodwracalny.
            </Text>
          )}
          <Text
            style={{
              fontFamily: "Open-Sans-Bold",
              fontSize: 18,
              textAlign: "center",
              color: "white",
              marginTop: 15,
            }}
          >
            {changeModalVisible
              ? "Czy na pewno chcesz zaktualizować dane?"
              : "Czy na pewno chcesz usunąć konto wraz ze wszystkimi danymi?"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={
                changeModalVisible
                  ? () => onRecoverPasswordClick()
                  : () =>
                      auth.currentUser
                        .delete()
                        .then(() => {
                          navigation.navigate("Home");
                        })
                        .catch((e) => {
                          console.log(e);
                        })
              }
              mode="contained"
              labelStyle={{ fontSize: 17 }}
              style={{ backgroundColor: mainBlue, flex: 0.4 }}
            >
              Tak
            </Button>
            <Button
              onPress={() => {
                setModalVisible(false);
                setChangeModalVisible(false);
              }}
              mode="contained"
              labelStyle={{ fontSize: 17 }}
              style={{ backgroundColor: mainBlue, flex: 0.4 }}
            >
              Nie
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default Settings;
