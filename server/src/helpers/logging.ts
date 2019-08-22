import { setup } from 'applicationinsights';

export function start() {
  // Automagically pulls the creds from env (APPINSIGHTS_INSTRUMENTATIONKEY)
  setup().start()
    .setSendLiveMetrics(true);
}