# 📄 Resume

**Automate your resume PDF generation from YAML and host it on GitHub Pages!**

This repository leverages the [resumed](https://github.com/rbardini/resumed) CLI tool to generate a resume from a [resume.yaml](./resume.yaml) file. We're using the `YAML` format, which is compatible with the [JSON Resume Schema](https://jsonresume.org/schema). The choice of `YAML` allows for greater flexibility and the inclusion of comments.

## 🚀 Getting Started

### Install Dependencies

First, install the necessary npm packages:

```sh
# Update the required theme in package.json
# Theme would be like jsonresume-theme-<themename>
# Look for themes here: https://www.npmjs.com/search?q=jsonresume-theme
npm i
```

### Generate Resume

To generate your resume in HTML and PDF formats, use the following commands:

```sh
# Generate HTML version of the resume
npm run to_html

# Generate PDF version of the resume
# Note: You might face issues with `puppeteer`, check the troubleshooting guide below
npm run to_pdf

# To specify the theme manually, use:
npm run to_json
npm install jsonresume-theme-elegant
npx resumed export -o ./release/resume.html --theme jsonresume-theme-elegant
```

## 🛠 Troubleshooting

If you encounter issues related to `libnss`, `libasound`, or other dependencies, try installing these packages:

```sh
sudo apt install libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
```

## 🎯 Future Plans

- **GitHub Workflows:** Automate the publishing of the static resume and PDF to keep your latest profile and PDF URLs updated across multiple platforms.
