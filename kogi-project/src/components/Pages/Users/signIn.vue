<template>
  <main style="height: 100%">
    <v-container
      style="height: 100%"
      v-if="id"
    >
      <v-row style="height: 100%">
        <v-col>
          <div class="text-center title #14b9c8--text">you are logged in 🥳</div>
        </v-col>
      </v-row>
    </v-container>

    <v-container style="height: 100%" v-else>
      
      <v-row style="height: 100%">
        <v-col v-if="signUp === true">
          <div class="text-center title #14b9c8--text"> {{$t('SignUpEmail')}} 🥳</div>

          <notifications
            group="foo-velocity"
            position="top center"
            :speed="500"
          />
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
                              color="#14b9c8"
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
                              color="#14b9c8"
                              width="100%"
                              dark
                            >
                              {{$t('signUp')}}
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </form>
                      <v-layout row>
                        <v-flex xs12>
                          <v-btn
                            class="mt-3"
                            color="#14b9c8"
                            width="100%"
                            @click.stop="toggleStatus()"
                            dark
                          >
                             {{$t('pleaseLogin')}}
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
         
          <div class="text-center title #14b9c8--text"> {{$t('loginEmail')}} 🥳</div>
           <notifications
            group="foo-velocity"
            position="top center"
            :speed="500"
          />
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
                              label="Email"
                              id="email"
                              v-model="email"
                              type="email"
                              required
                              color="#14b9c8"
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
                              color="#14b9c8"
                              width="100%"
                              dark
                              type="submit"
                            >
                             {{$t('signIn')}}
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </form>
                      <v-layout row>
                        <v-flex xs12>
                          <v-btn
                            class="mt-3"
                            @click.stop="toggleStatus()"
                            color="#14b9c8"
                            width="100%"
                            dark
                          >
                           {{$t('pleaseSignUp')}}
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
import { mapGetters } from "vuex";
import "firebaseui/dist/firebaseui.css";
import RepositoryFactory from "@/utils/RepositoryFactory";
const UserRepository = RepositoryFactory.get("users");

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
     signUp : false,
      message: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    ...mapGetters(["displayName", "photoUrl", "phoneNumber",'id']),
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
    show(group, type = "", message) {
      const text = `
     ${type}: ${message}
     
        Date: ${new Date()}
      `;
      this.$notify({
        group,
        title: `${type} notification`,
        text,
        type,
        data: {
          randomNumber: Math.random(),
        },
      });
    },
    async signUpWithEmail() {

      let result = await this.$store.dispatch("signUpWithEmail", {
        email: this.email,
        password: this.password,
      });

await this.$store.dispatch("logOut");

      if (result.success === false) {
        this.message = result.message;
        this.show("foo-velocity", "error", this.message);
      } else {
        this.show("foo-velocity", "success", this.message);
        this.signUp = false;
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
        this.show("foo-velocity", "error", this.message);
      } else {
        this.show("foo-velocity", "success", this.message);
        this.$router.push({ name: "Home" });
      }
    },
    toggleStatus() {
      this.signUp = !this.signUp;
    },
  },
};
</script>

<style  scoped>

</style>
