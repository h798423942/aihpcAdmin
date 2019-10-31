import Vue from "vue"
import { getStore } from "@/utils/storage"

const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name ? state.user.name : Vue.ls.get('USER_NAME'),
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  isAdmin: state => state.user.isAdmin,
  addRouters: state => state.permission.addRouters,
  // addRouters: state => state.asyncRoutes.addRouters,
  multiTab: state => state.app.multiTab
}

export default getters
