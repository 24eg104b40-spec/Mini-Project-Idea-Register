package com.example.projectregister.service;

import com.example.projectregister.entity.Project;
import com.example.projectregister.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project updateProject(Long id, Project projectDetails) {
        Project project = getProjectById(id);
        project.setProjectTitle(projectDetails.getProjectTitle());
        project.setStudentName(projectDetails.getStudentName());
        project.setDescription(projectDetails.getDescription());
        project.setGuideName(projectDetails.getGuideName());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
