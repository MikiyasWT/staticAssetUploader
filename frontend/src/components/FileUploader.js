import React, {useRef} from 'react'
import styled from 'styled-components'

const FileUploader = ({onFileSelect}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1024)
          onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else onFileSelectSuccess(file);
      };

    return (
        <InputFiled>
            <input type="file" onChange={handleFileInput} />
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" />
        </InputFiled>
    )
}

export default FileUploader;


const InputFiled = styled.div`
max-width:60%;
border-color:gray;
height:4rem;
background:blue;
`;
