import axios from "axios";

export const api = axios.create({
  baseURL:
    "http://mobile-aceite.tcu.gov.br/mapa-da-saude/rest/assistenciasocial"
});

export const KEY_API_GOOGLE_MAPS = "";

export function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
