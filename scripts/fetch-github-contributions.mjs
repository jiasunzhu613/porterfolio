import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const username = process.env.GITHUB_ACTIVITY_USERNAME ?? "jiasunzhu613";
const token = process.env.GITHUB_ACTIVITY_TOKEN;
const outputPath = resolve(
  process.env.GITHUB_ACTIVITY_OUTPUT ?? "site/data/github.json",
);

if (!token) {
  throw new Error("GITHUB_ACTIVITY_TOKEN is required");
}

const query = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "porterfolio-contribution-calendar",
  },
  body: JSON.stringify({ query, variables: { login: username } }),
});

if (!response.ok) {
  throw new Error(
    `GitHub GraphQL request failed (${response.status}): ${await response.text()}`,
  );
}

const payload = await response.json();
if (payload.errors?.length) {
  throw new Error(`GitHub GraphQL error: ${JSON.stringify(payload.errors)}`);
}

const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
if (!calendar) {
  throw new Error(`GitHub user not found or contribution data unavailable: ${username}`);
}

const days = calendar.weeks.flatMap((week) => week.contributionDays);
const data = {
  username,
  totalContributions: calendar.totalContributions,
  from: days.at(0)?.date ?? null,
  to: days.at(-1)?.date ?? null,
  weeks: calendar.weeks,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(
  `Wrote ${days.length} contribution days for ${username} to ${outputPath}`,
);
