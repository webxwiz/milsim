import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaPlus } from 'react-icons/fa'
import { RiCloseCircleFill } from 'react-icons/ri'
import { CiImageOn } from 'react-icons/ci';
import Image from 'next/image'

import styles from './ImageUploader.module.scss'  
import { ImageUploaderProps, UploadedImage } from './interface';

export const ImageUploader = ({ defaultImage, isSingle, isBigSingle, onSubmit }: ImageUploaderProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(defaultImage ? [defaultImage] as never : [] as UploadedImage[]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: UploadedImage[] = acceptedFiles.map((file) => ({
        file,
            preview: URL.createObjectURL(file),
        }));

        setUploadedImages((prevImages) => {
            if (isBigSingle || isSingle) {
                onSubmit([...newImages])
                return [...newImages]
            }

            onSubmit([...prevImages, ...newImages])
            return [...prevImages, ...newImages]
        });
    }, []);

  const removeImage = (indexToRemove: number) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
        'image/*': ['.png', '.jpg', '.jpeg', '.bmp', '.webp'],
    },
    onDrop,
    maxFiles: isSingle ? 1 : isBigSingle ? 1 : 10,
    multiple: isSingle ? false : isBigSingle ? false : true
  })

  return (
    <div className={styles.main}>
       {!isSingle && <div className={styles.content} {...getRootProps()}>
            <input
                {...getInputProps()}
                className={styles.fileInput}
            />
            <div className={styles.fileInput}></div>
            <div className={styles.addImage}>
                <FaPlus size={34} />
            </div>
        </div>}
        <div className={isSingle ? styles.singleImageBlock : styles.images}>
            {uploadedImages.map((image, index) => (
                <div key={index}>
                    {!isSingle && <div
                        className={styles.removeImage}
                        onClick={() => removeImage(index)}
                    >
                        <RiCloseCircleFill
                            size={29}
                            className={styles.removeIcon}
                        />
                    </div>}
                    <Image
                        src={image.preview}
                        alt={`Uploaded Image ${index}`}
                        width={279}
                        height={186}
                        className={isSingle ? styles.singleImage : styles.image}
                    />
                </div>
            ))}
            {isSingle && <div className={styles.singleAddImage} {...getRootProps()}>
                <input {...getInputProps()} />
                <CiImageOn size={30} />
                <p>{uploadedImages?.length ? 'New File' : 'Upload a File'}</p>
            </div>}
        </div>
    </div>
  )
}