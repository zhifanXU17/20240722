'use client';

import { useRef, memo, useEffect } from 'react';
import { Page } from 'react-pdf';

const PdfPage = ({
  pageWidth,
  index,
  rotation,
  changeRotation,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.style.maxWidth = `${pageWidth}px`;
      containerRef.current.style.flexBasis = `${pageWidth}px`;
    }
  }, [pageWidth]);

  const handleRotatePage = () => {
    if (rotation + 90 > 360) {
      rotation = 90;
    } else {
      rotation += 90;
    }

    changeRotation(index, rotation);
  };

  return (
    <div
      ref={containerRef}
      className={`m-3 grow-0 shrink-0`}>
      <div className='relative cursor-pointer'>
        <div
          onClick={handleRotatePage}
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
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              canvasRef={canvasRef}
              className='pointer-events-none w-full shrink'
            />

            <div className='w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap'>
              {index + 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PdfPage);
