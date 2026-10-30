import { useEffect, useState } from 'react';
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from './services/projectService';

const emptyProject = {
  projectTitle: '',
  studentName: '',
  description: '',
  guideName: '',
};

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
      setError('');
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'Could not load projects.'));
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setFormData(emptyProject);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!formData.projectTitle.trim() || !formData.studentName.trim()) {
      setError('Project title and student name are required.');
      return;
    }

    try {
      if (editingId) {
        await updateProject(editingId, formData);
        setMessage('Project updated successfully.');
      } else {
        await addProject(formData);
        setMessage('Project added successfully.');
      }
      clearForm();
      await loadProjects();
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'Could not save the project.'));
    }
  };

  const startEditing = (project) => {
    setEditingId(project.id);
    setFormData({
      projectTitle: project.projectTitle || '',
      studentName: project.studentName || '',
      description: project.description || '',
      guideName: project.guideName || '',
    });
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await deleteProject(id);
      setMessage('Project deleted successfully.');
      setError('');
      await loadProjects();
    } catch (requestError) {
      setError(getErrorMessage(requestError, 'Could not delete the project.'));
    }
  };

  return (
    <main className="page">
      <div className="container">
        <header>
          <h1>Mini Project Idea Register</h1>
          <p>Manage and Track Student Project Ideas</p>
        </header>

        <section className="form-section">
          <h2>{editingId ? 'Edit Project' : 'Add Project'}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="projectTitle">Project Title</label>
            <input
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
            />

            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Short Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />

            <label htmlFor="guideName">Guide Name</label>
            <input
              id="guideName"
              name="guideName"
              value={formData.guideName}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button type="submit">
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" className="secondary" onClick={clearForm}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
          {message && <p className="message success">{message}</p>}
          {error && <p className="message error">{error}</p>}
        </section>

        <section>
          <h2>All Projects</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Title</th>
                  <th>Student Name</th>
                  <th>Description</th>
                  <th>Guide Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>{project.projectTitle}</td>
                      <td>{project.studentName}</td>
                      <td>{project.description || '-'}</td>
                      <td>{project.guideName || '-'}</td>
                      <td className="actions">
                        <button type="button" onClick={() => startEditing(project)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => handleDelete(project.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function getErrorMessage(requestError, fallback) {
  return requestError.response?.data?.error
    || requestError.response?.data?.message
    || fallback;
}

export default App;
