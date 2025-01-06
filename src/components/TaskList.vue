<script setup>
    import PocketBase from 'pocketbase';
    import { ref } from 'vue'

    const pb = new PocketBase('http://127.0.0.1:8090');

    const tasks = ref([]);

    async function fetchTasks() {
        try {
            tasks.value = await pb.collection('tasks').getFullList();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    fetchTasks();
</script>

<template>
    <div>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <div class="flex gap-2">
                    <span>{{ task.name }}</span>
                    <span>{{ task.dueDate }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>