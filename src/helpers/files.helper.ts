import fs from 'fs/promises';
import path from 'path';
import TurndownService from "turndown";
import { logger } from "#helpers";

interface ISnippet {
    code: string;
    ext: string;
}

interface IQuestion { 
    question: { 
        codeSnippets: any[]; 
        content: any; 
        title: any; 
        difficulty: string; 
        topicTags: any[];
    }; 
}

export class FileHelper {
    static async createDirectory(dirPath: string) {
        try {
            await fs.mkdir(dirPath, { recursive: true });
            logger.info(`Directory created at ${dirPath}`);
        } catch (err) {
            logger.error(`Error creating directory at ${dirPath}`, err);
            throw err;
        }
    }

    static async createFile(filePath: string, data: string) {
        try {
            await fs.writeFile(filePath, data, 'utf-8');
            logger.info(`File created: ${filePath}`);
        } catch (err) {
            logger.error(`Error writing file at ${filePath}`, err);
            throw err;
        }
    }

    static getCodeSnippet(codeSnippet: string, lang: string) {
        const snippets: Record<string, ISnippet> = {
            'C++': {
                code: `#include <bits/stdc++.h>\nusing namespace std;\n\n${codeSnippet}\n\nint main() {\n    Solution solution;\n    return 0;\n}`,
                ext: 'cpp',
            },
            'Python3': { code: codeSnippet, ext: 'py' },
            'JavaScript': { code: codeSnippet, ext: 'js' },
            'Java': {
                code: `${codeSnippet}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}`,
                ext: 'java',
            },
            'C': {
                code: `#include <stdio.h>\n\n${codeSnippet}\n\nint main() {\n    return 0;\n}`,
                ext: 'c',
            },
        };

        if (!snippets[lang]) {
            throw new Error(`Unsupported language: ${lang}`);
        }
        return snippets[lang];
    }

    static async createFilesFromData(data: IQuestion, dirPath: string, lang = "Python3") {
        if (!data || !data.question || !data.question.codeSnippets || !Array.isArray(data.question.codeSnippets)) {
            throw new Error("Invalid data format: Missing or incorrect question structure");
        }

        await this.createDirectory(dirPath);

        const snippetData = data.question.codeSnippets.find((snippet) => snippet.lang === lang);
        if (!snippetData) {
            throw new Error(`Code snippet for language '${lang}' not found.`);
        }

        const snippet = this.getCodeSnippet(snippetData.code, lang);
        const codeFilePath = path.join(dirPath, `solution.${snippet.ext}`);
        const mdFilePath = path.join(dirPath, 'question.md');

        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(data.question.content || "");

        const mdCode = `# ${data.question.title}\n\n` +
            `<div style="display: flex; justify-content: space-between; align-items: center">\n` +
            `<div style="color: ${data.question.difficulty === "Medium" ? '#fac31d' : data.question.difficulty === "Hard" ? '#ff375f' : '#46c6c2'};\n` +
            `padding: 2px; background-color: #3a3f4b; border-radius: 5px;">${data.question.difficulty}</div>\n` +
            `${data.question.topicTags.map((tag) => `<div style="color: #46c6c2">${tag.name}</div>`).join('\n')}\n</div>\n\n---\n\n${markdown}`;

        await Promise.all([
            this.createFile(codeFilePath, snippet.code),
            this.createFile(mdFilePath, mdCode)
        ]);
    }
}