import saaslyLogger from "./pkg/src/index";
import { faker } from "@faker-js/faker";

let n = 1;
(async () => {
  async function go() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    saaslyLogger({
      apiKey: "YOUR_API_KEY",
      source: faker.database.engine(),
    });

    console.log(`#269111743207 username: ${faker.internet.userName()} ${n++}`);
    console.error(`#27014143821 failed  ${faker.internet.userName()} ${n++}`);
    console.warn(`#27014143825 hi from w ${faker.internet.userName()} ${n++}`);
    console.debug(`#27014143829 hi from d ${faker.internet.userName()} ${n++}`);
    console.info(`#27014143832 hi from i ${faker.internet.userName()} ${n++}`);
    await go();
  }

  await go();
})();
