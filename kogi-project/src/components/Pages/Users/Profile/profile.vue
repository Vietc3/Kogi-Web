<template>
  <v-container>
    <notifications group="foo-velocity" position="top center" :speed="500" />
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <div class="text-center title #14b9c8--text">
                {{ $t(`infomation`) }} 🥳
              </div>
              <form @submit.prevent="submitUpdateUser">
                <v-layout row class="mt-3">
                  <v-flex xs12>
                    <v-avatar size="100px">
                      <img v-if="photoUrl" :src="photoUrl" alt="name" />
                      <v-icon v-else large> mdi-account </v-icon>
                    </v-avatar>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="displayName"
                      :label="$t(`displayName`)"
                      id="displayName"
                      v-model="displayName"
                      required
                      :disabled="isDisable"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      disabled
                      name="email"
                      :label="$t(`email`)"
                      id="email"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-select
                      :disabled="isDisable"
                      :items="items"
                      :label="$t(`sex`)"
                      v-model="sex"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :disabled="isDisable"
                          v-model="computedDateFormatted"
                          hint="MM/DD/YYYY format"
                          :label="$t(`dayOfBirth`)"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-spacer></v-spacer>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      disabled
                      name="phoneNumber"
                      :label="$t(`phoneNumber`)"
                      id="phoneNumber"
                      v-model="phoneNumber"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      disabled
                      name="point"
                      :label="$t(`point`)"
                      id="point"
                      v-model="point"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      type="submit"
                      color="#14b9c8"
                      dark
                      :disabled="isDisable"
                    >
                      {{ $t(`confirm`) }}</v-btn
                    >
                    <v-btn
                      color="#14b9c8"
                      dark
                      @click="editProfile"
                      :disabled="isDisable"
                    >
                      {{ $t(`cancel`) }}</v-btn
                    >

                    <v-btn
                      @click="editProfile"
                      color="#14b9c8"
                      dark
                      :disabled="!isDisable"
                    >
                      {{ $t(`editAccount`) }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import RepositoryFactory from "@/utils/RepositoryFactory";
const UsersRepository = RepositoryFactory.get("users");
export default {
  computed: {
    ...mapGetters(["photoUrl", "phoneNumber", "point", "email"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  data(vm) {
    return {
      displayName: this.$store.state.user.displayName,
      isDisable: true,
      date: this.$store.state.user.dayOfBirth
        ? this.$store.state.user.dayOfBirth
        : new Date().toISOString().substr(0, 10),
      menu2: false,
      items: ["Male", "Female"],
      sex: this.$store.state.user.sex,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    };
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  methods: {
    editProfile() {
      this.isDisable = !this.isDisable;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },

    show(group, type = "") {
      const text = `
       Update Information Successfully
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
    clean(group) {
      this.$notify({ group, clean: true });
    },

    async submitUpdateUser() {
      let userInfo = {
        id: this.$store.state.user.id,
        sex: this.sex,
        dateOfBirth: this.computedDateFormatted,
        displayName: this.displayName,
      };
      let { data } = await UsersRepository.updateUser({ userInfo });
      if (data.success === true) {
        this.show("foo-velocity", "success");
        this.isDisable = !this.isDisable;
        await this.$store.dispatch("getInfoUser");
      } else {
        this.show("foo-velocity", "error");
      }
    },
  },
};
</script>

<style>
</style>