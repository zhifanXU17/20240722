'use client';
import { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, degrees } from 'pdf-lib';
import microtip from 'microtip/microtip.css';
import Loading from './Loading';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function RotatePdf() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const fileName = useRef('');
  const editFile = useRef(null);
  const [pageRotations, setPageRotations] = useState([]);
  const [pageWidth, setPageWidth] = useState(200);

  const handleUpload = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);

      let reader = new FileReader();
      reader.onload = function () {
        generatePdf(reader);
      };
      reader.readAsArrayBuffer(e.target.files[0]);

      fileName.current = e.target.files[0].name;
    }
  };

  const generatePdf = async (reader) => {
    const pdfDoc = await PDFDocument.load(reader.result);
    const pdfBytes = await pdfDoc.save();
    editFile.current = pdfBytes;
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageRotations([...Array(numPages).fill(0)]);
  };

  const handleRotatePage = (page) => {
    const result = [...pageRotations];
    if (result[page] === 360) {
      result[page] = 90;
    } else {
      result[page] += 90;
    }
    setPageRotations([...result]);
  };

  const handleRotateAllPages = () => {
    const result = [];

    for (const pageRotation of pageRotations) {
      let rotation = pageRotation;
      if (rotation === 360) {
        rotation = 90;
      } else {
        rotation += 90;
      }
      result.push(rotation);
    }

    setPageRotations([...result]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setNumPages(0);
    setPageRotations([]);
    fileName.current = null;
    editFile.current = null;
  };

  const handleZoomIn = () => {
    setPageWidth((prev) => prev + 50);
  };

  const handleZoomOut = () => {
    setPageWidth((prev) => prev - 50);
  };

  const downloadFile = async () => {
    const downloadedPdf = await PDFDocument.load(
      editFile.current
    );
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
          {Array.from(new Array(numPages), (el, index) => (
            <div
              key={`page_${index + 1}`}
              style={{
                maxWidth: `${pageWidth}px`,
                flexBasis: `${pageWidth}px`,
              }}
              className={`m-3 grow-0 shrink-0`}>
              <div className='relative cursor-pointer'>
                <div
                  onClick={() => handleRotatePage(index)}
                  className='absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white'>
                  <svg
                    className='w-3'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'>
                    <path d='M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z'></path>
                  </svg>
                </div>

                <div className='overflow-hidden transition-transform'>
                  <div className='relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50'>
                    <Page
                      rotate={pageRotations[index]}
                      pageNumber={index + 1}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      width={pageWidth}
                      className='pointer-events-none w-full shrink'
                    />

                    <div className='w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap'>
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default RotatePdf;
