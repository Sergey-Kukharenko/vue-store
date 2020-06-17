<template>
    <div
            class="d-flex align-items-center justify-content-space-between pt-0_5 pb-0_5 pl-1 pr-1 snackbar"
            :class="error ? 'active' : ''"
            :error="autoClose()"
    >
        <div class="snackbar-text">{{error}}</div>
        <div class="snackbar-button"
             @click="closeError"
        >
            Close
        </div>
    </div>
</template>

<script>
    export default {
        props: ['message'],
        name: "Snackbar",
        methods: {
            closeError() {
                this.$store.dispatch('clearError')
            },
            autoClose() {
                setTimeout(() => {
                    this.closeError()
                }, 5000)
            }
        },
        computed: {
            error() {
                return this.$store.getters.error
            }
        }
    }
</script>

<style scoped>

    .snackbar {
        max-width: 344px;
        border-radius: 4px;
        position: fixed;
        bottom: 8px;
        left: 8px;
        right: 8px;
        z-index: 4;
        color: #F3F3F4;
        background-color: #323232;
        margin: auto;
        transform: translateY(150%);
        transition: 0.15s cubic-bezier(0, 0, .2, 1) 0s;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
    }

    .snackbar.active {
        transform: translateY(0%);
    }

    .snackbar-text {
        font-size: 1em;
    }

    .snackbar-button {
        font-size: 1em;
        color: #FA5400;
        cursor: pointer;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-left: 0.25em;
    }

</style>