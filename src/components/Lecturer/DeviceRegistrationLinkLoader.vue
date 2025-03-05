<script setup lang="ts">
import {Backend} from "../../main.ts";
import {useRouter} from "vue-router";
import Routes from "../../router/routes.ts";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage, SuccessMessage} from "../../events/MessageEvents.ts";

const props = defineProps({
  userId: Number
})

const router = useRouter()
const {emit} = useEventBus()

const copyLink = async () => {
  try {
    const tokenResult = await Backend.userDeviceRegisterTokenGet(props.userId)

    const relativePath = router.resolve({
      name: Routes.StudentDeviceRegistration.name,
      params: {token: tokenResult.token}
    }).href;

    const fullUrl = `${window.location.origin}${relativePath}`

    await navigator.clipboard.writeText(fullUrl);
    emit(SuccessMessage, "Link copied.")

  } catch (error) {
    if (error instanceof Error) {
      emit(ErrorMessage, "Cannot get or copy link." + error.message)
    } else {
      emit(ErrorMessage, "Cannot get or copy link, an unexpected error occurred.")
    }
  }
}

</script>

<template>
  <button class="btn-primary" @click="copyLink">Get link</button>
</template>

<style scoped>
button {
  font-size: 1rem;
  max-width: 100px;
}
</style>