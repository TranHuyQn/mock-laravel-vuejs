import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default function useProjects() {
    const projects = ref([])
    const project = ref({})
    const router = useRouter()
    const errors = ref('')
    const Toast = useToast();

    const getProjects = async () => {
        let {data} = await axios.get(`/api/projects`)
        projects.value = data;
    }

    const getProject = async (id) => {
        let {data} = await axios.get('/api/projects/' + id)
        project.value = data;
    }

    const storeProject = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/projects', data);
            Toast.success('Add project success');
            getProjects();
        } catch (e) {
            console.log("store project error", e)
        }
    }

    const updateProject = async (id, data) => {
        errors.value = ''
        try {
            await axios.put('/api/projects/' + id, data);
            Toast.success('Edit project success');
            projects.value.forEach(project => {
                if (project.id === id) {
                    project.name = data.name;
                    project.slug = data.slug;
                }
            });
        } catch (e) {
            console.log("update project error", e)
        }
    }

    const destroyProject = async (id) => {
        await axios.delete('/api/projects/' + id);
        Toast.success('Delete project success');
        getProjects();
    }

    return {
        projects,
        project,
        errors,
        getProjects,
        getProject,
        storeProject,
        updateProject,
        destroyProject
    }
}
