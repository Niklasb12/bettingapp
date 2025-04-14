import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#212121",
  },
  inputContainer: {
    width: "80%",
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#6200EA",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default styles;
