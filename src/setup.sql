CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    logo_filename VARCHAR(255)
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers',  'A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png');

SELECT * FROM organization;

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(id),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    project_date DATE NOT NULL
);


-- ============================================
-- 2. Insert service projects
-- ============================================

INSERT INTO projects (
    organization_id,
    title,
    description,
    location,
    project_date
)
SELECT
    o.id,
    p.title,
    p.description,
    p.location,
    p.project_date
FROM (
    VALUES
        -- BrightFuture Builders
        (
            'BrightFuture Builders',
            'School Supply Drive',
            'Collect and distribute school supplies to local students.',
            'Central Community Center',
            DATE '2026-09-20'
        ),
        (
            'BrightFuture Builders',
            'Youth Skills Workshop',
            'Teach practical skills and career preparation to young people.',
            'BrightFuture Learning Hub',
            DATE '2026-10-04'
        ),
        (
            'BrightFuture Builders',
            'Park Equipment Repair',
            'Repair benches, signs, and playground equipment in the park.',
            'Riverside Park',
            DATE '2026-10-18'
        ),
        (
            'BrightFuture Builders',
            'Senior Home Repairs',
            'Complete minor repairs and safety improvements for seniors.',
            'Northside Neighborhood',
            DATE '2026-11-01'
        ),
        (
            'BrightFuture Builders',
            'Winter Shelter Support',
            'Prepare supplies and facilities for the winter shelter program.',
            'Hope Street Shelter',
            DATE '2026-11-15'
        ),

        -- GreenHarvest Growers
        (
            'GreenHarvest Growers',
            'Community Garden Setup',
            'Prepare garden beds and plant vegetables for the community.',
            'Westside Community Garden',
            DATE '2026-09-27'
        ),
        (
            'GreenHarvest Growers',
            'Food Bank Harvest',
            'Harvest and deliver fresh produce to the local food bank.',
            'GreenHarvest Farm',
            DATE '2026-10-11'
        ),
        (
            'GreenHarvest Growers',
            'Compost Workshop',
            'Teach residents how to create and maintain home compost systems.',
            'Maple Recreation Center',
            DATE '2026-10-25'
        ),
        (
            'GreenHarvest Growers',
            'Tree Planting Day',
            'Plant native trees to improve shade and local biodiversity.',
            'Eastview Park',
            DATE '2026-11-08'
        ),
        (
            'GreenHarvest Growers',
            'Harvest Celebration',
            'Celebrate the growing season with food, education, and activities.',
            'Farmers Market Plaza',
            DATE '2026-11-22'
        ),

        -- UnityServe Volunteers
        (
            'UnityServe Volunteers',
            'Neighborhood Cleanup',
            'Remove litter and improve public spaces across the neighborhood.',
            'Oak Street District',
            DATE '2026-09-21'
        ),
        (
            'UnityServe Volunteers',
            'Meal Service Project',
            'Prepare and serve meals for families in need.',
            'UnityServe Kitchen',
            DATE '2026-10-05'
        ),
        (
            'UnityServe Volunteers',
            'Clothing Donation Drive',
            'Collect and organize clothing donations for local families.',
            'UnityServe Community Hall',
            DATE '2026-10-19'
        ),
        (
            'UnityServe Volunteers',
            'Blood Donation Event',
            'Coordinate a community blood donation event with local clinics.',
            'UnityServe Community Hall',
            DATE '2026-11-02'
        ),
        (
            'UnityServe Volunteers',
            'Holiday Gift Program',
            'Collect and distribute holiday gifts to children in need.',
            'Downtown Service Center',
            DATE '2026-12-06'
        )
) AS p(
    organization_name,
    title,
    description,
    location,
    project_date
)
JOIN organization AS o
    ON o.name = p.organization_name;


-- ============================================
-- 3. Verify the inserted data
-- ============================================

SELECT
    p.id,
    p.organization_id,
    o.name AS organization_name,
    p.title,
    p.description,
    p.location,
    p.project_date
FROM projects AS p
JOIN organization AS o
    ON p.organization_id = o.id
ORDER BY p.id;

