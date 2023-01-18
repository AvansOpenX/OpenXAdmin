import { defineStore } from 'pinia'

export const useEspStore = defineStore('esp', {
  state: () => ({
    connected: false,
    connecting: false,
    supported: true,
  }),
});
