import { set, toggle } from '@/utils/vuex'

export default {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  setToolbarVisible: set('toolbarVisible'),
  setToolbarBackButton:set('toolbarBackButton'),
  setDrawerVisible: set('drawerVisible'),
}
