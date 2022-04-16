import { useState } from "react";
import {
  Title,
  Text,
  MantineProvider,
  TextInput,
  Button,
  PasswordInput,
  useMantineTheme,
  Grid,
  ButtonStylesParams,
  TextStylesParams,
  InputStylesParams,
  TitleStylesParams,
  MultiSelect,
} from "@mantine/core";

import { Mail, Lock } from "tabler-icons-react";

import { useForm } from "@mantine/form";
import "./global.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

function Root() {
  const [hasAccout, setHasAccout] = useState(true); // if the user has existing(true) , show the sign in forms
  const [signInPopup, setSignInPopup] = useState(false);

  const register = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      // what ever the error is just pass it as a UI element
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      // what ever the error is just pass it as a UI element
    }
  };

  // TODO: figure out when to use this.
  const currentTeams = [
    { value: "AI", label: "Artificial Intelligence" },
    { value: "DIG", label: "Dream in Green" },
    { value: "GameDev", label: "Game Development" },
    { value: "ICAVE", label: "ICAVE" },
    { value: "IT", label: "Information Technology" },
    { value: "Robotics", label: "Robotics" },
    { value: "VR", label: "Virtual Reality" },
    { value: "WebDev", label: "Web Development" },
  ];

  // * We should make an API request from a server in order to do this

  const theme = useMantineTheme();

  const signInForm = useForm({
    initialValues: {
      email: "",
      password: "",
      // Add security with password field. Maybe add a hash function.
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const registerForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match." : null,
    },
  });

  const signInPageTitles = (
    <div>
      <div>
        <Title>UPE SparkDev</Title>
      </div>
      <Text>
        Welcome Team Leader! This is the SparkDev Team Lead console and this
        will serve mainly three main tasks. This is where you will take
        attendance, complete bi-weekly progress reports, and add new members
        (with approval of course).
      </Text>
    </div>
  );

  return (
    <MantineProvider
      styles={{
        Title: (theme: any, params: TitleStylesParams) => ({
          root: {
            color: "white",
          },
        }),
        Text: (theme: any, params: TextStylesParams) => ({
          // text style parameters
          root: {
            color: "white",
          },
        }),
        Button: (theme: any, params: ButtonStylesParams) => ({
          root: {
            width: "100%",
          },
        }),
        TextInput: (theme: any, params: InputStylesParams) => ({
          root: {},
        }),
      }}
      theme={{
        /**
         * * BootStrap Breakpoints
          xs	<576px
          sm	≥576px
          md	≥768px
          lg	≥992px
          xl	≥1200px
         */
        fontSizes: {
          xs: 20,
          sm: 20,
          md: 20,
          lg: 30,
          xl: 30,
        },
        headings: {
          sizes: {
            h1: {
              fontSize: 48,
            },
          },
        },
      }}
    >
      <body>
        <div className="App">
          <Grid grow>
            <Grid.Col xs={1}>{signInPageTitles}</Grid.Col>
            <Grid.Col xs={1}>
              {hasAccout && (
                <div>
                  <Title order={2}>Team Lead Console</Title>
                  <Text>Please Log in using the credentials</Text>
                  <div style={{}}>
                    <form
                      onSubmit={signInForm.onSubmit((values) => {
                        console.log(values.email);
                        // implement on click handlers.
                      })}
                    >
                      <TextInput
                        required
                        placeholder={"jdoe123@fiu.edu"}
                        {...signInForm.getInputProps("email")}
                        mt="md"
                        icon={<Mail />}
                      />

                      <PasswordInput
                        required
                        {...signInForm.getInputProps("password")}
                        mt="md"
                        placeholder="Password"
                        icon={<Lock />}
                      />

                      <Button type="submit" color="orange" mt="md">
                        Log In
                      </Button>
                    </form>

                    <Button
                      onClick={() => {
                        setHasAccout(!hasAccout);
                      }}
                      variant="outline"
                      color="orange"
                      mt="md"
                    >
                      Register Team Lead
                    </Button>
                  </div>
                </div>
              )}
              {!hasAccout && (
                <div
                // TODO: Put signup elements here
                >
                  <Title order={2}>Register</Title>
                  <Text>Please register using your credentials!</Text>
                  <form
                    onSubmit={registerForm.onSubmit((values) => {
                      console.log(values);
                      register(values.email, values.password);
                      values.email =
                        values.password =
                        values.confirmPassword =
                          "";
                      setHasAccout(!hasAccout);
                    })}
                  >
                    <TextInput
                      required
                      placeholder="jdoe123@fiu.edu"
                      {...registerForm.getInputProps("email")}
                      mt="md"
                    />
                    <PasswordInput
                      required
                      placeholder="Password"
                      {...registerForm.getInputProps("password")}
                      mt="md"
                    />
                    <PasswordInput
                      required
                      placeholder="Confirm Password"
                      {...registerForm.getInputProps("confirmPassword")}
                      mt="md"
                    />
                    <Button color="orange" type="submit" mt="md">
                      Register
                    </Button>
                  </form>
                  <Button
                    variant="outline"
                    color="orange"
                    onClick={() => {
                      setHasAccout(!hasAccout);
                    }}
                    mt="md"
                  >
                    Log In
                  </Button>
                </div>
              )}
            </Grid.Col>
          </Grid>
        </div>
      </body>
    </MantineProvider>
  );
}
export default Root;
