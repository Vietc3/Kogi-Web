import Vue from 'vue'
import Vuetify from 'vuetify'

import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const opts ={
  icons:{iconfont:'md'||'fa'},
  theme:{
      themes:{
          light:{background:colors.teal.lighten-3},
          dark:{background:colors.blue}
      }
  }
}

export default new Vuetify(opts)