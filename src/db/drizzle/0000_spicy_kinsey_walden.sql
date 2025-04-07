CREATE TABLE "riot_api_key" (
	"id" serial PRIMARY KEY NOT NULL,
	"api_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone
);
