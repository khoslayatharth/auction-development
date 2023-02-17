<template>
    <div>
        <h1 class="heading top">BECOME A MEMBER</h1>
        <hr style="color:rgba(0,0,0,.1); margin-bottom:30px; margin-top:30px">
        <h2 class="heading">SIGN UP NOW</h2>
        <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
           
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-firstName'"
                v-model="form.firstName"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="first-name"
                label="First Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-lastName'"
                v-model="form.lastName"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="last-name"
                label="Last Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-streetAddress1'"
                v-model="form.streetAddress1"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="street-address-1"
                label="Street Address 1"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-streetAddress2'"
                v-model="form.streetAddress2"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="street-address-2"
                label="Street Address 2"
                class="form__element"
              />
            </ValidationProvider>
           
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-city'"
                v-model="form.city"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="city"
                label="City"
                class="form__element"
              />
            </ValidationProvider>
           
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-zip'"
                v-model="form.zip"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="zip"
                label="Zip"
                class="form__element"
              />
            </ValidationProvider>
           
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfSelect
                class="sf-select--underlined form__element"
                name="country"
                label="Country"
                v-e2e="'login-modal-country'"
                v-model="form.country"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                value=""
                placeholder=""
                >
                <SfSelectOption v-for="country in countrylist" :key="country.country" :value="country.country">{{country.country}}</SfSelectOption>
             </SfSelect>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput v-if = "form.country !== 'United States'"
                v-e2e="'login-modal-state'"
                v-model="form.state"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="state"
                label="State"
                class="form__element"
              />
              <SfSelect v-if = "form.country === 'United States'"
                class="sf-select--underlined form__element"
                name="state"
                label="State"
                v-e2e="'login-modal-state'"
                v-model="form.state"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                value=""
                placeholder=""
                >
                <SfSelectOption v-for="state in statelist" :key="state.abbreviation" :value="state.name">{{state.name}}</SfSelectOption>
             </SfSelect>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-phone'"
                v-model="form.phone"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="phone"
                label="Phone"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-email'"
                v-model="form.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
           
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-password'"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-confirmPassword'"
                v-model="form.confirmPassword"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
              <SfCheckbox
                v-e2e="'login-modal-create-account'"
                v-model="createAccount"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="create-account"
                label="I have read and agree to the Privacy Policy, Terms of Use, Cookie Policy, Return Policy."
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="error.register">
              {{ error.register }}
            </div>
            <SfButton
              type="submit"
              class="sf-button--full-width form__button signup_btn"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Register') }}</div>
              </SfLoader>
            </SfButton>
          </form>
    </div>
</template>
<script>
import { ref, watch, reactive, computed } from '@nuxtjs/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert, SfBar, SfSelect } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, useForgotPassword } from '@vue-storefront/bagisto';
import { useUiState } from '~/composables';
import countries from '../static/assets/countries.js'
import states from '../static/assets/states.js'

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar,
    SfSelect
  },
  setup(props, context) {
    const SCREEN_LOGIN = 'login';
    const SCREEN_REGISTER = 'register';
    const SCREEN_THANK_YOU = 'thankYouAfterForgotten';
    const SCREEN_FORGOTTEN = 'forgottenPassword';
   
    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const form = ref({});
    const userEmail = ref('');
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { register, login, loading, error: userError, user } = useUser();
    const { request, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();
    const currentScreen = ref(SCREEN_REGISTER);

    const error = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    const countrylist = countries;
    const statelist = states;

    const barTitle = computed(() => {
      switch (currentScreen.value) {
        case SCREEN_LOGIN:
          return 'Sign in';
        case SCREEN_REGISTER:
          return 'Register';
        default:
          return 'Reset Password';
      }
    });

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
      }
    });
    const setCurrentScreen = (screenName) => {
      resetErrorValues();
      currentScreen.value = screenName;
    };

    const handleForm = (fn) => async () => {
      resetErrorValues();
      await fn({ user: form.value });

      const hasUserErrors = userError.value.register || userError.value.login;

      if (hasUserErrors) {
        error.login = userError.value.login?.message;
        error.register = userError.value.register?.message;
        return;
      }
      toggleLoginModal();
    };

    const closeModal = () => {
      resetErrorValues();
      setCurrentScreen(SCREEN_LOGIN);
      toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    const handleForgotten = async () => {
      userEmail.value = form.value.email;
      await request({ email: userEmail.value });

      if (!forgotPasswordError.value.request) {
        setCurrentScreen(SCREEN_THANK_YOU);
      }
    };

    return {
      form,
      error,
      userError,
      loading,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      forgotPasswordError,
      forgotPasswordLoading,
      handleForgotten,
      closeModal,
      userEmail,
      barTitle,
      currentScreen,
      setCurrentScreen,
      SCREEN_LOGIN,
      SCREEN_REGISTER,
      SCREEN_THANK_YOU,
      SCREEN_FORGOTTEN,
      countrylist,
      statelist
    };
  }
};
</script>
<style lang="scss" scoped>
.heading {
        text-align: center;
    }

    .form {
        margin-top: var(--spacer-sm);

        &__element {
            margin: 0 0 var(--spacer-xl) 0;
        }
        max-width: 500px;
        margin: auto;
    }
    .top{
        margin-top:30px;
    }

    .signup_btn{
        border-radius: 50px 50px;
        padding: 10px;
        background: yellow;
        font-weight: bold;
        color: black;
    }
</style>