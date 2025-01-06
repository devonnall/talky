<script setup>
    import { ref } from 'vue'

    const count = ref(0)

    const increment = () => {
        count.value++
    }

    const decrement = () => {
        count.value--
    }
</script>

<template>
    <div class="flex gap-2 justify-center items-center">
        <button @click="decrement" class="appearance-none hover:opacity-50 w-8 h-8 text-lg">-</button>
        <span>{{ count }}</span>
        <button @click="increment" class="appearance-none hover:opacity-50 w-8 h-8 text-lg">+</button>
    </div>
</template>

<style scoped>
    /* button {
        border: none;
        font-size: 1.5rem;
        border-radius: 50%;
        background-color: #f5f5f5;
        justify-content: center;
        padding: 0.5rem;
        appearance: none;
        cursor: pointer;
    }
    .counter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    } */
</style>