import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', {
        title
    });
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {
        const categoryId = await createCategory(name);

        req.flash('success', 'Category added successfully!');

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error creating category:', error);

        res.status(500).render('errors/500', {
            title: 'Server Error',
            error: error.message,
            stack: error.stack,
            NODE_ENV: process.env.NODE_ENV
        });
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found'
            });
        }

        const title = 'Edit Category';

        res.render('edit-category', {
            title,
            category
        });
    } catch (error) {
        console.error('Error loading edit category form:', error);

        res.status(500).render('errors/500', {
            title: 'Server Error',
            error: error.message,
            stack: error.stack,
            NODE_ENV: process.env.NODE_ENV
        });
    }
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    try {
        await updateCategory(categoryId, name);

        req.flash('success', 'Category updated successfully!');

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error updating category:', error);

        res.status(500).render('errors/500', {
            title: 'Server Error',
            error: error.message,
            stack: error.stack,
            NODE_ENV: process.env.NODE_ENV
        });
    }
};

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';

    res.render('categories', {
        title,
        categories
    });
};

const categoryDetails = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found'
            });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        const title = category.name;

        res.render('category', {
            title,
            category,
            projects
        });
    } catch (error) {
        console.error('Error getting category details:', error);

        res.status(500).render('errors/500', {
            title: 'Server Error',
            error: error.message,
            stack: error.stack,
            NODE_ENV: process.env.NODE_ENV
        });
    }
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export {
    showCategoriesPage,
    categoryDetails,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};