import React, { useContext, useEffect, useState } from 'react';
import { checkCredits } from '../utils/firebaseUtils';
import { Link } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';

const FileUpload = ({ handleFileChange, handleUpload, progress, msg, fileSelected }) => {
  const [ creditCheck, setCreditCheck ] = useState(true);
  const user = useContext(UserContext);

  const onFileChange = async (event) => {
    await handleFileChange(event);
    handleUpload();
  };

  

  useEffect(() => {
    const execute_check = async () => {
      if (!user) return;
      setCreditCheck((await checkCredits(user, 0.1)));
    }

    execute_check();
  }, [user])
  

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen p-28 bg-gray-900">
      <div className="flex col items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              CSV, TSV, or XLSX (max. 10 MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div class='p-6 flex flex-col w-1/4 overflow-visible relative'>
      <button disabled={!fileSelected && !creditCheck} onClick={handleUpload} type="button" class={`text-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
          !fileSelected && !creditCheck ? 'opacity-50 cursor-not-allowed' : ''
        }`}>Upload</button>
        <div className={'text-white absolute -bottom-1/2' + (creditCheck ? " collapse" : "")}>
        You do not have sufficient credits to perform this task. Please head over to the <Link to={"/pricing"}>pricing page</Link> to buy more.
      </div>
      </div>
    </div>

    // <div className="flex flex-col items-center p-10 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-xl">
    //   <h1>Drag, drop, or upload file</h1>
    //   <label htmlFor="file-upload" className="custom-file-upload cursor-pointer">
    //     Custom Upload
    //   </label>
    //   <input id="file-upload" className="hidden" onChange={handleFileChange} type="file" />
    //   <button className="bg-gray-800 text-white font-bold p-2 rounded hover:bg-gray-600 mt-4" onClick={handleUpload}>
    //     Upload here
    //   </button>
    //   {progress.started && <progress className="w-full" max="100" value={progress.percentageCompleted}></progress>}
    //   {msg && <span>{msg}</span>}
    // </div>
  );
};

export default FileUpload;
