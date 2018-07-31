import React from 'react';
import Dropzone from 'react-dropzone'

const FileUploads = ({ children, disableClick }) => (
    <Dropzone className="ignore" onDrop={() => console.log("file dropped")} disableClick={disableClick}>
        {children}
    </Dropzone>
);
export default FileUploads