import { graphqlHelper, FileHelper, logger } from "#helpers";
import { envConfig } from "#config";

interface ITopicTag {
    name: string;
  }
  
  interface ICodeSnippet {
    lang: string;
    code: string;
  }
  
  interface IQuestion {
    topicTags: ITopicTag[];
    difficulty: string;
    freqBar: number | null;
    frontendQuestionId: string;
    status: string | null;
    title: string;
    content: string;
    codeSnippets: ICodeSnippet[];
  }
  
  interface IDailyCodingChallengeQuestion {
    date: string;
    link: string;
    question: IQuestion;
  }
  
  interface IDailyChallengeData {
    activeDailyCodingChallengeQuestion: IDailyCodingChallengeQuestion;
  }

export class ProblemService {
    static async fetchDailyProblem() {
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

        const data: IDailyChallengeData = await graphqlHelper.getProblem(query) as IDailyChallengeData;
        logger.info(`Fetched daily problem from GraphQL, saving to file...`);
        return data.activeDailyCodingChallengeQuestion;
    }

    static async saveProblemToFile(data: IDailyCodingChallengeQuestion, lang = envConfig.DEFAULT_LANGUAGE) {
        const dateData = data.date.split('-');
        const date = new Date(Number(dateData[0]), Number(dateData[1]) - 1, Number(dateData[2]));
        const { month, year } = { month: date.toLocaleString('default', { month: 'long' }), year: date.getFullYear() };

        const dirPath = `./Daily Problems/${month} ${year}/${data.question.frontendQuestionId}. ${data.question.title}/`;

        await FileHelper.createFilesFromData(data, dirPath, lang);
    }
}