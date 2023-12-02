import { z } from "zod";

import { env } from "@/env/env.mjs";

export const folderDetailsUrl = `${env.NEXT_PUBLIC_OPENCLOUD_SERVER_URL}/v1/folder/get-details?folderId=`;
export const folderContentsUrl = `${env.NEXT_PUBLIC_OPENCLOUD_SERVER_URL}/v1/folder/get-contents?folderId=`;

export async function parseFolderDetails(fetchResponse: Response) {
    if (!fetchResponse.ok) {
        throw new Error("Failed to fetch data");
    }

    const parsedFolderDetails = getFolderDetailsSchema.safeParse(await fetchResponse.json());

    if (parsedFolderDetails.success === false) {
        throw new Error("Failed to parse data");
    }

    return parsedFolderDetails;
}

export async function parseFolderContents(fetchResponse: Response) {
    if (!fetchResponse.ok) {
        throw new Error("Failed to fetch data");
    }

    const parsedFolderContents = getFolderContentsSchema.safeParse(await fetchResponse.json());

    if (parsedFolderContents.success === false) {
        throw new Error("Failed to parse data");
    }

    return parsedFolderContents;
}

const getFolderDetailsSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    hierarchy: z
        .object({
            id: z.string(),
            name: z.string(),
            type: z.string(),
        })
        .array(),
});

const folderSchema = z.object({
    id: z.string(),
    folderName: z.string(),
});

const fileSchema = z.object({
    id: z.string(),
    fileName: z.string(),
});

const getFolderContentsSchema = z.object({
    id: z.string(),
    folders: folderSchema.array(),
    files: fileSchema.array(),
});
