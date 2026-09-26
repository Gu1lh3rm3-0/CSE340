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

export {
    showProjectsPage,
    showProjectDetailsPage
};