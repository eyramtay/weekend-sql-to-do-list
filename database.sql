CREATE TABLE "weekend-list" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (100) NOT NULL,
    "estimated_time" integer,
    "assigned_to" VARCHAR (30) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (200) NOT NULL,
);

DROP TABLE "weekend-list";

INSERT INTO "weekend-list"
    ("task", "assigned_to", "notes", "completed")

VALUES
    ()