const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, location, date
        FROM project
        ORDER BY date;
    `;
    const result = await db.query(query);
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (numberOfprojects) => {

    const query = `SELECT
    p.project_id,
    p.title,
    p.description,
    p.project_date,
    p.location,
    p.organization_id,
    o.organization_name AS organization_name
    FROM projects p
    JOIN organizations o
    ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date 
    ASC LIMIT $1;`;

    const queryParams = [numberOfprojects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
      const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id,
            o.organization_name AS organization_name
            FROM projects p
            JOIN organizations o
            ON p.organization_id = o.organization_id
            WHERE p.project_id = $1
      `;
      
      const queryParams = [id];
      const result = await db.query(query, queryParams);

      return result.rows[0]; //result.rows is an array so we include [0] at the end to get the only item inside
};


const updateProject = async (projectId, title, description, location, project_date, organization_id) => {
    const query = `
      UPDATE projects
      SET
      title = $2, description = $3, location = $4, project_date  = $5, organization_id = $6
      WHERE project_id = $1
      RETURNING project_id
    `;

    const queryParams = [projectId, title, description, location, project_date, organization_id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, updateProject };
