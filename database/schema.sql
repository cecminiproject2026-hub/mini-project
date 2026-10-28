CREATE DATABASE IF NOT EXISTS student_research CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_research;
CREATE TABLE IF NOT EXISTS projects (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(500) NOT NULL, description TEXT NOT NULL,
 domain VARCHAR(120), technologies JSON, project_level VARCHAR(80), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS research_papers (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, title TEXT NOT NULL, abstract LONGTEXT, authors JSON, year INT,
 domain VARCHAR(120), keywords JSON, methodology TEXT, dataset TEXT, limitations TEXT,
 doi VARCHAR(255), url TEXT, source VARCHAR(80), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY unique_doi (doi)
);
CREATE TABLE IF NOT EXISTS project_comparisons (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, project_id BIGINT NOT NULL, paper_id BIGINT NOT NULL,
 similarity_score FLOAT, method_similarity FLOAT, dataset_similarity FLOAT, technology_similarity FLOAT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
 FOREIGN KEY(paper_id) REFERENCES research_papers(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS evaluations (
 id BIGINT AUTO_INCREMENT PRIMARY KEY, project_id BIGINT NOT NULL, novelty_score INT,
 innovation_score INT, feasibility_score INT, research_potential_score INT, impact_score INT,
 recommendations JSON, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);
