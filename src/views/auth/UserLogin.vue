<template>
    <div class="row">
        <div class="col-5">
                <div class="form">
                    <div class="logo">
                        <img 
                        id="dev-inv-img" 
                        src="../../assets/icons/InventaryLogonobg.png" 
                        alt="Devinventory logo">
                    </div>
                    <h2>Login</h2>
                    <login-form 
                        id="loginform" 
                        @submit="auth" 
                        :validation-schema="schema" 
                        v-slot="{ errors }">
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <login-field 
                                type="email" 
                                class="form-control" 
                                name="email" 
                                v-model="user.email"/>
                            <span 
                                class="text-danger" 
                                v-text="errors.email" 
                                v-show="showMailError">
                            </span>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Senha</label>
                            <login-field 
                                type="password" 
                                class="form-control" 
                                name="password" 
                                v-model="user.password"/>
                            <span 
                                class="text-danger" 
                                v-text="errors.password" 
                                v-show="showPassError">
                            </span>
                        </div>
                        <button 
                            class="btn btn-outline-info" 
                            type="button" 
                            @click="cleanForm">
                        Limpar
                        </button>
                        <button 
                            type="submit" 
                            class="btn btn-info">
                        Entrar
                        </button>
                    </login-form>
                    <div class="alternative">
                        <button 
                            id="google" 
                            class="btn btn-outline-info" 
                            @click="enterWithGoogle">
                        Entrar com Google
                        </button>
                        <p><router-link 
                            id="forgot-link" 
                            to="/" 
                            @click="inProgress">
                        Esqueceu a senha?
                        </router-link></p>
                        <span
                            class="criar-conta" 
                            data-bs-toggle="modal" 
                            data-bs-target="#newAccountModal"
                        >N??o possui uma conta?</span>
                    </div>
                </div>
        </div>
        <div class="col-7">
            <div class="container text-center">
                <img 
                id="inventory-img" 
                src="../../assets/icons/loginimg.png" 
                alt="Invent??rio">
            </div>
            <div class="lab365">
                <img 
                id="lab365-img" 
                src="../../assets/icons/lab365logo.png" 
                alt="LAB365">
            </div>
        </div>        
    </div>
    <ModalNewAccount></ModalNewAccount>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../../validations/validateusers'
import { useCookies } from 'vue3-cookies'
import ModalNewAccount from './ModalNewAccount.vue'
import { mapActions, mapState } from 'vuex'

const cookies = useCookies().cookies
rules

export default {
    data() {
        return {
            schema: {
                email: 'required',
                password: 'required',
            },
            user: {}
        }
    },
    components: {
        "login-form": Form,
        "login-field": Field,
        ModalNewAccount
    },
    methods: {
        ...mapActions(["auth/authentication", "auth/getUrlAuth"]),
        auth() {
            this['auth/authentication']({
                "email": this.user.email,
                "password": this.user.password
            }).then(() => {
                if(this.success) {
                    this.$toast.info(`Bem-vindo(a), ${this.userLogged.name}!`, {position: 'top-right'})
                    this.$router.push('/users/inventario')
                } else {
                    this.$toast.error(this.errorMsg)
                }
            })
        },
        enterWithGoogle() {
            this["auth/getUrlAuth"]().then(() => {
                location.href = this.url_auth
            })
        },
        cleanForm() {
            let form = document.getElementById('loginform')
            form.reset()
        },
        inProgress() {
            this.$toast.info(`Pedimos desculpas...a funcionalidade "Esqueceu senha?" est?? em constru????o.`, {position: 'top-left'});
        }
    },
    computed: {
        ...mapState({
            success: (state) => state.auth.success,
            errorMsg: (state) => state.auth.errorMsg,
            userLogged: (state) => state.auth.user,
            url_auth: (state) => state.auth.url_auth,
        }),
        showMailError() {
            // Torna a visualiza????o da mensagem de erro responsiva
            if (this.user.email) {
                if (this.user.email.length > 0) {
                    return false
                }
            }
            return true
        },
        showPassError() {
            // Torna a visualiza????o da  mensagem de erro responsiva
            if (this.user.password) {
                if (this.user.password.length > 0) {
                    return false
                }
            }
            return true
        }, 
    },
    mounted() {
        // // Cria listas de users e itens vazias no localstorage, caso n??o existam
        // if (localStorage.getItem('users') === null) {
        //     let users = []
        //     localStorage.setItem('users', JSON.stringify(users))
        // }
        // if (localStorage.getItem('itens') === null) {
        //     let itens = []
        //     localStorage.setItem('itens', JSON.stringify(itens))
        // }
        // Se usu??rio j?? estiver logado, envia para o invent??rio
        if (cookies.get('logged') !== null) {
            if (cookies.get('logged').status === true) {
                this.$router.push('/users/inventario')
            }
        }
        
    }
}
</script>
<style scoped>
/* Div geral */
.row {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 100%;
}
/* Coluna da imagem grande */
.col-7 {
    flex-direction: column;
    justify-content: space-between;
    padding: 150px 20px 10px 10px;
    background-color: aliceblue;
}
/* Div da Coluna de login */
.col-5 {
    background-color: rgb(14, 34, 63);
    padding-right: 40px;
    padding-left: 90px;
    flex-direction: column;
    justify-content: space-evenly;
}
/* Imagem grande */
#inventory-img {
    max-width: 450px;
}
/* Imagem pequena LAB365 */
#lab365-img {
    max-width: 90px;
}
/* Devinventory logo */
#dev-inv-img {
    max-width: 150px;
}
/* Div da imagem LAB365 */
.lab365 {
    text-align: right;
}
/* Bot??es */
.btn {
    margin: 4px;
}
/* Div do bot??o criar conta */
.criar-conta {
    text-align: center;
    margin-bottom: 30px;
    color: rgb(190, 187, 187);
    display: block;
    cursor: pointer;
}
.criar-conta:hover{
    color: white;
}
/* Div do form */
#loginform {
    margin-top: 40px;
    margin-bottom: 40px;
    padding-right: 80px;
}
/* Div do bot??o Entrar com Google e esqueceu senha? */
.alternative {
    display:block;
    text-align: center;
    padding-right:70px;
}
/* Div do devinvetory logo */
.logo {
    text-align: center;
}
/* Bot??o Entrar com Google */
#google {
    margin-bottom: 20px;
}
h2, .form-label, #forgot-link {
    color: rgb(7, 201, 239);
    margin-bottom: 1px;
}
</style>