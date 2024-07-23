import Header from './components/Header';
import Footer from './components/Footer';
import RotatePdf from './components/RotatePdf';

export default function Home() {
  return (
    <main>
      <Header />
      <div className='bg-[#f7f5ee] text-black'>
        <div className='container mx-auto py-20 space-y-5'>
          <div className='flex flex-col text-center mb-10 space-y-5'>
            <h1 className='text-5xl font-serif'>
              Rotate PDF Pages
            </h1>
            <p className='mt-2 text-gray-600 max-w-lg mx-auto'>
              Simply click on a page to rotate it. You can
              then download your modified PDF.
            </p>
            <RotatePdf />
            <div className='flex flex-wrap justify-center'></div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
