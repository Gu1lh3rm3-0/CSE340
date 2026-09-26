import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

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

export {
    showCategoriesPage,
    categoryDetails
};