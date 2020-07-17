<template>
    <div class="auth-modal d-flex align-items-center justify-content-center">
        <div class="absolute-center background" @click="hideAuth"></div>
        <form @submit.prevent="onSubmit" class="form" ref="form">
            <div class="group">
                <div class="p-0_5 inputs">
                    <!--                    <div class="m-0_5 group-input" v-if="!isRegistered">-->
                    <!--                        <input-->
                    <!--                                type="text"-->
                    <!--                                id="name"-->
                    <!--                                placeholder="name"-->
                    <!--                                class="pt-0_75 pb-0_75 input"-->
                    <!--                                v-model="name"-->
                    <!--                        >-->
                    <!--                    </div>-->
                    <div class="m-0_5 group-input">
                        <input
                                type="email"
                                id="email"
                                placeholder="email"
                                class="pt-0_75 pb-0_75 input"
                                :class="{'is-invalid': $v.email.$error}"
                                @blur="$v.email.$touch()"
                                v-model="email"
                        >
                    </div>
                    <div class="m-0_5 group-input">
                        <input
                                type="password"
                                id="password"
                                placeholder="password"
                                class="pt-0_75 pb-0_75 input"
                                :class="{'is-invalid': $v.password.$error}"
                                @blur="$v.password.$touch()"
                                v-model="password"
                                @input="someHandler"
                                autocomplete="on"
                        >
                        <div class="invalid-feedback" v-if="!$v.password.minLength">
                            {{ password.length }} of {{ $v.password.$params.minLength.min }}
                        </div>
                    </div>
                    <div class="m-0_5 group-input" v-if="!isRegistered">
                        <input
                                type="password"
                                id="confirm"
                                placeholder="confirm password"
                                class="pt-0_75 pb-0_75 input"
                                :class="{'is-invalid': $v.confirmPassword.$error}"
                                @blur="$v.confirmPassword.$touch()"
                                v-model="confirmPassword"
                                autocomplete="on"
                        >
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-space-between buttons">
                <button
                        class="d-flex p-0_75 button-text button"
                        type="submit"
                        :loading="loading"
                        :disabled="$v.$invalid || loading"
                >
                    <span>Sign</span>
                    <span class="ml-0_2" v-if="isRegistered">In</span>
                    <span class="ml-0_2" v-else>Up</span>
                </button>
                <span class="p-0_75 button-text absolute-center text-center">or</span>
                <a class="d-flex align-items-center p-0_75 button-text button"
                   @click="[isRegistered=!isRegistered, reset()]">
                    <span v-if="isRegistered">log</span>
                    <span v-else>sign</span>
                    <span class="ml-0_2">in</span>
                </a>
            </div>
        </form>
    </div>
</template>

<script>
    import {email, minLength, required, sameAs} from 'vuelidate/lib/validators'

    export default {
        name: "Auth",
        data() {
            return {
                isRegistered: true,
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            hideAuth() {
                document.body.classList.remove('is-authentication')
            },
            onSubmit() {
                const user = {
                    email: this.email,
                    password: this.password
                }

                if (this.isRegistered) {
                    this.$store.dispatch('loginUser', user)
                        .then(() => {
                        })
                        .catch(err => console.log(err))
                } else {
                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                        })
                        .catch(err => console.log(err))
                }

                this.hideAuth()
                this.reset()

            },
            reset() {
                this.name = ''
                this.email = ''
                this.password = ''
                this.confirmPassword = ''
            },
            someHandler() {
                if (this.isRegistered) this.confirmPassword = this.password
            }
        },
        validations: {
            email: {
                required,
                email,
                // uniqEmail: function (newEmail) {
                //     if (newEmail === '') return true
                //
                //     return new Promise((resolve) => {
                //         setTimeout(() => {
                //             const value = newEmail !== 'wfm@mail.ru'
                //             resolve(value)
                //         }, 1000)
                //     })
                // }
            },
            password: {
                required,
                minLength: minLength(2)
            },
            confirmPassword: {
                sameAs: sameAs('password')
            }
        }
    }
</script>

<style scoped>

    .auth-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 4;
    }

    .is-authentication .auth-modal {
        display: flex;
    }

    .background {
        background: #00000040;
        z-index: 1;
    }

    .form {
        position: relative;
        z-index: 2;
    }

    .group {
        position: relative;
        z-index: 2;
    }

    .inputs {
        position: relative;
        z-index: 2;
        background: rgba(0, 0, 0, 0.5);
        background: #fff;
        border-radius: 6px;
        background: #ffffff29;
        backdrop-filter: blur(10px);
    }

    .group-input {
        position: relative;
        z-index: 2;
    }

    .input {
        display: block;
        font-size: 1em;
        color: #dadada;
    }

    .input.is-invalid {
        color: red;
    }

    .invalid-feedback {
        position: absolute;
        font-size: 0.5em;
        font-weight: bold;
        color: #000;
        margin-top: -0.25em;
    }

    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #ffffff91;
        transition: 0.3s ease 0s
    }

    input::-moz-placeholder, textarea::-moz-placeholder {
        transition: 0.3s ease 0s
    }

    .group::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: -2rem;
        left: 0;
        margin: -1rem;
        border-radius: 6px;
        overflow: hidden;
        z-index: -1;
        background: #fff;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        clip-path: inset(2rem 0 2rem 2rem round 10px);
        contain: strict;
        box-shadow: 0px 0px 20px 0px #a5a5a5;
        transition: 0.3s ease 0.9s;
    }

    .form:hover .group::after, .form:focus .group::after, .form:active .group::after {
        -webkit-clip-path: inset(0 0 0 0 round 10px);
        clip-path: inset(0 0 0 0 round 10px);
        transition: 0.3s ease 0.1s;
    }

    .button-text {
        font-size: 1em;
        color: #ffffff91;
    }

    .button {
        position: relative;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        cursor: pointer;
        /*transition: opacity 0.3s ease 0.9s, transform 0.1s ease 0s;*/
    }

    .button {
        transition: opacity 0.3s ease 0.1s, transform 0.1s ease 0s;
    }

    .button:active {
        transform: scale(0.88);
    }

    .button[disabled="disabled"] {
        opacity: 0.5;
        transform: scale(1);
        transition: opacity 0.3s ease 0.1s, transform 0.1s ease 0s;
    }


    .buttons {
        position: relative;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease 0.9s;
    }

    .form:hover .buttons {
        opacity: 1;
        transition: opacity 0.3s ease 0.2s;
    }

</style>