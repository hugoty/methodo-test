import sessionPortModule from '../components/sessionPort/sessionPort.module.js';
import userModule from '../components/user/user.module.js';
import pauseModule from "../components/pause/pause.module.js"
//import todoModule from '../components/todo/todo.module.js';

export default (app) => {
  app.use('/users', userModule.router);
app.use('/sessions', sessionPortModule.router),
app.use('/pauses', pauseModule.router)}
;
