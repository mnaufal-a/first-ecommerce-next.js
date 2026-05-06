"use client"

import { UploadButton } from "@uploadthing/react"

export default function ImageUpload({ onChange }) {
    return (
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                onChange(res[0].url);
            }}
            onUploadError={(err) => {
                alert("upload Gagal!");
                console.error(err);
            }}
        />
    )
}