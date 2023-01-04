<template>
  <div>
    <form>
      <section>
        <h1>
          Plant instellingen
        </h1>
        <hr>
        <!-- Foreach plant -->
        <PlantSettings v-for="(plant, i) in settings.plants" :key="i" :index="i" :value="plant" />
        <!-- End foreach -->
      </section>
      <section>
        <h1>Algemene instellingen</h1>
        <hr>
        <div class="d-flex flex-column gap-4 pb-2 pt-2">
          <div>
            <h2>Meet interval</h2>
            <div class="d-flex flex-row gap-4 align-items-center">
              <input type="number" class="rounded" v-model="settings.mInterval" />
              <p class="mb-0">Seconden</p>
            </div>
          </div>
          <div>
            <h2>Spelduur</h2>
            <div class="d-flex flex-row gap-4 align-items-center">
              <input type="number" class="rounded" v-model="settings.gameDuration" />
              <p class="mb-0">Seconden</p>
            </div>
          </div>
          <div>
            <h2>Reservoir kraan</h2>
            <div class="d-flex flex-row gap-4 align-items-center">
              <input type="number" class="rounded" v-model="settings.rValveFlow" />
              <p class="mb-0">Procent</p>
            </div>
          </div>
          <div>
            <h2>Data verzend interval</h2>
            <div class="d-flex flex-row gap-4 align-items-center">
              <input type="number" class="rounded" v-model="settings.tInterval" />
              <p class="mb-0">Minuten</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>WiFi instellingen</h1>
        <p class="mb-0">Installatie wordt herstart na het doorvoeren van wijzigingen in deze categorie</p>
        <hr>
        <div class="d-flex flex-column gap-4 pb-2 pt-2">
          <div>
            <h2>SSID</h2>
            <div class="d-flex flex-row gap-4 align-items-center">
              <input type="text" class="rounded w-100" maxlength="32" v-model="settings.ssid" />
            </div>
          </div>
          <div>
            <h2>Wachtwoord</h2>
            <div class="d-flex flex-row gap-4 align-items-center">
              <input type="text" class="rounded w-100" maxlength="32" v-model="settings.pass" />
            </div>
          </div>
        </div>
      </section>
      <button type="button" class="btn btn-success rounded-circle shadow" @click="save">
        <i class="fa-solid fa-check"></i>
      </button>
    </form>
  </div>
</template>

<script>
  import { mapWritableState } from 'pinia'
  import { useDataStore } from '@/store/dataStore';
  import PlantSettings from '@/components/PlantSettings.vue';
  import { writeSettings } from '@/espConnection';

  export default {
    components: {
      PlantSettings,
    },

    computed: {
      ...mapWritableState(useDataStore, ['settings']),
    },

    methods: {
      async save() {
        try {
          await writeSettings();
        } catch (e) {
          alert(e.message);
        }
      },
    },
  };
</script>
