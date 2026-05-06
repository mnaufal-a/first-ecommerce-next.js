import { createUploadthing, createRouteHandler } from "uploadthing/next"

const f = createUploadthing();

const fileRouter = {
    imageUploader : f({
        image: { maxFileSize: "4MB" },
    }).onUploadComplete(async ({ file }) => {
        return { url: file.url };
    }),
};

export const { GET, POST } = createRouteHandler({
    router: fileRouter,
});