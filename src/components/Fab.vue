<template>
    <div class="fab">
        <div
                :class="basketLength ? 'active' : ''"
                class="basket"
        >
            <i class="fas fa-shopping-cart icon" style="font-size: 17px;"></i>
            <div class="table-center count">
                <div class="absolute-center count-background"></div>
                <div class="cell-center count-text">
                    {{basketLength}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            basketLength() {
                return this.$store.getters.basketLength
            }
        }
    }
</script>

<style scoped>

    .fab {
        position: fixed;
        right: 8px;
        bottom: 8px;
        z-index: 2;
    }

    .basket {
        position: relative;
        cursor: pointer;
    }

    .icon {
        opacity: 0;
        transform: scale(0.4);
        transition: 0.3s ease 0s;
    }

    .basket.active .icon, .basket:hover .icon {
        opacity: 1;
        transform: scale(1);
    }

    .count {
        width: 12px;
        height: 12px;
        position: absolute;
        top: -8px;
        right: -8px;
    }

    .count-background {
        width: 100%;
        height: 100%;
        background: #FA5400;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0.4);
        transition: 0.3s ease 0.075s;
    }

    .basket.active .count-background, .basket:hover .count-background {
        opacity: 1;
        transform: scale(1);
    }

    .count-text {
        font-family: Monospaced, sans-serif;
        font-size: 7px;
        position: relative;
        z-index: 1;
        color: #fff;
        opacity: 0;
        transform: scale(0.4);
        transition: 0.3s ease 0.3s;
    }

    .basket.active .count-text, .basket:hover .count-text {
        opacity: 1;
        transform: scale(1);
    }


</style>