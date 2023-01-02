<template>
    <nav class="d-flex justify-content-between">
    <h1>
        <b>Open</b>Admin
    </h1>
    <button v-if="espStore.connected" class="btn" onclick="logout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
    </button>
    </nav>
</template>

<script>
    import { useEspStore } from '@/store/espStore';

    export default {
        setup() {
            const espStore = useEspStore();

            return {
                espStore,
            };
        },

        methods: {
            logout() {

            },
        },
    }
</script>
