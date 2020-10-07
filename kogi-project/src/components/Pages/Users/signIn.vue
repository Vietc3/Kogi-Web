<template>
  <main style="height: 100%">
    <v-container style="height: 100%">
      <v-row style="height: 100%">
        <v-col v-if="step === 0">
          <div class="text-center title teal--text">Sign Up With Email 🥳</div>

          <v-alert dense text type="success" v-if="alertSuccess === true">
            Sign Up Successfully
          </v-alert>
          <v-alert dense text type="error" v-if="alertFail === true">
            {{ message }}
          </v-alert>

          <div class="mt-5">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-card elevation="10">
                  <v-card-text>
                    <v-container>
                      <form @submit.prevent="signUpWithEmail">
                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="email"
                              label="Mail"
                              id="email"
                              v-model="email"
                              type="email"
                              required
                              color="teal"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="password"
                              label="Password"
                              id="password"
                              v-model="password"
                              type="password"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="confirmPassword"
                              label="Confirm Password"
                              id="confirmPassword"
                              v-model="confirmPassword"
                              type="password"
                              :rules="[comparePasswords]"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row>
                          <v-flex xs12>
                            <v-btn
                              class="mt-3"
                              type="submit"
                              color="teal"
                              width="100%"
                              dark
                            >
                              Sign Up
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </form>
                      <v-layout row>
                        <v-flex xs12>
                          <v-btn
                            class="mt-3"
                            color="teal"
                            width="100%"
                            @click.stop="toggleStatus()"
                            dark
                          >
                            if you have account, please login!
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <div id="firebaseui-auth-container" />
        </v-col>

        <v-col v-else>
          <div class="text-center title teal--text">Login with email 🥳</div>
          <v-alert dense text type="success" v-if="alertSuccess === true">
            Login successfully
          </v-alert>
          <v-alert dense text type="error" v-if="alertFail === true">
            {{ message }}
          </v-alert>
          <div class="mt-5">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-card elevation="10">
                  <v-card-text>
                    <v-container>
                      <form @submit.prevent="loginWithEmail">
                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="email"
                              label="email"
                              id="email"
                              v-model="email"
                              type="email"
                              required
                              color="teal"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row>
                          <v-flex xs12>
                            <v-text-field
                              name="password"
                              label="Password"
                              id="password"
                              v-model="password"
                              type="password"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row>
                          <v-flex xs12>
                            <v-btn
                              class="mt-3"
                              color="teal"
                              width="100%"
                              dark
                              type="submit"
                            >
                              Sign In
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </form>
                      <v-layout row>
                        <v-flex xs12>
                          <v-btn
                            class="mt-3"
                            @click.once="toggleStatus()"
                            color="teal"
                            width="100%"
                            dark
                          >
                            if you dont have account, please sign Up!
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <div id="firebaseui-auth-container" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import * as firebaseui from "firebaseui";

import "firebaseui/dist/firebaseui.css";
import RepositoryFactory from "@/utils/RepositoryFactory";
const UserRepository = RepositoryFactory.get("users");

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      step: 1,
      alertSuccess: false,
      alertFail: false,
      message: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
  },
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          await this.$router.push({ name: "Home" });
          // return true;
        },
      },
      // credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,

          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: "select_account",
          },
        },
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,

        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: "https://policies.google.com/terms?hl=en-US",
      // Privacy policy url/callback.
      privacyPolicyUrl: "https://policies.google.com/privacy?hl=en-US",
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  },

  methods: {
    async signUpWithEmail() {
      let result = await this.$store.dispatch("signUpWithEmail", {
        email: this.email,
        password: this.password,
      });

      if (result.success === false) {
        this.alertFail = true;
        this.message = result.message;
      } else {
        this.step = 1;
        this.email = "";
        this.password = "";
      }
    },

    async loginWithEmail() {
      let result = await this.$store.dispatch("loginWithEmail", {
        email: this.email,
        password: this.password,
      });
      console.log(result);
      if (result.success === false) {
        this.alertFail = true;
        this.message = result.message;
      } else {
        this.alertSuccess = true;
        setTimeout(() => this.$router.push({ name: "Home" }), 2000);
      }
    },

    toggleStatus() {
      this.step === 1 ? (this.step = 0) : (this.step = 1);
    },
  },
};
</script>

<style  scoped>
#firebaseui-auth-container {
}
</style>
