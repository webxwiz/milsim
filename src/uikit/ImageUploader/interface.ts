export interface ImageUploaderProps {
    isSingle?: boolean
    isBigSingle?: boolean
    onSubmit: (e: UploadedImage[]) => void
    defaultImage?: {
        preview: string
    }
}

export interface UploadedImage {
    file: File;
    preview: string;
}