INSERT INTO projects (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
    -- Organization 10
    (
        10,
        'School Supply Drive',
        'Collect and distribute school supplies to local students.',
        'Central Community Center',
        '2026-09-20'
    ),
    (
        10,
        'Youth Skills Workshop',
        'Teach practical skills and career preparation to young people.',
        'Learning Hub',
        '2026-10-04'
    ),
    (
        10,
        'Park Equipment Repair',
        'Repair benches, signs, and playground equipment in the park.',
        'Riverside Park',
        '2026-10-18'
    ),
    (
        10,
        'Senior Home Repairs',
        'Complete minor repairs and safety improvements for seniors.',
        'Northside Neighborhood',
        '2026-11-01'
    ),
    (
        10,
        'Winter Shelter Support',
        'Prepare supplies and facilities for the winter shelter program.',
        'Hope Street Shelter',
        '2026-11-15'
    ),

    -- Organization 11
    (
        11,
        'Community Garden Setup',
        'Prepare garden beds and plant vegetables for the community.',
        'Westside Community Garden',
        '2026-09-27'
    ),
    (
        11,
        'Food Bank Harvest',
        'Harvest and deliver fresh produce to the local food bank.',
        'Community Farm',
        '2026-10-11'
    ),
    (
        11,
        'Compost Workshop',
        'Teach residents how to create and maintain home compost systems.',
        'Maple Recreation Center',
        '2026-10-25'
    ),
    (
        11,
        'Tree Planting Day',
        'Plant native trees to improve shade and local biodiversity.',
        'Eastview Park',
        '2026-11-08'
    ),
    (
        11,
        'Harvest Celebration',
        'Celebrate the growing season with food, education, and activities.',
        'Farmers Market Plaza',
        '2026-11-22'
    ),

    -- Organization 12
    (
        12,
        'Neighborhood Cleanup',
        'Remove litter and improve public spaces across the neighborhood.',
        'Oak Street District',
        '2026-09-21'
    ),
    (
        12,
        'Meal Service Project',
        'Prepare and serve meals for families in need.',
        'Community Kitchen',
        '2026-10-05'
    ),
    (
        12,
        'Clothing Donation Drive',
        'Collect and organize clothing donations for local families.',
        'Community Hall',
        '2026-10-19'
    ),
    (
        12,
        'Blood Donation Event',
        'Coordinate a community blood donation event with local clinics.',
        'Community Hall',
        '2026-11-02'
    ),
    (
        12,
        'Holiday Gift Program',
        'Collect and distribute holiday gifts to children in need.',
        'Downtown Service Center',
        '2026-12-06'
    );

	SELECT *
FROM projects
ORDER BY project_id;

SELECT
    p.project_id,
    p.organization_id,
    p.title,
    p.description,
    p.location,
    p.project_date
FROM projects AS p
ORDER BY p.organization_id, p.project_id;

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT project_categories_project_fk
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT project_categories_category_fk
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

INSERT INTO categories (name)
VALUES
    ('Education'),
    ('Environment'),
    ('Community Service'),
    ('Health and Wellness'),
    ('Food and Agriculture'),
    ('Community Development');

INSERT INTO project_categories (project_id, category_id)
VALUES
    -- Projects 16-20 | Organization 10
    (16, 1),
    (17, 1),
    (18, 2),
    (19, 6),
    (20, 3),

    -- Projects 21-25 | Organization 11
    (21, 2),
    (22, 5),
    (23, 2),
    (24, 2),
    (25, 5),

    -- Projects 26-30 | Organization 12
    (26, 3),
    (27, 3),
    (28, 4),
    (29, 4),
    (30, 3),

    -- Projects 31-35 | Organization 10
    (31, 2),
    (32, 3),
    (33, 1),
    (34, 6),
    (35, 4),

    -- Projects 36-40 | Organization 11
    (36, 5),
    (37, 2),
    (38, 3),
    (39, 5),
    (40, 2),

    -- Projects 41-45 | Organization 12
    (41, 3),
    (42, 4),
    (43, 3),
    (44, 4),
    (45, 3);

SELECT
    p.project_id,
    p.organization_id,
    p.title,
    c.name AS category
FROM projects AS p
JOIN project_categories AS pc
    ON p.project_id = pc.project_id
JOIN categories AS c
    ON pc.category_id = c.category_id
ORDER BY p.project_id;

SELECT
    p.project_id,
    p.title
FROM projects AS p
LEFT JOIN project_categories AS pc
    ON p.project_id = pc.project_id
WHERE pc.project_id IS NULL;