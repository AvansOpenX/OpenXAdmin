<template>
  <header-component/>
  <admin-component v-if="espStore.connected"/>
  <div v-if="espStore.supported && !espStore.connected" class="d-flex justify-content-center align-items-center w-100 h-50">
    <button @click="connectToEsp" class="btn btn-success">
      Maak verbinding
    </button>
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
