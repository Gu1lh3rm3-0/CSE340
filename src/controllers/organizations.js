import {
    getAllOrganizations,
    getOrganizationDetails
} from '../models/organizations.js';

import {
    getProjectsByOrganizationId
} from '../models/projects.js';

const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', {
        title,
        organizations
    });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;

    try {
        const organizationDetails =
            await getOrganizationDetails(organizationId);

        if (!organizationDetails) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found'
            });
        }

        const projects =
            await getProjectsByOrganizationId(organizationId);

        const title = 'Organization Details';

        res.render('organization', {
            title,
            organizationDetails,
            projects
        });
    } catch (error) {
        console.error('Error getting organization details:', error);

        res.status(500).render('errors/500', {
            title: 'Server Error',
            error: error.message,
            stack: error.stack,
            NODE_ENV: process.env.NODE_ENV
        });
    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};