import saaslyLogger from "./pkg";
import { faker } from "@faker-js/faker";

let n = 1;
(async () => {
  async function go() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    saaslyLogger({
      apiKey:
        "api-key-pfZ6TEKOSLz2MfaYcsfeB7FjTtOatc9yiFaE9Fy8hDcV7yfkVX1bsJ6ceedEwLpd",
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
