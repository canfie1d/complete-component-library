import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// TODO https://github.com/onurzorluer/react-image-file-resizer

const FileUpload = (props) => {
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    fileRejections.forEach((file) => {
      props.handleError(file.errors[0]);
    });

    acceptedFiles.forEach((file) => {
      if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        props.handleError({
          type: 'unsupported_file_type',
          message:
            'This type of file is not supported. Upload a .jpeg, .jpg, .png or .pdf',
        });
      } else {
        props.handleUpload(file);
      }
    });
  }, []); // eslint-disable-line

  const { getRootProps, getInputProps } = useDropzone({
    accept: props.acceptedFileTypes,
    maxSize: 20000000,
    multiple: false,
    onDrop,
  });

  return (
    <div style={props.style} {...getRootProps()}>
      <input {...getInputProps()} />
      {props.children}
    </div>
  );
};

FileUpload.defaultProps = {
  acceptedFiles: 'image/jpeg,image/png,image/gif,image/jpg,application/pdf',
};

export default FileUpload;
