export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  isLocal: process.env.IS_LOCAL === 'true',
  timeoutapi: Number(process.env.TIMEOUT_API),
  configs: {
    cronJob: process.env.CRON_SERVICE || '0 */1 * * *',
  },
  jet: {
    endpoint:
      process.env.JET_ENDPOINT ||
      'https://adm-pedido-neo1.plataformaneo.com.br',
    username: btoa(process.env.JET_USERNAME),
    password: btoa(process.env.JET_PASSWORD),
    integrationKey: process.env.JET_INTEGRATION_KEY,
    storeID: btoa(process.env.JET_STORE_ID),
  },
  emblue: {
    token: process.env.EMBLUE_TOKEN,
    username: process.env.EMBLUE_USERNAME,
    password: process.env.EMBLUE_PASSWORD,
    endpoint: 'https://api.embluemail.com',
    trackEndpoint: `https://track.embluemail.com`,
    trackAuthToken: process.env.TRACK_AUTH_TOKEN,
    eventName: process.env.EMBLUE_EVENT_NAME || 'Dados_Clientes',
  },
});
