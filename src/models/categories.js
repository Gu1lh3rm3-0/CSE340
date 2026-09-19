import pool from './db.js';

export async function getAllCategories() {
    try {
        const result = await pool.query(
            'SELECT category_id, name FROM categories ORDER BY name'
        );

        return result.rows;
    } catch (error) {
        console.error('Error getting categories:', error);
        throw error;
    }
}