<template>
    <div v-scroll="handleScroll" class="p-0_5 m-0_5 header" :class="(scrlY > 0) ? 'active' : '' ">
        <div class="d-flex justify-content-space-between">
            <div></div>
            <div class="d-flex align-items-center">
                <div class="auth" @click="showAuth">
                    <svg aria-hidden="true" ocusable="false" data-prefix="fas" data-icon="sign-in-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-sign-in-alt fa-w-16 fa-3x img-full auth-icon"><path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z" class=""></path></svg>
                </div>
                <form class="d-flex align-items-center form" @submit="(e) => {e.preventDefault()}">
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
                scrlY: ''
            }
        },
        methods: {
            handleScroll: function () {
                this.scrlY = window.scrollY;
            },
            showAuth() {
                document.body.classList.add('is-authentication')
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

    .header {
        position: sticky;
        top: 0;
        background: #ffffffc7;
        z-index: 3;
        border-radius: 16px;
        box-shadow: 0 0 20px rgba(0, 0, 0, .1);
        backdrop-filter: blur(20px);
        /*transition: 0.3s ease 0s;*/
    }

    .header.active{
        border-radius: 0 0 16px 16px;
    }

    .auth{
        width: 20px;
        height: 20px;
        padding: 0.5em;
        margin: 0 0.5em;
        cursor: pointer;
        border-radius: 50%;
    }

    .auth-icon > path{
        fill: #9E9EA7;
        transition: 0.3s ease 0s;
    }

    .auth:hover .auth-icon > path{
        fill: #000;
    }

    .form {
        width: 160px;
        background: #F3F3F4;
        border-radius: 6px;
        padding: 0 0.7em;
        box-sizing: border-box;
        transition: 0.3s ease 0s;
    }

    .form:hover {
        background: #fff;
        box-shadow: 0 0 3px 0px rgba(78, 78, 78, 0.24);
    }

    .icon {
        fill: #9E9EA7;
    }

    .input {
        width: 100%;
        padding: 1em 0.5em;
    }

</style>