<template>
    <div v-scroll="handleScroll" class="p-0_5 m-0_35 header" :class="{active: (scrlY > 0)}">
        <div class="d-flex justify-content-end header-container">
            <div class="d-flex align-items-center">
                <div
                        class="pt-0_5 pb-0_5 pl-0_35 pr-0_35 filter-box"
                        :class="{active: filter}"
                >
                    <div class="animate-icon filter-button" @click="toggleFilter">
                        <img src="../../public/img/icons/filter.svg" class="filter-icon" alt="filter-icon">
                    </div>
                    <div class="filter">
                        <div
                                class="mr-2 filter-item reveal"
                                v-for="(item, index) of filtersItem"
                                :key="index"
                                :class="{active: index == selected}"
                                @click="selected = index, setFilter(item)"
                        >
                            <span class="reveal-text filter-content">
                               <span class="filter-text">
                                    {{item.text}}
                                </span>
                            </span>

                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center auth-links">
                    <div
                            class="pt-0_5 pb-0_5 pl-0_35 pr-0_35 animate-icon auth"
                            @click="showAuth"
                            v-if="!isUserLoggedIn"
                    >
                        <img src="../../public/img/icons/user.svg" class="img-full">
                    </div>
                    <div
                            class="pt-0_5 pb-0_5 pl-0_35 pr-0_35 animate-icon auth"
                            @click="[onLogout(), onFetchBasket()]"
                            v-else
                    >
                        <img src="../../public/img/icons/sign-in.svg" class="img-full">
                    </div>
                </div>
                <form class="d-flex align-items-center pl-0_7 pr-0_7 ml-0_5 form" @submit="(e) => {e.preventDefault()}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                         role="img"
                         class="flex-shrink-none icon">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M10.6002 12.0498C9.49758 12.8568 8.13777 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 8.15637 12.8447 9.53194 12.019 10.6419C12.0265 10.6489 12.0338 10.656 12.0411 10.6633L15.2935 13.9157C15.6841 14.3063 15.6841 14.9394 15.2935 15.33C14.903 15.7205 14.2699 15.7205 13.8793 15.33L10.6269 12.0775C10.6178 12.0684 10.6089 12.0592 10.6002 12.0498ZM11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"></path>
                    </svg>
                    <input type="text"
                           placeholder="Search"
                           class="flex input"
                           v-model="search"
                           @input="$emit('search',search)"
                    >
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Header",
        data() {
            return {
                search: '',
                scrlY: '',
                filter: false,
                selected: null,
                filtersItem: [
                    {name: 'all', text: 'all', selected: false, type: 'all'},
                    {name: 'price', text: 'price min', selected: false, type: 'min'},
                    {name: 'price', text: 'price max', selected: false, type: 'max'},
                    {name: 'rating', text: 'rating', selected: false, type: 'rating'},
                    {name: 'favorite', text: 'favorite', selected: false, type: 'favorite'},
                ]
            }
        },
        methods: {
            handleScroll: function () {
                this.scrlY = window.scrollY;
            },
            showAuth() {
                document.body.classList.add('is-authentication')
            },
            toggleFilter() {
                this.filter = !this.filter
            },
            setFilter(item) {
                this.$emit('setFilter', item)
            },
            // activeItem(item, index) { // add to current and remove siblings
            //     this.filtersItem.forEach((filterItem, i) => {
            //         if (index === i) {
            //             return item.selected = !item.selected
            //         }
            //         return filterItem.selected = false;
            //     });
            // },
            onLogout() {
                return this.$store.dispatch('logoutUser')
            },
            onFetchBasket() {
                return this.$store.dispatch('fetchBasket')
            },
        },
        computed: {
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            }
        },
        directives: {
            scroll: {
                inserted: function (el, binding) {
                    let f = function (evt) {
                        if (binding.value(evt, el)) {
                            window.removeEventListener('scroll', f);
                        }
                    }
                    window.addEventListener('scroll', f);
                }
            }
        }
    }
