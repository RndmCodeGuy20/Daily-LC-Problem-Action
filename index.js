import { graphqlHelper } from "./helpers/graphqlHelper.js";
import createFilesFromData from "./helpers/fileHelper.js";

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

const main = async () => {
    let data = await graphqlHelper.getProblem(query);
    data = data.activeDailyCodingChallengeQuestion;
    // console.log(data);

    const dateData = data.date.split('-');
    const date = new Date(dateData[0], dateData[1] - 1, dateData[2]);
    const { month, year } = { month: date.toLocaleString('default', { month: 'long' }), year: date.getFullYear() };

    const dirPath = `./Daily Problems/${month} ${year}/${data.question.frontendQuestionId}. ${data.question.title}/`;

    await createFilesFromData(data, dirPath);
};

await main();