import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { registryComponents } from "../registry";
import { registryItemFileSchema } from "../registry/schema";

const REGISTRY_BASE_PATH = "src";
const PUBLIC_FOLDER_BASE_PATH = "public/registry";

type File = z.infer<typeof registryItemFileSchema>;
const FolderToComponentTypeMap = {
  block: "registry:block",
  components: "registry:component",
  hooks: "registry:hook",
  ui: "registry:ui",
  lib: "registry:lib"
};

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath); // Extract the directory path

  try {
    // Ensure the directory exists, recursively creating directories as needed
    await fs.mkdir(dir, { recursive: true });

    // Write the file
    await fs.writeFile(filePath, data, "utf-8");
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file`);
    console.error(error);
  }
}

const getComponentFiles = async (files: File[]) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      const filePath = `${REGISTRY_BASE_PATH}/${file}`;
      const fileContent = await fs.readFile(filePath, "utf-8");
      console.log("Build Registry:", file);
      return {
        type: FolderToComponentTypeMap[
          file.split("/")[0] as keyof typeof FolderToComponentTypeMap
        ],
        content: fileContent,
        path: file,
        target: file
      };
    }
  });
  const filesArray = await Promise.all(filesArrayPromises);

  return filesArray;
};

const main = async () => {
  // make a json file and put it in public folder
  for (let i = 0; i < registryComponents.length; i++) {
    const component = registryComponents[i];
    const files = component.files;
    if (!files) throw new Error("No files found for component");

    const filesArray = await getComponentFiles(files);

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(jsonPath, json);
    // console.log(json);
  }
};

main()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
  });
