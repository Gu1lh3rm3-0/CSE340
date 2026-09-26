// Import any needed model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

export async function categoryDetails(req, res) {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryById(categoryId);
        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        console.error('Error getting category details:', error);
        res.status(500).render('error', {
            title: 'Category Error',
            message: 'Unable to load category.'
        });
    }
}


// Export any controller functions
export { showCategoriesPage };