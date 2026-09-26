import { organizationsPage } from './controllers/organizations.js';
import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

app.get('./organizations', organizationsPage);

const router = express.Router();

router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/project/:id', showProjectDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;