import { graphqlHelper } from "./helpers/graphqlHelper.js";
import createFilesFromData from "./helpers/fileHelper.js";
// const core = require('@actions/core');
import * as core from '@actions/core';


const query = `
query questionOfToday {
    activeDailyCodingChallengeQuestion {
        date
        link
        question {
            topicTags{
                name
            }
            difficulty
            freqBar
            frontendQuestionId: questionFrontendId
            status
            title
            content
            codeSnippets {
                lang
                code
            }
        }
    }
}`;

const getInputs = async () => {
    let inputs = core.getInput('lang_choice');

     if (inputs === ""){
         inputs = "C++";
     }

    return inputs;
};


const main = async () => {
    let data = await graphqlHelper.getProblem(query);
    data = data.activeDailyCodingChallengeQuestion;

    const dateData = data.date.split('-');
    const date = new Date(dateData[0], dateData[1] - 1, dateData[2]);
    const { month, year } = { month: date.toLocaleString('default', { month: 'long' }), year: date.getFullYear() };

    const dirPath = `./Daily Problems/${month} ${year}/${data.question.frontendQuestionId}. ${data.question.title}/`;

    const lang = await getInputs();

    await createFilesFromData(data, dirPath, lang);
};

await main();
