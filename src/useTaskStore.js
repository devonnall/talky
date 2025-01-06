import { ref } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const tasks = ref([]);

const fetchTasks = async () => {
    try {
        tasks.value = await pb.collection('tasks').getFullList();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const addTask = (task) => {
    tasks.value.push(task); // Add the new task to the local state
};

export const useTaskStore = () => {
    return {
        tasks,
        fetchTasks,
        addTask,
    };
};
