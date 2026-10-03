import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation,
} from './controllers/projects.js';

import {
    showCategoriesPage,
    categoryDetails,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    processEditOrganizationForm,
    showEditOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showNewOrganizationForm
} from './controllers/organizations.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);

router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage, showEditOrganizationForm);

router.get('/organization/new', showNewOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.post('/organization/new', organizationValidation, processNewOrganizationForm);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', showCategoriesPage);

router.get('/new-category', showNewCategoryForm);

router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

router.get('/category/:id', categoryDetails);

router.get('/edit-category/:id', showEditCategoryForm);

router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);

router.get('/edit-project/:id', showEditProjectForm);

router.post('/edit-project/:id', processEditProjectForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

router.get('/test-error', testErrorPage);


export default router;