const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const fs = require('fs');

const pug = new Pug({
  viewPath: './views',
  pretty: true,
  basedir: './views',
  noCache: true,
  app: app
});
const config = require('./config');

app.use(koaStatic('./public'));

const errorHandler = require('./libs/error');
app.use(errorHandler);

app.on('error', (err, ctx) => {
  ctx.body = `Произошла ошибка ${ctx.response.status}: ${ctx.response.message}.`;
});

const router = require('./routes');

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
  console.log('Server start on port: ', PORT);
});
