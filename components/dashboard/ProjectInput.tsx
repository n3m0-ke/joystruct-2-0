'use client'
import React, { useRef } from 'react';

import '@/app/projectInput.css';


interface Image {
    name: string;
    url: string;
}

interface ImageInputProps {
    images: Image[];
    setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const ImageInput: React.FC<ImageInputProps> = ({ images, setImages }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const selectFiles = () => {
        fileInputRef.current?.click();
    };

    const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const newImages: Image[] = Array.from(files).map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const deleteImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="card">
            <div className="drag-area">
                <>
                    <span className="select" role="button" onClick={selectFiles}>
                        Browse
                    </span>
                </>
                <input
                    type="file"
                    name="file"
                    multiple
                    className="file"
                    ref={fileInputRef}
                    onChange={onFileSelect}
                />
            </div>
            <div className="container">
                {images.map((image, index) => (
                    <div className="image" key={index}>
                        <span className="delete" onClick={() => deleteImage(index)}>
                            &times;
                        </span>
                        <img src={image.url} alt={image.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageInput;