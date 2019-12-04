import Vue from 'vue'
import  {Loading ,Progress, Message, MessageBox, Pagination, Select } from 'element-ui' 
 
Vue.use(Loading);
Vue.use(Progress);
Vue.use(Pagination);
Vue.use(Select);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message)

Vue.prototype.$Loading = Loading;


Vue.prototype.$message = Message;

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;