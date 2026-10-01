import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

import {
    getCategoriesByProjectId
} from '../models/categories.js';

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(5);
    const title = 'Upcoming Service Projects';

    res.render('projects', {
        title,
        projects
    });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    try {
        const projectDetails = await getProjectDetails(projectId);
        const categories = await getCategoriesByProjectId(projectId);

        if (!projectDetails) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found'
            });
        }

        const title = 'Service Project Details';

        res.render('project', {
            title,
            projectDetails,
            categories
        });
    } catch (error) {
        console.error('Error getting project details:', error);

        res.status(500).render('errors/500', {
            title: 'Server Error',
            error: error.message,
            stack: error.stack,
            NODE_ENV: process.env.NODE_ENV
        });
    }
};

const showEditProjectForm = async (req, res) => {
    const title = 'Edit Project';

    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    //format date to be passed in as value to date selector
    const date = projectDetails.project_date;

    const projectDate = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
    ].join('-');
    
    res.render('edit-project', {title, projectId, projectDetails, organizations, projectDate});
};

const processEditProjectForm = async (req, res) => {
    
    //if errors are found in the validation results
    const results = validationResult(req);
    if (results.isEmpty() == false) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
    
        // Redirect back to the edit project form
        return res.redirect(`/edit-project`);
    }
    else{
    const projectId = req.params.id;
    // Extract form data from req.body
    const {title, description, location, date, organization_id} = req.body;

    try {
        await updateProject(projectId, title, description, location, date, organization_id);
        req.flash('success', 'Project updated successfully');
        res.redirect(`/project/${projectId}`);
        }
        catch (error) {
            console.error('Error creating new project:', error);
            req.flash('error', 'There was an error creating the service project.');
            res.redirect(`/edit-project/${projectId}`);
        }
    }
    
};

export {
    showProjectsPage,
    showProjectDetailsPage
};