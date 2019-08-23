import { setup, defaultClient } from 'applicationinsights';

export function start() {
  // Automagically pulls the creds from env (APPINSIGHTS_INSTRUMENTATIONKEY)
  setup().start()
    .setSendLiveMetrics(true);
}

export function logError(error: Error) {
  defaultClient.trackException({exception: error})
}