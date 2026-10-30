import axios from 'axios';

const projectApi = axios.create({
  baseURL: 'http://localhost:8080/api/projects',
});

export const getProjects = () => projectApi.get('');
export const addProject = (project) => projectApi.post('', project);
export const updateProject = (id, project) => projectApi.put(`/${id}`, project);
export const deleteProject = (id) => projectApi.delete(`/${id}`);
