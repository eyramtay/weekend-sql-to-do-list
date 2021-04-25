CREATE TABLE "weekend-list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (100) NOT NULL,
    "estimated_time" integer,
    "assigned_to" VARCHAR (30) NOT NULL,
    "notes" VARCHAR (200) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE,
);

DROP TABLE "weekend-list";

INSERT INTO "weekend-list"
    ("task", "estimated_time", "assigned_to", "notes", "completed")

VALUES
    ('Dishes', 45, 'Jeff Bezos', 'Do not forget the big pans', TRUE),
    ('Laundry', 30, 'Bill Gates', 'Air dry the sweaters', FALSE),
    ('Mow the lawn', 90, 'Elon Musk', 'Make sure to bag the trimmings', FALSE);

SELECT * FROM "weekend-list";