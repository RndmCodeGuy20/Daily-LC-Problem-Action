import * as core from '@actions/core';
import { ProblemService } from "#services";
import { envConfig } from "#config";

const getInputs = () => {
    const lang = core.getInput('lang_choice') || envConfig.DEFAULT_LANGUAGE;
    return lang;
};

const main = async () => {
    try {
        const lang = getInputs();
        const data = await ProblemService.fetchDailyProblem();
        await ProblemService.saveProblemToFile(data, lang);
    } catch (error) {
        console.error("Error in main execution:", error);
        process.exit(1);
    }
};

await main();