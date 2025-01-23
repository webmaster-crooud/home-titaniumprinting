import { IconFileTypePdf, IconX } from '@tabler/icons-react';
import Image from 'next/image';

type UploadedFileProps = {
    file: File | string; // File atau path file
    onRemove: () => void; // Fungsi untuk menghapus file
};

export const UploadedFile: React.FC<UploadedFileProps> = ({ file, onRemove }) => {
    const isImage = typeof file !== 'string' && file.type.startsWith('image/');
    const isPDF = typeof file !== 'string' && file.type === 'application/pdf';

    return (
        <div className="relative flex items-center justify-between p-3 border rounded-lg border-light-gray">
            <div className="">
                {/* Preview file */}
                {isImage && (
                    <Image
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="object-cover w-5 h-5 rounded-lg"
                        width={200}
                        height={200}
                        style={{ width: '3rem', height: 'auto', objectFit: 'contain' }}
                        priority
                    />
                )}
                {isPDF && (
                    <div className="flex items-center justify-start w-12 h-12 bg-gray-100 rounded-lg">
                        <IconFileTypePdf size={35} stroke={1.2} />
                    </div>
                )}

                {/* Judul file */}
                <span className="inline-block text-xs font-medium">
                    File: {typeof file === 'string' ? file : file.name}
                </span>
            </div>

            {/* Tombol hapus */}
            <button
                type="button"
                onClick={onRemove}
                className="absolute flex items-center justify-center p-1 text-white text-gray-500 transition-colors duration-300 rounded-full hover:text-danger top-2 right-2 bg-danger hover:bg-white"
            >
                <IconX size={16} stroke={2.5} />
            </button>
        </div>
    );
};

export default UploadedFile;
