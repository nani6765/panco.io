import fs from "fs-extra";
import path from "node:path";
import html from "remark-html";
import { remark } from "remark";
import matter from "gray-matter";

import blogConfig from "@/blog.config.json";
import getAllFiles from "@/function/getAllFiles";

const basePath = path.resolve();
const contentDir = path.join(basePath, blogConfig.contentDir);
const outputDir = path.join(basePath, blogConfig.generateDir);

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

async function buildMarkdownFiles() {
  const files = getAllFiles(contentDir);

  for (const file of files) {
    const fileContent = fs.readFileSync(file, "utf-8");
    const { data: metadata, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    const relativePath = path.relative(contentDir, file);
    const outputFilePath = path.join(
      outputDir,
      `${relativePath.replace(/\.md$/, ".json")}`
    );

    ensureDirectoryExistence(outputFilePath);

    const output = {
      metadata,
      contentHtml,
    };

    fs.writeFileSync(outputFilePath, JSON.stringify(output, null, 2));
  }
}

// 스크립트 실행
buildMarkdownFiles().catch((error) => {
  console.error(error);
  process.exit(1);
});
