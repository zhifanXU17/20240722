'use client';
import { useRef, useState, useCallback, memo } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { PDFDocument, degrees } from 'pdf-lib';
import microtip from 'microtip/microtip.css';
import Loading from './Loading';
import PdfPage from './PdfPage';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function RotatePdf() {
  const [file, setFile] = useState(null);
  const [pageRotations, setPageRotations] = useState([]);
  const [pageWidth, setPageWidth] = useState(200);
  const fileName = useRef('');

  const handleUpload = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      fileName.current = e.target.files[0].name;
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageRotations([...Array(numPages).fill(0)]);
  };

  const changeRotation = useCallback(
    (page, rotation) => {
      const result = [...pageRotations];
      result[page] = rotation;
      setPageRotations([...result]);
    },
    [pageRotations, setPageRotations]
  );

  const handleRotateAllPages = () => {
    const result = [];
    for (
      let index = 0;
      index < pageRotations.length;
      index++
    ) {
      let item = pageRotations[index];
      if (item + 90 > 360) {
        item = 90;
      } else {
        item += 90;
      }
      result.push(item);
    }
    setPageRotations([...result]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPageRotations([]);
    fileName.current = null;
  };

  const handleZoomIn = () => {
    setPageWidth((prev) => (prev += 50));
  };

  const handleZoomOut = () => {
    setPageWidth((prev) => (prev -= 50));
  };

  const downloadFile = async () => {
    const buff = await file.arrayBuffer();
    const x = new Uint8Array(buff);
    const downloadedPdf = await PDFDocument.load(x);
    const pages = downloadedPdf.getPages();
    for (let index = 0; index < pages.length; index++) {
      const page = pages[index];
      page.setRotation(degrees(pageRotations[index]));
    }
    const pdfBytes = await downloadedPdf.save();
    return pdfBytes;
  };

  const handleDownload = async () => {
    const link = document.createElement('a');
    const pdfBytes = await downloadFile();
    const pdfBlob = new Blob([pdfBytes], {
      type: 'application/pdf',
    });
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = fileName.current;
    link.target = '_blank';
    link.click();
    link.remove();
  };

  if (file === null) {
    return (
      <div className='w-full flex justify-center'>
        <div className='h-[350px] relative text-center w-[275px]'>
          <input
            id='input-file-upload'
            className='cursor-pointer hidden'
            onChange={handleUpload}
            type='file'
            accept='.pdf'
          />
          <label
            className='h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300'
            htmlFor='input-file-upload'>
            <div className='cursor-pointer flex flex-col items-center space-y-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-8 h-8'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'></path>
              </svg>
              <p className='pointer-events-none font-medium text-sm leading-6 pointer opacity-75'>
                Click to upload or drag and drop
              </p>
            </div>
          </label>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className='flex justify-center items-center space-x-3'>
          <button
            onClick={handleRotateAllPages}
            className='flex justify-center items-center appearance-none relative cursor-pointer text-base leading-tight text-center whitespace-nowrap m-0 px-3 py-2.5 text-white bg-[#ff612f] font-medium rounded w-auto shadow'>
            Rotate all
          </button>
          <button
            onClick={handleRemoveFile}
            className='flex justify-center items-center appearance-none relative cursor-pointer text-base leading-tight text-center whitespace-nowrap m-0 px-3 py-2.5 text-white font-medium rounded w-auto bg-gray-800 shadow'
            aria-label='Remove this PDF and select a new one'
            data-microtip-position='top'
            role='tooltip'>
            Remove PDF
          </button>
          <button
            disabled={pageWidth === 500}
            onClick={handleZoomIn}
            className='shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 bg-white'
            aria-label='Zoom in'
            data-microtip-position='top'
            role='tooltip'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6'></path>
            </svg>
          </button>
          <button
            disabled={pageWidth === 100}
            onClick={handleZoomOut}
            className='shadow rounded-full p-2 flex items-center justify-center hover:scale-105 grow-0 shrink-0 disabled:opacity-50 bg-white'
            aria-label='Zoom out'
            data-microtip-position='top'
            role='tooltip'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6'></path>
            </svg>
          </button>
        </div>

        <Document
          file={file}
          loading={<Loading />}
          onLoadSuccess={onDocumentLoadSuccess}
          className='flex flex-wrap justify-center'>
          {pageRotations.map((rotation, index) => (
            <PdfPage
              pageWidth={pageWidth}
              index={index}
              rotation={rotation}
              changeRotation={changeRotation}
              key={`page_${index + 1}`}
            />
          ))}
        </Document>

        <div className='flex flex-col justify-center items-center space-y-3'>
          <button
            onClick={handleDownload}
            className='flex justify-center items-center appearance-none relative cursor-pointer text-base leading-tight text-center whitespace-nowrap m-0 px-3 py-2.5 text-white bg-[#ff612f] font-medium rounded w-auto shadow'
            aria-label='Split and download PDF'
            data-microtip-position='top'
            role='tooltip'>
            Download
          </button>
        </div>
      </>
    );
  }
}

export default memo(RotatePdf);
