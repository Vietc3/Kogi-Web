<template>
  <main style="height: 100%">
    <v-container style="height: 100%">
      <v-row style="height: 100%">
        <v-col>
          <div class="text-center title teal--text">Login 🥳</div>
          <div class="mt-5">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-card elevation="10">
                  <v-card-text>
                    <v-container>
                      <form @submit.prevent="onSignup">
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
                            <span class="caption grey--text text--darken-1">
                              * Unregistered user will automatically register
                              and log in after authentication
                            </span>
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
                              Log In
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </form>
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

export default {
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: async (authResult, redirectUrl)=> {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.


        await  this.$router.push({name: 'Home'});

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
};
</script>

<style  scoped>
#firebaseui-auth-container {
}
</style>
