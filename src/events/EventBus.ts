import {ref} from "vue";

const EventBus = ref(new Map());

export default function useEventBus() {
    function emit(event: any, message: string) {
        EventBus.value.set(event, message);
        EventBus.value = new Map(EventBus.value);
    }

    return {emit, EventBus};
}