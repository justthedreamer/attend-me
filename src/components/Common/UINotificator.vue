<script setup lang="ts">
import {ref, watchEffect} from "vue";
import useEventBus from "../../events/EventBus.ts";
import {ErrorMessage, SuccessMessage} from "../../events/MessageEvents.ts";

const {EventBus} = useEventBus();

const errorMessages = ref<string[]>([])
const successMessages = ref<string[]>([])

watchEffect(() => {
  const error = EventBus.value.get(ErrorMessage);
  if (error) {
    errorMessages.value.push(error);
    setTimeout(() => {
      errorMessages.value.shift();
    }, 2000);
  }

  const success = EventBus.value.get(SuccessMessage);
  if (success) {
    successMessages.value.push(success);
    setTimeout(() => {
      successMessages.value.shift();
    }, 2000);
  }
});

</script>

<template>
  <div id="error-messages">
    <div v-for="(message, index) in errorMessages" :key="`error-${index}`" class="error-message">
      {{ message }}
    </div>
  </div>

  <div id="success-messages">
    <div v-for="(message, index) in successMessages" :key="`success-${index}`" class="success-message">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
#error-messages {
  position: fixed;
  top: 60px;
  right: 0;
  width: 100%;
  z-index: 1500;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: .5rem;
  padding: 5px;
}

.error-message {
  padding: .5rem;
  background-color: var(--color-aurora-red);
  border-radius: 10pt;
  max-width: 200px;
  width: 200px;
  z-index: 1500;
  transform: translateX(300px);
  animation: error-shown .5s ease forwards;
}

#success-messages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .5rem;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  padding-top: .5rem;
  transform: translateX(-50%);
  z-index: 1499;
}

.success-message {
  background-color: var(--color-aurora-green);
  padding: .5rem;
  border-radius: 10pt;
  max-height: 400px;
  transform: translateY(-400px);
  animation: success-shown .5s ease forwards;
}

@keyframes error-shown {
  100% {
    transform: translateX(0);
  }

}

@keyframes success-shown {
  100% {
    transform: translateY(0);
  }
}
</style>