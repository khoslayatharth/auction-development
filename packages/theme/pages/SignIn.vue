<template>
    <div>
        <h1 class="heading">SIGN IN</h1>
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
        <form class="form" @submit.prevent="handleSubmit(handleLogin)">
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
                <!-- <SfCheckbox
                  v-e2e="'login-modal-remember-me'"
                  v-model="rememberMe"
                  name="remember-me"
                  label="Remember me"
                  class="form__element checkbox"
                /> -->
                <div v-if="error.login">
                  {{ error.login }}
                </div>
                <SfButton v-e2e="'login-modal-submit'"
                  type="submit"
                  class="sf-button--full-width form__button login_btn"
                  :disabled="loading"
                >
                  <SfLoader :class="{ loader: loading }" :loading="loading" >
                    <div>{{ $t('Login') }}</div>
                  </SfLoader>
                </SfButton>
        </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { ref, watch, reactive, computed, useRouter } from '@nuxtjs/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert, SfBar } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, useForgotPassword } from '@vue-storefront/bagisto';
import { useUiState } from '~/composables';

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
    SfBar
  },
  setup(props, context) {
    const SCREEN_LOGIN = 'login';
    const SCREEN_REGISTER = 'register';
    const SCREEN_THANK_YOU = 'thankYouAfterForgotten';
    const SCREEN_FORGOTTEN = 'forgottenPassword';

    const { isLoginModalOpen, toggleLoginModal, toggleSignInButtons } = useUiState();
    const form = ref({});
    const userEmail = ref('');
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { register, login, loading, error: userError, user } = useUser();
    const { request, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();
    const currentScreen = ref(SCREEN_REGISTER);
    const routerxyz = useRouter();
    const error = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

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
      toggleSignInButtons();
      routerxyz.push('/home')
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
      SCREEN_FORGOTTEN
    };
  }
};
</script>

<style lang="scss" scoped>
    .heading {
        text-align: center;
        margin-top: 50px;
        margin-bottom:20px;
    }

    .form {
        margin-top: var(--spacer-sm);

        &__element {
            margin: 0 0 var(--spacer-xl) 0;
        }
        max-width: 500px;
        margin: auto;
    }
    .login_btn{
        border-radius: 50px 50px;
        padding: 10px;
        background: yellow;
        font-weight: bold;
        color: black;
    }
</style>