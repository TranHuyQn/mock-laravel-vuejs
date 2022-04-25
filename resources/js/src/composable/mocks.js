import {ref} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router';
import {useToast} from "vue-toastification";

export default function useMocks() {
  const mocks = ref([])
  const mock = ref({})
  const router = useRouter()
  const errors = ref('')
  const Toast = useToast();

  const getMocks = async (projectSlug) => {
    let {data} = await axios.get(`/api/${projectSlug}/mocks`)
    mocks.value = data;
  }

  const getMock = async (id) => {
    let {data} = await axios.get('/api/mocks/' + id)
    mock.value = data;
  }

  const storeMock = async (data) => {
    errors.value = ''
    try {
      await axios.post('/api/mocks', data)
      await getMocks(data.projectSlug)
      Toast.success('Create mock success');
    } catch (e) {
      console.log("store mock error", e)
    }
  }

  const updateMock = async (id, data) => {
    errors.value = ''
    try {
      await axios.put('/api/mocks/' + id, data)
      await getMocks(data.projectSlug)
      Toast.success('Update mock success');
    } catch (e) {
      console.log("update mock error", e)
    }
  }

  const destroyMock = async (id) => {
    await axios.delete('/api/mocks/' + id)
    mocks.value = mocks.value.filter(item => item.id !== id)
    Toast.success('Delete mock success');
  }

  return {
    mocks,
    mock,
    errors,
    getMocks,
    getMock,
    storeMock,
    updateMock,
    destroyMock
  }
}
