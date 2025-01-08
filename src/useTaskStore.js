import { ref } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
const tasks = ref([]);

const fetchTasks = async () => {
    try {
        tasks.value = await pb.collection('tasks').getFullList({
            filter: "complete = false",
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const addTask = (task) => {
    tasks.value.push(task); 
};

const deleteTask = (task) => {
    tasks.value.pop(task);
}

const markComplete = (task) => {
    task.complete = true;

    setTimeout(() => {
        tasks.value = tasks.value.filter(t => t.id !== task.id);
    }, 500); 
};


export const useTaskStore = () => {
    return {
        tasks,
        fetchTasks,
        addTask,
        deleteTask,
        markComplete,
    };
};
