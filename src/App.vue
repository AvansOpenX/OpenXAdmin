<template>
  <header-component/>
  <admin-component v-if="espStore.connected && !espStore.loading"/>
  <div v-if="!espStore.connected || espStore.loading" class="d-flex justify-content-center align-items-center w-100 h-50">
    <div v-if="espStore.loading" class="spinner-border text-secondary" role="status"></div>
    <button v-if="espStore.supported && !espStore.connected && !espStore.loading" id="connectButton" @click="connectToEsp" class="btn text-white">
      <i class="fa-brands fa-bluetooth-b"></i>
    </button>
    <p v-if="!espStore.supported" class="text-center">Web-Bluetooth wordt niet door deze browser ondersteund. Probeer Chrome op Android of Bluefy op IOS.</p>
  </div>
</template>

<script>
  import { useEspStore } from '@/store/espStore';
  import { connectDevice } from '@/espConnection';
  
  export default {
    setup() {
      const espStore = useEspStore();

      return {
        espStore,
      };
    },

    methods: {
      connectToEsp() {
        if (!this.espStore.connected) {
          connectDevice();
        }
      },
    },
  }
</script>
