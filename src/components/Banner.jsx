import React from 'react';

const Banner = () => {
  return (
    <div className='relative w-full h-[700px] bg-banner bg-center bg-no-repeat bg-cover'>
      {/* Lớp overlay đen mờ */}
      <div className='absolute inset-0 bg-black opacity-40'/>

      {/* Grid layout cho Banner */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center w-full h-full p-4 md:p-8 z-20'>
        {/* Phần chứa nội dung văn bản */}
        <div className='bg-blue-300 bg-opacity-10 rounded-lg p-6 md:p-4'>
          <p className='text-white text-xl py-1 px-2 bg-gradient-to-r from-red-600 to-red-300 inline-block float-left ml-[0px] mb-6 md:mb-0 md:mr-10'>
            TV Show
          </p>

          <h2 className='text-white text-left font-bold text-3xl md:text-4xl mt-6 mr-[190px] md:mt-[50px] mb-4 md:mb-4'>
            Chiếc bật lửa và váy công chúa
          </h2>
          <div className='flex items-center space-x-3 mt-1 mb-2 md:mb-4 '>
            <img src="/src/images/rate-full.png" alt="" className='w-8 h-8' />    
            <img src="/src/images/rate-full.png" alt="" className='w-8 h-8' />    
            <img src="/src/images/rate-full.png" alt="" className='w-8 h-8' />    
            <img src="/src/images/rate-full.png" alt="" className='w-8 h-8' />    
            <img src="/src/images/rate-half.png" alt="" className='w-8 h-8' />    
            <img src="/src/images/none-rate.png" alt="" className='w-8 h-8' />   
          </div>
          <p className='text-left text-white mb-4 md:mb-6'>
            The film "The Lighter and the Princess' Gown" belongs<br/>
            to the Romance genre of Chinese cinema. It tells the life <br/>
            story and love affair of Chu Wan and Li Yuan. The two start<br/>
            off as bickering rivals in university but gradually develop<br/>
            feelings for each other. They envision a bright future together <br/>
            after graduation, but Li Yuan's sister's accident leads him to <br/>
            severely injure someone in a fight, resulting in his imprisonment.<br/>
            From a promising young man, Li Yuan descends into the depths of <br/>
            society's challenges.
          </p>
          <div className='flex items-center space-x-6 mt-3'>
            <button className='p-4 text-white font-bold bg-gradient-to-r from-black to-red-600 rounded-lg transform hover:scale-105 transition-transform duration-300'>
              Chi Tiết
            </button>
            <button className='p-4 text-white bg-gradient-to-r from-blue-800 to-blue-300 font-bold rounded-lg transform hover:scale-105 transition-transform duration-300'>
              Xem Phim
            </button>
          </div>
        </div>

        {/* Phần hình ảnh banner 2 */}
        <div className='relative flex justify-center items-center group '>
    <img 
      src='/banner2.png' 
      alt='Banner 2' 
      className='inset-0 w-full h-[300px] md:h-[492px] md:w-[330px] object-cover rounded-lg ml-[10px] hidden md:block'
    />
    <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
      <img src='/playicon.png' alt='Play Icon' className='w-12 z-12 opacity-65' />
    </div>
  </div>
      </div>
    </div>
  );
}

export default Banner;
