import fs from 'fs';
import path from 'path';
import TurndownService from "turndown";


function createDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Error creating directory at ${dirPath}:`, err);
                reject(err);
            } else {
                console.log(`Directory created at ${dirPath}`);
                resolve();
            }
        });
    });
}

function createFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

const fileCreationHandler = (codeSnippet, lang) => {
    const snippets = {
        'C++': {
            code: `#include <bits/stdc++.h>
using namespace std;

${codeSnippet}

int main() {
    Solution solution;
    return 0;
}`,
            ext: 'cpp',
        },
        'Python3': {
            code: codeSnippet,
            ext: 'py',
        },
        'JavaScript': {
            code: codeSnippet,
            ext: 'js',
        },
        'Java': {
            code: `
${codeSnippet}

public class Main {
    public static void main(String[] args) {
        
    }
}`,
            ext: 'java',
        },
        'C': {
            code: `#include <stdio.h>

${codeSnippet}

int main() {
    return 0;
}`,
            ext: 'c',
        },
    }

    return snippets[lang];
};

async function createFilesFromData(data, dirPath, lang = "Python3") {
    await createDirectory(dirPath);

    // const cppFilePath = path.join(dirPath, 'solution.cpp');
    const mdFilePath = path.join(dirPath, 'question.md');

    const codeSnippet = data.question.codeSnippets.find((snippet) => snippet.lang === lang).code;
    const snippet = fileCreationHandler(codeSnippet, lang);
    const codeFilePath = path.join(dirPath, `solution.${snippet.ext}`);

    const turndownService = new TurndownService();

    const markdown = turndownService.turndown(data.question.content);

    const mdCode = `
                < style >
* {
                    font- family: "Plus Jakarta Sans", sans- serif;
    padding: 0;
    margin: 0;
    box - sizing: border - box;
}
.diff{
    background: #3a3f4b;
    padding: 5px;
    width: max - content;
    border - radius: 5px;
    font - size: 12px;
    font - family: "Plus Jakarta Sans", sans - serif;
    font - weight: 700;
}
</style >

# ${data.question.title}

<div style="display: flex; justify-content: space-between; align-items: center">
<div class="diff" style="color: ${data.question.difficulty === "Medium" ? '#fac31d' : data.question.difficulty === "Hard" ? '#ff375f' : '#46c6c2'};padding: 2px; background-color: '#3a3f4b'; border-radius: 5px;">${data.question.difficulty}</div>
<br>
${data.question.topicTags.map((tag) => `<div class="diff" style="color: #46c6c2">${tag.name}</div>`).join('\n')}
</div>

---

    ${markdown}
`;

    await createFile(codeFilePath, snippet.code);
    await createFile(mdFilePath, mdCode);
}

export default createFilesFromData;