</script>

<style scoped>

    /*disable zoom in ios*/
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        select,
        textarea,
        input {
            font-size: 16px;
        }
    }

    .header {
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 3;
        border-radius: 16px;
        box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    }

    .header.active {
        border-radius: 0 0 16px 16px;
    }

    .filter-box {
        position: relative;
    }

    .filter-button {
        cursor: pointer;
    }

    .filter-box.active .filter-button{
        opacity: 1;
    }

    .filter-icon {
        width: 14px;
    }

    .filter {
        position: absolute;
        right: 0;
        padding: 0.5em 0;
        margin-top: 0.25em;
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        visibility: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
        opacity: 0;
        transform: translateY(10%);
        transition: visibility 0s ease 0.3s, transform 0.3s ease 0s, opacity 0.3s ease 0s;
    }

    .filter-box.active .filter {
        opacity: 1;
        visibility: visible;
        transform: translateY(0%);
        transition: visibility 0s ease 0s, transform 0.3s ease 0s, opacity 0.3s ease 0s;
    }

    .filter-item {
        position: relative;
        color: #000;
        border-radius: 6px;
        cursor: pointer;
    }

    .filter-content:before {
        content: "";
        position: absolute;
        z-index: 2;
        top: 4px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        pointer-events: none;
        opacity: 0;
        transform-origin: 50% 50%;
        transform: scale(0.8);
        transition: opacity 0.9s cubic-bezier(0.0, 0.0, 0.2, 1) 0s, transform 0.3s cubic-bezier(0.0, 0.0, 0.2, 1) 0s;
    }

    .filter-item.active .filter-content:before {
        opacity: 1;
        transform: scale(1);
    }

    .filter-content{
        display: inline-block;
        position: relative;
        overflow: hidden;
    }

    .filter-text {
        font-size: 1em;
        font-weight: 600;
        letter-spacing: 0.2px;
        line-height: normal;
        position: relative;
        z-index: 3;
        padding: 0 0.3em;
        white-space: nowrap;
        transition: color 0.3s cubic-bezier(0.0, 0.0, 0.2, 1) 0s;
    }

    .filter-item.active .filter-text{
        color: #fff;
    }

    .auth {
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }

    .animate-icon {
        opacity: 0.4;
        transition: opacity 0.3s ease 0s;
    }

    .form {
        width: 160px;
        background: #fff;
        border: 1px solid #efefef;
        border-radius: 6px;
        box-shadow: 0 0 0px 0px rgb(214, 214, 214);
        box-sizing: border-box;
        transition: 0.3s ease 0s;
    }

    .active > .reveal-text:after {
        opacity: 0;
    }

    .icon {
        fill: #9E9EA7;
    }

    .input {
        width: 100%;
        padding: 1em 0.5em;
        margin: -1px;
    }

    @media (min-width: 1025px) {

        .animate-icon:hover, .filter-box.active .animate-icon {
            opacity: 1;
        }

        .form:hover {
            background: #fff;
            /*box-shadow: 0 0 3px 0px rgba(78, 78, 78, 0.24);*/
            box-shadow: 0 0 3px 0px rgb(199, 199, 199);
        }

        .reveal:hover .reveal-text::after {
            animation: text-revealer 0.6s cubic-bezier(0.0, 0.0, 0.2, 1) 0s 1;
        }

        .header {
            background: #ffffffc7;
            backdrop-filter: blur(20px);
        }

    }

    @media (max-width: 1024px) {

        .filter-item {
            padding: 0.125em 0;
        }

        .header-container{
            position: relative;
        }

        .filter-box{
            position: static;
        }

        .filter {
            left: 0px;
            margin: 2em -0.5em 0;
        }

        .filter-content {
            margin: -0.3em 0;
        }

        .filter-text {
            display: block;
            padding: 0.6em 0.3em;
        }

    }

</style>