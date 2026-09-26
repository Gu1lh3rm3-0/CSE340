import db from './db.js';

export async function getAllCategories() {
    try {
        const result = await db.query(
            'SELECT category_id, name FROM categories ORDER BY name'
        );

        return result.rows;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

export async function getAllCategories() {
    try {
        const result = await db.query(
            'SELECT category_id, name FROM categories ORDER BY name'
        );

        return result.rows;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}

// Get a single category by its ID
export async function getCategoryById(categoryId) {
    try {
        const result = await db.query(
            `SELECT category_id, name
             FROM categories
             WHERE category_id = $1`,
            [categoryId]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error getting category by ID:', error);
        throw error;
    }
}

// Get all categories for a given service project
export async function getCategoriesByProjectId(projectId) {
    try {
        const result = await db.query(
            `SELECT c.category_id, c.name
             FROM categories c
             JOIN project_categories pc
             ON c.category_id = pc.category_id
             WHERE pc.project_id = $1
             ORDER BY c.name`,
            [projectId]
        );

        return result.rows;
    } catch (error) {
        console.error('Error getting categories by project ID:', error);
        throw error;
    }
}

// Get all service projects for a given category
export async function getProjectsByCategoryId(categoryId) {
    try {
        const result = await db.query(
            `SELECT p.project_id,
                    p.title,
                    p.description,
                    p.project_date,
                    p.location,
                    p.organization_id
             FROM projects p
             JOIN project_categories pc
             ON p.project_id = pc.project_id
             WHERE pc.category_id = $1
             ORDER BY p.project_date`,
            [categoryId]
        );

        return result.rows;
    } catch (error) {
        console.error('Error getting projects by category ID:', error);
        throw error;
    }
}

