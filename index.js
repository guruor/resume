import { promises as fs } from "node:fs";
import path from "node:path";
import * as theme from "jsonresume-theme-stackoverflow";
import puppeteer from "puppeteer";
import { render } from "resumed";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import yaml from "yaml";

const RELEASE_DIR = path.join(".", "release");

async function createReleaseDir() {
  await fs.mkdir(RELEASE_DIR, { recursive: true });
}

async function convertYamlToJson() {
  await createReleaseDir();
  const yamlContent = await fs.readFile(path.join(".", "resume.yaml"), "utf-8");
  const jsonContent = yaml.parse(yamlContent);
  await fs.writeFile(
    path.join(RELEASE_DIR, "resume.json"),
    JSON.stringify(jsonContent, null, 2),
  );
  console.log("Converted YAML to JSON");
}

async function generateHtml() {
  await convertYamlToJson();
  const resume = JSON.parse(
    await fs.readFile(path.join(RELEASE_DIR, "resume.json"), "utf-8"),
  );
  const html = await render(resume, theme);
  await fs.writeFile(path.join(RELEASE_DIR, "resume.html"), html);
  console.log("Generated HTML from JSON");
}

async function generatePdf() {
  await generateHtml();
  const html = await fs.readFile(
    path.join(RELEASE_DIR, "resume.html"),
    "utf-8",
  );
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
    ignoreDefaultArgs: ["--disable-extensions"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: path.join(RELEASE_DIR, "resume.pdf"),
    format: "a4",
    printBackground: true,
  });
  await browser.close();
  console.log("Generated PDF from HTML");
}

const argv = yargs(hideBin(process.argv)).argv;

if (argv.json) {
  convertYamlToJson();
} else if (argv.html) {
  generateHtml();
} else if (argv.pdf) {
  generatePdf();
}
