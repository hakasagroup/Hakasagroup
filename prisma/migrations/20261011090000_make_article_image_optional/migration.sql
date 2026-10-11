-- Allow articles to be published without an image.
-- SQLite requires recreating the table to change a NOT NULL constraint.
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "metaDesc" TEXT,
    "keywords" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT,
    CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "new_Article" ("id", "title", "slug", "category", "image", "content", "excerpt", "metaDesc", "keywords", "isPublished", "createdAt", "updatedAt", "authorId")
SELECT "id", "title", "slug", "category", "image", "content", "excerpt", "metaDesc", "keywords", "isPublished", "createdAt", "updatedAt", "authorId"
FROM "Article";

DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;